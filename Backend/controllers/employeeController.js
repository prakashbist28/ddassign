const { validationResult } = require('express-validator');
const Employee = require('../models/Employee');

const createEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email } = req.body;
  try {
    // Check if email is duplicate
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const employee = new Employee(req.body);
    await employee.save();
    res.json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating employee', error });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching employees', error });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting employee', error });
  }
};

// Update employee controller
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, designation, gender, course, image } = req.body;

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    // Update employee fields
    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.mobile = mobile || employee.mobile;
    employee.designation = designation || employee.designation;
    employee.gender = gender || employee.gender;
    employee.course = course || employee.course;
    employee.image = image || employee.image;

    const updatedEmployee = await employee.save();
    res.json({ success: true, updatedEmployee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ success: false, message: 'Error updating employee', error });
  }
};


const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    res.json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching employee', error });
  }
};


module.exports = {
  createEmployee, 
  getEmployees,
  deleteEmployee,
  updateEmployee,
  getEmployeeById
};
