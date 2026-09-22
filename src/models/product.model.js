// In-memory product store, seeded with 3 products.
const products = [
  { id: 1, name: 'Wireless Mouse', price: 25.0 },
  { id: 2, name: 'Mechanical Keyboard', price: 75.0 },
  { id: 3, name: 'USB-C Hub', price: 40.0 },
];

function findById(id) {
  return products.find((p) => p.id === Number(id));
}

function findAll() {
  return products;
}

module.exports = {
  products,
  findById,
  findAll,
};
