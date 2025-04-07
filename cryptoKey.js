const crypto = require('crypto');

const pass = crypto.pbkdf2('password', 'salt', 1, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex')); // '3745e48...a0b9'
}   );