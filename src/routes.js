const express = require("express");
const routes = express.Router();
const studentsController = require("./controllers/studentsController")
const adminController = require("./controllers/adminController")
const auth = require('./middlewares/auth')

routes.post("/students/create", auth, studentsController.store);
routes.get("/students/list", auth, studentsController.show);
routes.post("/students/delete/:ra", auth, studentsController.destroy);
routes.get("/students/:ra", auth, studentsController.studentsData);
routes.post("/students/update", auth, studentsController.update);
routes.post("/login", adminController.auth);

module.exports = routes;