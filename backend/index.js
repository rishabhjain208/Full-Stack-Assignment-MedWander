const express = require("express");
const cors = require("cors");
const app = express();
const bodyparser = require("body-parser");
const Test = require("./routes/submit");

const PORT = 3000;

// Use CORS middleware
app.use(cors());

app.use(express.json());
app.use(bodyparser.json());

app.use("/api/v1/test", Test);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
