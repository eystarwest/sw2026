const app = require('./app');
const config = require('./config/config');

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
  console.log(`Swagger docs available at http://localhost:${config.port}/api-docs`);
});
