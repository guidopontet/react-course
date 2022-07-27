const { response, request } = require("express");

const Event = require('../models/Event');

const getEvents = async (req = request, res = response) => {
  const events = await Event.find({ user: req.uid })
                            .populate('user', 'name');

  res.json({
    ok: true,
    events,
  });
}

const createEvent = async  (req = request, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const savedEvent = await event.save();

    res.status(201).json({ ok: true, event: savedEvent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Error inesperado' });
  }
}

const updateEvent = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) { return res.status(404).json({ ok: false, msg: 'Evento no encontrado' }); }

    if (event.user.toString() !== req.uid) { return res.status(401).json({ ok: false, msg: 'No autorizado' }); }

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });

    res.json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Error inesperado' });
  }
}

const deleteEvent = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) { return res.status(404).json({ ok: false, msg: 'Evento no encontrado' }); }

    if (event.user.toString() !== req.uid) { return res.status(401).json({ ok: false, msg: 'No autorizado' }); }

    const deletedEvent = await Event.findByIdAndDelete(id);

    res.json({
      ok: true,
      event: deletedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Error inesperado' });
  }
}

module.exports = {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
}
