const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

router.get('/companies', companyController.getAllCompanies);

router.post('/companies', companyController.createCompany);

router.patch('/companies/:id', companyController.updateCompany);

router.delete('/companies/:id', companyController.deleteCompany);

module.exports = router;
