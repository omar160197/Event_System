const {dashboardController}=require('../controllers/dashboardController');
const { verifyToken } = require('../middlewares/authToken');
const router =require('express').Router();



router.get('/dash',verifyToken,dashboardController)
module.exports=router;

