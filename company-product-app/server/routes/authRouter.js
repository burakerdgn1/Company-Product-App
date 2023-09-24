const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const authRouter = express.Router();

authRouter.get('/protected-route',authMiddleware,(req,res)=>{

});

module.exports = authRouter;
