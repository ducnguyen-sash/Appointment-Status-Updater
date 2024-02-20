const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const path = require("path");

const { findDateRange } = require("./js/FindTodayDate");

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

//FIND CONTACT
app.use(async (req, res, next) => {
  //const token = req.token;
  const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzM4NCJ9.eyJhdWQiOiI2OWY0OGIzODI5NDNjMDc4Y2E3MTQ0YjRjMzg5YjZiYyIsImp0aSI6ImY0NjI2ZGZmNjQxZWUwZjhjNTQwM2EwODA3ODU4NzYxY2FjNjg4MWE4MDVmZmE3ZGNiZDM4NTc5OTJlY2QxM2M5ZWIzZGM1ZGUyNDY1MDc3IiwiaWF0IjoxNzA4NDA0MzYxLjAxMzg1OCwibmJmIjoxNzA4NDA0MzYxLjAxMzg2MSwiZXhwIjoxNzA4NDMzMTYxLjAwNTQ5NSwic3ViIjoiOTc0Iiwic2NvcGVzIjpbInJlYWQtY29udGFjdCIsInJlYWQtYXBwb2ludG1lbnQiXSwiaXNzIjoiYXV0aC5lenl2ZXQuY29tIiwiZ3JwIjoic2FzaDEiLCJ1cmwiOiJzYXNoMS5lenl2ZXQuY29tIn0.GWGh8h4loTTCdjoTGUaG1ERnb3VwtxRPcdcqwmI2zg5VoBmkW9J8_vJArAmXQxonJ1KalDJTMBidtnXCSisRTxVog6zzoj2hnvj0xLazvgnRxeM5E5MNAZ5jxcCL9ve-`;

  const myHeaders = new Headers({
    authorization: `Bearer ${token}`,
    Cookie: "PHPSESSID=evp3ua87kj6l4pp7kr8a5pj6p2",
  });

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const contact = await fetch(
    `https://api.trial.ezyvet.com/v1/contact?code=${req.body.code}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.error(error));
  //console.log(contact.items[0].contact);
  req.contact = contact.items[0].contact;

  next();
});

//FIND APPOINTMENT
app.use(async (req, res, next) => {
  //change this token.
  const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzM4NCJ9.eyJhdWQiOiI2OWY0OGIzODI5NDNjMDc4Y2E3MTQ0YjRjMzg5YjZiYyIsImp0aSI6ImY0NjI2ZGZmNjQxZWUwZjhjNTQwM2EwODA3ODU4NzYxY2FjNjg4MWE4MDVmZmE3ZGNiZDM4NTc5OTJlY2QxM2M5ZWIzZGM1ZGUyNDY1MDc3IiwiaWF0IjoxNzA4NDA0MzYxLjAxMzg1OCwibmJmIjoxNzA4NDA0MzYxLjAxMzg2MSwiZXhwIjoxNzA4NDMzMTYxLjAwNTQ5NSwic3ViIjoiOTc0Iiwic2NvcGVzIjpbInJlYWQtY29udGFjdCIsInJlYWQtYXBwb2ludG1lbnQiXSwiaXNzIjoiYXV0aC5lenl2ZXQuY29tIiwiZ3JwIjoic2FzaDEiLCJ1cmwiOiJzYXNoMS5lenl2ZXQuY29tIn0.GWGh8h4loTTCdjoTGUaG1ERnb3VwtxRPcdcqwmI2zg5VoBmkW9J8_vJArAmXQxonJ1KalDJTMBidtnXCSisRTxVog6zzoj2hnvj0xLazvgnRxeM5E5MNAZ5jxcCL9ve-`;
  const myHeaders = new Headers({
    authorization: `Bearer ${token}`,
    Cookie: "PHPSESSID=evp3ua87kj6l4pp7kr8a5pj6p2",
  });

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const contactID = req.contact.id;

  const appointments = await fetch(
    `https://api.trial.ezyvet.com/v2/appointment/?contact_id=${contactID}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.error(error));

  req.appointments = appointments;
  next();
});

app.use((req, res, next) => {
  //console.log(req.appointments.items[1]);
  const startOfToday = findDateRange().start;
  const endOfToday = findDateRange().end;

  const appointmentsArr = req.appointments.items;
  // const todaysAppointment = appointmentsArr.find((appt) => {
  //   console.log(startOfToday);
  //   console.log(appt.appointment.start_at);
  //   console.log(endOfToday);
  //   console.log("------");
  //   return appt.start_at > startOfToday && appt.start_at < endOfToday;
  // });

  const test = appointmentsArr.find((el) => {
    console.log(el.appointment.id);
    return el.appointment.id == 1344711;
  });

  console.log(test);

  //console.log(todaysAppointment);
});

app.post("/contact", (req, res) => {
  res.end();
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/index.html`));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
