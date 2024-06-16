const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

/**
 * Utility function to update an Excel sheet with new data.
 * @param {Array} data Array of objects representing the data to be written to the Excel sheet.
 * @param {string} filePath Path to the Excel file.
 * @param {string} sheetName Name of the sheet in the Excel file.
 */
const updateExcelSheet = (data, filePath, sheetName) => {
  try {
    // Load current workbook if exists or create a new one
    let workbook;
    if (fs.existsSync(filePath)) {
      workbook = XLSX.readFile(filePath);
    } else {
      workbook = XLSX.utils.book_new();
    }

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add or replace sheet in the workbook
    if (workbook.SheetNames.includes(sheetName)) {
      workbook.Sheets[sheetName] = worksheet;
    } else {
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }

    // Write the workbook back to the file
    XLSX.writeFile(workbook, filePath);

    console.log(`Excel sheet updated successfully at ${filePath}`);
  } catch (error) {
    console.error(`Error updating Excel sheet: ${error.message}`);
    throw error; // Ensure to propagate the error if it occurs
  }
};

module.exports = { updateExcelSheet };
