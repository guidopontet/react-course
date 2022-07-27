const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe ser de al menos 6 caracteres').isLength({ min: 6 }),
    fieldsValidator
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe ser de al menos 6 caracteres').isLength({ min: 6 }),
    fieldsValidator,
  ],
  loginUser
);
router.get(
  '/renew',
  [ validateJWT ],
  renewToken
);

module.exports = router;
