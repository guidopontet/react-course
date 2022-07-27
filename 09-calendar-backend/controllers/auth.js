const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'User already exists',
      });
    }

    user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJWT(user._id, user.name);

    res.status(201).json({
      ok: true,
      uid: user._id,
      name: user.name,
      token,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error',
      error,
    })
  }
}

const loginUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe',
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'El password no es correcto',
      });
    }

    const token = await generateJWT(user._id, user.name);

    res.json({
      ok: true,
      uid: user._id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error',
      error,
    })
  }
}

const renewToken = async (req = request, res = response) => {
  const { uid, name } = req;

  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token,
  })
}

module.exports = {
  createUser,
  loginUser,
  renewToken,
}
