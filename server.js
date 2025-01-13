const express = require("express");
const bodyParser = require("body-parser");
const membershipRoutes = require("./routes/membership");
const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/gym-membership-app/api", membershipRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
