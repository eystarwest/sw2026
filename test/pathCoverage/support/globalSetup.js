const path = require('path');
const { spawn } = require('child_process');
const http = require('http');

const PORT = process.env.TEST_PORT || 4100;
const BASE_URL = `http://localhost:${PORT}`;
const SERVER_ENTRY = path.join(__dirname, '..', '..', '..', 'src', 'server.js');

let serverProcess;

function waitForServer(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    function attempt() {
      http
        .get(`${url}/api/healthcheck`, (res) => {
          res.resume();
          if (res.statusCode === 200) {
            resolve();
          } else {
            retry();
          }
        })
        .on('error', retry);
    }
    function retry() {
      if (Date.now() > deadline) {
        reject(new Error(`Server did not start within ${timeoutMs}ms`));
        return;
      }
      setTimeout(attempt, 200);
    }
    attempt();
  });
}

module.exports = {
  BASE_URL,
  mochaHooks: {
    async beforeAll() {
      this.timeout(15000);
      serverProcess = spawn(process.execPath, [SERVER_ENTRY], {
        env: { ...process.env, PORT },
        stdio: 'ignore',
      });
      await waitForServer(BASE_URL, 10000);
    },
    afterAll() {
      if (serverProcess) {
        serverProcess.kill();
      }
    },
  },
};
