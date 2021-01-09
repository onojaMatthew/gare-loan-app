require("dotenv").config();

const encryptor = require("simple-encryptor")(process.env.ENCRYPTION_KEY);

exports.encryptor = (data) => {
  const encrypted = encryptor.encrypt(data);
  return encrypted;
}

exports.decryptor = (encrypted) => {
  const decrypted = encryptor.decrypt(encrypted);
  return decrypted
}