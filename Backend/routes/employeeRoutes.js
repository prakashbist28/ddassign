const express = require('express');
const { body } = require('express-validator');
const { createEmployee, getEmployees, deleteEmployee, updateEmployee, getEmployeeById } = require('../controllers/employeeController');

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('mobile').isMobilePhone().withMessage('Valid mobile number is required'),
    body('designation').notEmpty().withMessage('Designation is required'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('course').isArray({ min: 1 }).withMessage('At least one course must be selected'),
    body('image').notEmpty().withMessage('Image is required')
  ],
  createEmployee
);

router.put(
  '/:id',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('mobile').isMobilePhone().withMessage('Valid mobile number is required'),
    body('designation').notEmpty().withMessage('Designation is required'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('course').isArray({ min: 1 }).withMessage('At least one course must be selected'),
    body('image').notEmpty().withMessage('Image is required')
  ],
  updateEmployee
);

router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.delete('/:id', deleteEmployee);

module.exports = router;

