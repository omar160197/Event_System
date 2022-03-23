const router = require("express").Router();

const { 
    createEvent,
     getAllorOne, 
     editEvent,
     deleteEvent
    } = require("../controllers/eventController");

// const {
//     validatePostData,
//     validatePutData,
//     validateDeleteData
// }=require('../services/eventService')


router
.route("/Events/:title?")
.get(getAllorOne)
.post(createEvent)
.put(editEvent)
.delete(deleteEvent);

module.exports = router;
