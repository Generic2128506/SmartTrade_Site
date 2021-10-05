class ExcelValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ExcelValidationError';
  }
}

export const saveExcel = async (filename, columns, data) => {
  const Module = await import('xlsx');
  const XLSX = Module.default;

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([columns.map((col) => col.name), ...data]);

  // Set columns width
  ws['!cols'] = new Array(columns.length);
  columns.forEach(
    (col, i) => col.width && (ws['!cols'][i] = { width: col.width })
  );

  XLSX.utils.book_append_sheet(wb, ws);
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

function checkQuotationExcelCell(row, i, name) {
  if (!row[name])
    throw new ExcelValidationError(
      `"${name}" cell is mandatory. Row number ${i + 2}`
    );
}

function validateQuotationExcel(data) {
  data.forEach((row, i) => {
    checkQuotationExcelCell(row, i, 'PartNumber');
  });
}

export const parseQuotationExcel = async (file) => {
  const Module = await import('xlsx');
  const XLSX = Module.default;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const wb = XLSX.read(data, { type: 'array' });
        const rows = XLSX.utils.sheet_to_json(wb.Sheets.Sheet1);
        validateQuotationExcel(rows);
        resolve(rows);
      } catch (err) {
        if (err.name === 'ExcelValidationError') reject(err);
        else resolve([]);
      }
    };

    reader.readAsArrayBuffer(file);
  });
};
