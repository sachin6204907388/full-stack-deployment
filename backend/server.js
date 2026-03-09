const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());


// DATABASE CONNECTION

require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("MySQL Connected Successfully");
  }
});
/* =========================
   REGISTER USER
========================= */

app.post("/register", (req, res) => {

  const { fullname, email, phone, password } = req.body;

  const sql =
    "INSERT INTO users(fullname,email,phone,password) VALUES(?,?,?,?)";

  db.query(sql, [fullname, email, phone, password], (err, result) => {

    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send({
        message: "Registered Successfully",
        userId: result.insertId
      });
    }

  });

});



/* =========================
   LOGIN USER
========================= */

app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {

    if (err) {
      console.log(err);
      res.send(err);
    } else {

      if (result.length > 0) {
        res.send(result[0]);
      } else {
        res.send({ message: "Invalid login" });
      }

    }

  });

});



/* =========================
   SUBMIT STUDENT FORM
========================= */

app.post("/student", (req, res) => {

  const { user_id, course, stream, dob, location } = req.body;

  const sql =
    "INSERT INTO students(user_id,course,stream,dob,location) VALUES(?,?,?,?,?)";

  db.query(sql, [user_id, course, stream, dob, location], (err, result) => {

    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send({ message: "Form Submitted Successfully" });
    }

  });

});



/* =========================
   GET STUDENT DETAILS
========================= */

app.get("/student/:id", (req, res) => {

  const sql = `
  SELECT users.fullname, users.email, users.phone,
         students.course, students.stream,
         students.dob, students.location
  FROM users
  LEFT JOIN students
  ON users.id = students.user_id
  WHERE users.id = ?
  `;

  db.query(sql, [req.params.id], (err, result) => {

    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result[0]);
    }

  });

});



/* =========================
   UPDATE STUDENT FORM
========================= */

app.put("/student/:id", (req, res) => {

  let { course, stream, dob, location } = req.body;

  // Fix date format
  dob = dob ? dob.split("T")[0] : null;

  const sql =
    "UPDATE students SET course=?, stream=?, dob=?, location=? WHERE user_id=?";

  db.query(
    sql,
    [course, stream, dob, location, req.params.id],
    (err, result) => {

      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send({ message: "Updated Successfully" });
      }

    }
  );

});

/* =========================
   DELETE STUDENT FORM
========================= */

app.delete("/student/:id", (req, res) => {

  const sql = "DELETE FROM students WHERE user_id=?";

  db.query(sql, [req.params.id], (err, result) => {

    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send({ message: "Deleted Successfully" });
    }

  });

});



/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});