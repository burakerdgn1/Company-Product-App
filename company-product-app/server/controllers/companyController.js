const Company = require('../models/Company');

const getAllCompanies = async (req, res) => {
    try {
      const companies = await Company.find();
      res.json(companies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const createCompany = async (req, res) => {
    const company = new Company(req.body);
    try {
      const newCompany = await company.save();
      res.status(201).json(newCompany);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const updateCompany=async(req,res)=>{
    const companyId = req.params.id;

    try {
        // Find the company by ID and update its details
        const updatedCompany = await Company.findByIdAndUpdate(companyId, req.body, {
            new: true, // Return the updated document
        });

        if (!updatedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.json(updatedCompany);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

  }

  const deleteCompany=async(req,res)=>{
    const companyId = req.params.id;

    try {
        // Find the company by ID and delete it
        const deletedCompany = await Company.findByIdAndDelete(companyId);

        if (!deletedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.json({ message: 'Company deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
  }

  module.exports = {
    getAllCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
  };