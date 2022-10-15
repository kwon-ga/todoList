const express = require("express");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");
const app = express();

const router = require("./routes");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use([
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
]);
app.use("/", router);

app.get("/", (req, res) => {
  res.send("해윙~~");
});

app.listen(3000, () => {
  console.log("서버가 켜졌어요!");
});
