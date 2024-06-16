const { Form } = require("../model/Form");
const { Router } = require("express");
const router = Router();
const { updateExcelSheet } = require("../model/excelUtils");
const path = require("path");

// Existing form submission route
router.post("/submitForm", async (req, res) => {
  const { formType, name, countryCode, phoneNumber } = req.body;

  try {
    const formdata = await Form.create({
      formType,
      name,
      countryCode,
      phoneNumber,
    });
    res.status(200).json({
      success: true,
      message: "Form submitted successfully!",
      userinfo: formdata,
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting form:",
      error: error.message,
    });
  }
});

// New route to get all form data
router.get("/getAllForms", async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching form data",
      error: error.message,
    });
  }
});

// Route to refresh Excel sheet
router.get("/refreshExcel", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../ExcelData/data.xlsx"); // Adjust this path as per your setup
    const sheetName = "FormsData"; // Name of the sheet in Excel file
    const forms = await Form.find();
    updateExcelSheet(forms, filePath, sheetName); // Update Excel sheet with fetched data
    res
      .status(200)
      .json({ success: true, message: "Excel sheet updated successfully!" });
  } catch (error) {
    console.error("Error refreshing Excel sheet:", error);
    res.status(500).json({
      success: false,
      message: "Error refreshing Excel sheet",
      error: error.message,
    });
  }
});

module.exports = router;
