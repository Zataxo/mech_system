const mechApp = require("./mech_app");
require("dotenv").config();
console.log(process.env.PORT);
const port = process.env.PORT || 3500;
const mode = process.env.NODE_MODE;
mechApp.listen(port, () =>
  console.log("Running on PORT : ", port, " MODE : ", mode)
);
