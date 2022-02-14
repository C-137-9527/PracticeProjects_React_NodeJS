const jwt = require('jsonwebtoken');
const CustomAPIErrpr = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIErrpr('invalid data', 400);
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30D',
  });

  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new CustomAPIErrpr('no token', 401);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const token = authHeader.split(' ')[1];

  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `hello, ${decoded.username}`,
    secret: `your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
