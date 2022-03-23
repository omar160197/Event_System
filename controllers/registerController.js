const {addStudent}=require('../controllers/syudentController');
const {postSpeakers} =require('../controllers/speakersController');


module.exports.creator = async (req, res) => {
  try {
    let {password, confirmPassword,role} = req.body;
    if (confirmPassword != password)res.status(400).send(`please confirm password`);
     
    if (role) {
      postSpeakers(req,res);
        
    }else{
      addStudent(req,res);
    }
  } catch (error) {
    res.status(400).send(`unsuccess creations ${error}`);
  }
};

