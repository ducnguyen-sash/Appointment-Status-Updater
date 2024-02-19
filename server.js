const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const path = require("path");

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/")));

//GET APPOINTMENT
// app.use(async (req, res, next) => {
//   const headers = new Headers({
//     "Content-Type": "application/x-www-form-urlencoded",
//   });

//   const urlencoded = new URLSearchParams({
//     client_secret:
//       "$2y$10$9u2dmYh3HAG5GeMI4qgMdedgDSXrgXE8szzttgQ7z23U6GDbEarL6",
//     client_id: "69f48b382943c078ca7144b4c389b6bc",
//     partner_id:
//       "bcb59f74f5b23af4ec722db12972cf5938797a32f644265e1146de68b1f3eb42",
//     grant_type: "client_credentials",
//     scope: "read-appointment",
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: headers,
//     body: urlencoded,
//     redirect: "follow",
//   };

//   const token = await fetch(
//     "https://api.trial.ezyvet.com/v1/oauth/access_token",
//     requestOptions
//   )
//     .then((response) => response.text())
//     .then((result) => {
//       return JSON.parse(result);
//     })
//     .then((data) => {
//       req.token = data.access_token;
//     })
//     .catch((error) => console.error(error));

//   next();
// });

// GET APPOINTMENT

app.use((req, res, next) => {});

app.post("/contact", (req, res) => {
  console.log(req.body);
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/index.html`));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
