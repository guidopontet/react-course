const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator } = require('../middlewares/fields-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use(validateJWT); // Validate JWT on all routes below

router.get(
  '/',
  getEvents
);

router.post(
  '/',
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalización es obligatoria').custom(isDate),
    fieldsValidator
  ],
  createEvent
);

router.put(
  '/:id',
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalización es obligatoria').custom(isDate),
    fieldsValidator
  ],
  updateEvent
);

router.delete(
  '/:id',
  deleteEvent
);

module.exports = router;
