const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const express = require("express");
const users = require("./routes/users");
const quizzes = require("./routes/quizzes");
const auth = require("./routes/auth");
const options = require("./routes/options");
const questions = require("./routes/questions");
const app = express();

// if no private key is set then exit the application
// if (!config.get("jwtPrivateKey")) {
//   console.error("fatal error: jwtPrivateKey is not defined");
//   process.exit(1);
// }

mongoose
  .connect("mongodb://localhost/quizit")
  .then(() => console.log("connected to mongo DB"))
  .catch((err) => console.log("could not connect", err));
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use(helmet());

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/options", options);
app.use("/api/questions", questions);
app.use("/api/quizzes", quizzes);

const port = process.env.port || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));
