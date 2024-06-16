const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://rishabhjain223344:dcwVpuwl9TzWMu3a@cluster0.ivej3zp.mongodb.net/FORM-DATABASE",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const FormSchema = new mongoose.Schema({
  formType: {
    type: String,
    required: [true, "form type is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  countryCode: {
    type: String,
    required: [true, "code is required"],
  },
  phoneNumber: {
    type: String,
    required: true,
    maxlength: 10,
    minlength: 10,
  },
});

const Form = mongoose.model("Form", FormSchema);
module.exports = { Form };
