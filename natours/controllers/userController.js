const fs = require('fs');

// FETCH DEV DATA
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// ROUTE: USER HANDLERS
exports.getAllUsers = (req, res) => {
  res.send('data');
};
exports.createUser = () => {};
exports.getUser = () => {};
exports.updateUser = () => {};
exports.deleteUser = () => {};
