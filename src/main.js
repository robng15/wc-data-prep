import Papa from 'papaparse';
import { convertAll, WC_COLUMNS } from './converter.js';

// ─── DOM ──────────────────────────────────────────────────────────────────────
const dropZone       = document.getElementById('drop-zone');
const fileInput      = document.getElementById('file-input');
const uploadSection  = document.getElementById('upload-section');
const resultsSection = document.getElementById('results-section');
const sourceFilename = document.getElementById('source-filename');
const statsRow       = document.getElementById('stats-row');
const warningsPanel  = document.getElementById('warnings-panel');
const warningsToggle = document.getElementById('warnings-toggle');
const warningsTitle  = document.getElementById('warnings-title');
const warningsList   = document.getElementById('warnings-list');
const previewBody    = document.getElementById('preview-body');
const downloadBtn    = document.getElementById('download-btn');
const clearBtn       = document.getElementById('clear-btn');
const errorToast     = document.getElementById('error-toast');

// ─── State ────────────────────────────────────────────────────────────────────
let convertedRows = [];

// ─── File input ───────────────────────────────────────────────────────────────
fileInput.addEventListener('change', e => {
  const file = e.target.files?.[0];
  if (file) handleFile(file);
  fileInput.value = '';
});

dropZone.addEventListener('click', e => {
  if (e.target !== document.querySelector('label[for="file-input"]')) fileInput.click();
});
dropZone.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); }
});
dropZone.addEventListener('dragover',  e => { e.preventDefault(); dropZone.classList.add('dragging'); });
dropZone.addEventListener('dragleave', ()  => dropZone.classList.remove('dragging'));
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('dragging');
  const file = e.dataTransfer.files?.[0];
  if (file) handleFile(file);
});
document.body.addEventListener('dragover', e => e.preventDefault());
document.body.addEventListener('drop', e => {
  e.preventDefault();
  const file = e.dataTransfer.files?.[0];
  if (file) handleFile(file);
});

clearBtn.addEventListener('click', reset);

// ─── Warnings toggle ──────────────────────────────────────────────────────────
warningsToggle.addEventListener('click', () => {
  const isOpen = !warningsList.classList.contains('hidden');
  warningsList.classList.toggle('hidden', isOpen);
  warningsToggle.querySelector('.chevron').style.transform = isOpen ? '' : 'rotate(180deg)';
});
warningsToggle.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); warningsToggle.click(); }
});

// ─── Download ─────────────────────────────────────────────────────────────────
downloadBtn.addEventListener('click', () => {
  if (!convertedRows.length) return;

  const csv = Papa.unparse(convertedRows, { columns: WC_COLUMNS, quotes: true });
  const bom = '\uFEFF'; // UTF-8 BOM — required by some WooCommerce import tools
  const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), {
    href:     url,
    download: `woocommerce-import-${datestamp()}.csv`,
  });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

// ─── File handler ─────────────────────────────────────────────────────────────
function handleFile(file) {
  if (!file.name.toLowerCase().endsWith('.csv')) {
    showError('Please upload a CSV file.');
    return;
  }

  Papa.parse(file, {
    header:    true,
    skipEmptyLines: true,
    complete(result) {
      if (!result.data.length) {
        showError('The file appears to be empty.');
        return;
      }

      // Verify it looks like the right file
      if (!result.meta.fields?.includes('Part_No')) {
        showError('This doesn\'t look like a Siteline ERP export — "Part_No" column not found.');
        return;
      }

      processData(file.name, result.data);
    },
    error(err) {
      showError(`Failed to parse CSV: ${err.message}`);
    },
  });
}

function processData(filename, rows) {
  const { results, warnings } = convertAll(rows);
  convertedRows = results;

  sourceFilename.textContent = filename;

  // Stats
  renderStats(rows.length, results.length, warnings.length);

  // Warnings
  if (warnings.length) {
    warningsTitle.textContent = `${warnings.length} warning${warnings.length !== 1 ? 's' : ''}`;
    warningsList.innerHTML = warnings
      .map(w => `<li><span class="warn-row">Row ${w.row}${w.sku ? ` (${w.sku})` : ''}</span> — ${w.message}</li>`)
      .join('');
    warningsPanel.classList.remove('hidden');
  } else {
    warningsPanel.classList.add('hidden');
  }

  // Preview
  renderPreview(results.slice(0, 10));

  // Show results panel
  uploadSection.classList.add('hidden');
  resultsSection.classList.remove('hidden');
  downloadBtn.disabled = results.length === 0;
}

// ─── Render helpers ───────────────────────────────────────────────────────────
function renderStats(sourceCount, outputCount, warnCount) {
  const items = [
    { label: 'Source rows',    value: sourceCount,    color: '' },
    { label: 'Products out',   value: outputCount,    color: 'green' },
    { label: 'Rows skipped',   value: sourceCount - outputCount, color: sourceCount - outputCount > 0 ? 'amber' : '' },
    { label: 'Warnings',       value: warnCount,      color: warnCount > 0 ? 'amber' : '' },
  ];
  statsRow.innerHTML = items.map(s => `
    <div class="stat-card">
      <span class="stat-value ${s.color}">${s.value}</span>
      <span class="stat-label">${s.label}</span>
    </div>`).join('');
}

function renderPreview(rows) {
  previewBody.innerHTML = rows.map(row => {
    const imageCount = row['Images'] ? row['Images'].split(',').length : 0;
    const bullets    = row['Short description'].match(/<li>/g)?.length ?? 0;
    return `<tr>
      <td class="mono">${esc(row['SKU'])}</td>
      <td>${esc(row['Name'])}</td>
      <td class="mono">${esc(row['Regular price'])}</td>
      <td>${esc(row['Categories'])}</td>
      <td class="center">${imageCount ? `<span class="badge">${imageCount}</span>` : '<span class="none">—</span>'}</td>
      <td class="center">${bullets ? `<span class="badge">${bullets}</span>` : '<span class="none">—</span>'}</td>
      <td class="mono">${esc(row['Weight (kg)'])}</td>
    </tr>`;
  }).join('');
}

// ─── Reset ────────────────────────────────────────────────────────────────────
function reset() {
  convertedRows = [];
  previewBody.innerHTML  = '';
  statsRow.innerHTML     = '';
  warningsList.innerHTML = '';
  warningsPanel.classList.add('hidden');
  resultsSection.classList.add('hidden');
  uploadSection.classList.remove('hidden');
  downloadBtn.disabled = true;
}

// ─── Utilities ────────────────────────────────────────────────────────────────
function esc(str) {
  return (str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function datestamp() {
  return new Date().toISOString().slice(0, 10);
}

let toastTimer;
function showError(msg) {
  errorToast.textContent = msg;
  errorToast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => errorToast.classList.add('hidden'), 5000);
}
