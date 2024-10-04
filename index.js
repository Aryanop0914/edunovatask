const { app } = require("./app.js");
const dbconnect = require("./utils/DbConnect.js");
require("dotenv").config();
const { PORT, MONGO_URI } = process.env;
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
  dbconnect(MONGO_URI);
});
