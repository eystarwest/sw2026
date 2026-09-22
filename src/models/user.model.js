const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 8;

// In-memory user store, seeded with 3 users. Password for all seed users: "Passw0rd!"
const users = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: bcrypt.hashSync('Passw0rd!', SALT_ROUNDS),
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: bcrypt.hashSync('Passw0rd!', SALT_ROUNDS),
  },
  {
    id: 3,
    name: 'Carol Davis',
    email: 'carol@example.com',
    password: bcrypt.hashSync('Passw0rd!', SALT_ROUNDS),
  },
];

let nextId = users.length + 1;

function findByEmail(email) {
  return users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
}

function findById(id) {
  return users.find((u) => u.id === Number(id));
}

function create({ name, email, password }) {
  const user = {
    id: nextId++,
    name,
    email,
    password: bcrypt.hashSync(password, SALT_ROUNDS),
  };
  users.push(user);
  return user;
}

module.exports = {
  users,
  findByEmail,
  findById,
  create,
};
