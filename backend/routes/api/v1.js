var express = require('express');
var router = express.Router();
const Employee = require('../../controllers').Employee;
const Role = require('../../controllers').Role;


router.post('/employees', Employee.create); //create user
router.get('/employees', Employee.getAll); //list all Employee
router.get('/employee/:id', Employee.getOne); //get user by id
router.put('/employee/:id', Employee.update); // update
router.delete('/employee/:id', Employee.destroy); //delete


router.post('/roles', Role.create); //create photo
router.get('/roles', Role.getAll); //list all photos
router.get('/role/:id', Role.getOne); //get photo by id
router.put('/role/:id', Role.update); // update
router.delete('/role/:id', Role.destroy); //delete

module.exports = router;