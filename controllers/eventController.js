const Events = require("../models/eventSchema");
const Speakers = require("../models/speakerSchema");

module.exports = {
  getAllorOne: async (req, res) => {
    const { title } = req.params;
    if (!title) {
      try {
        const allEvents = await Events.find();
        res.status(200).json(allEvents);
      } catch (error) {
        res.status(400).send(`cannot get all events :${error}`);
      }
    } else {
      try {
        const event = await Events.findOne({ title });
        if (event) {
          res.status(200).json(event);
        } else res.status(400).json({ event: "not found" });
      } catch (error) {
        res.status(400).send(`cannot get this event:${error}`);
      }
    }
  },

  createEvent: async (req, res) => {
    try {
      let { title, date, mainSpeaker, speakers, students } = req.body;
      const existedMainSpeaker=await Speakers.findById(mainSpeaker);
       if (!existedMainSpeaker)res.status(400).send(`this speaker is not existed`);
       else {
      const existedTitle = await Events.findOne({ title });
      if (!existedTitle) {
        const event = new Events({
          title,
          date,
          mainSpeaker,
          speakers,
          students,
        });
        await event.save();
        res.status(200).send(`event ${title} added success`);
        
      } else res.status(400).send(`event ${title} already existed`);
    }
    } catch (error) {
      res.status(400).send(`cannot add new event as:${error}`);
    }
  },

  editEvent: async (req, res) => {
    const { title } = req.params;
    if (!title) res.status(400).send(`title is required to update`);
    try {
      const event = await Events.findOne({ title });
      if (event) {
        let { title, date, mainSpeaker, speakers, students } = req.body;
        await Events.updateOne(
          { title: title },
          {
            $set: {
              title: title,
              date: date,
              mainSpeaker: mainSpeaker,
              speakers: speakers,
              students,
              students,
            },
          }
        );
        const updatedEvent = await Events.findOne({ title });
        res.status(200).json(updatedEvent);
      } else res.status(400).send(`event ${title} is not existed `);
    } catch (error) {
      res.status(400).send(`cannot edite this event : ${error}`);
    }
  },

  deleteEvent: async (req, res) => {
    const { title } = req.params;
    try {
      if (title) {
        const event = await Events.findOne({ title });
        if (event) {
          await Events.deleteOne({ title: title })
            .then((req, res) => {
            res.status(200).send(`event ${title} deleted success`);
          });
        } else res.status(400).send(`event ${title} is not existed`);
      } else res.status(400).send(`title is required to delete event`);
    } catch (error) {
      res.status(400).send(`cannot delete event:${error}`);
    }
  },
};
