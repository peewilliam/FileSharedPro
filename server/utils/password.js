import crypto from 'crypto';

const ITERATIONS = 10000;
const KEY_LENGTH = 64;
const DIGEST = 'sha512';

export const hashPassword = async (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(
    password,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    DIGEST
  ).toString('hex');
  return `${salt}:${hash}`;
};

export const comparePasswords = async (password, storedHash) => {
  const [salt, hash] = storedHash.split(':');
  const newHash = crypto.pbkdf2Sync(
    password,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    DIGEST
  ).toString('hex');
  return hash === newHash;
};