const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) reject(err);
      bcrypt.hash(password, salt, (err, hash) => {
        resolve(hash);
      });
    });
  });
};

const checkPassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = { hashPassword, checkPassword };
