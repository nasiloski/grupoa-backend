const express = require("express");
const routes = express.Router();
const studentsController = require("./controllers/studentsController")
const adminController = require("./controllers/adminController")

routes.post("/students/create", studentsController.store);
routes.get("/students/list", studentsController.show);
routes.post("/students/delete/:ra", studentsController.destroy);
routes.get("/students/:ra", studentsController.studentsData);
routes.post("/students/update", studentsController.update);
routes.post("/login", adminController.auth);

module.exports = routes;