import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

// POST /api/auth/login, per swagger.yaml. Credentials are a seed user from README.md.
const LOGIN_PAYLOAD = JSON.stringify({
  email: 'alice@example.com',
  password: 'Passw0rd!',
});

export const options = {
  stages: [
    { duration: '5s', target: 10 },
    { duration: '20s', target: 30 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const res = http.post(`${BASE_URL}/api/auth/login`, LOGIN_PAYLOAD, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response has token': (r) => JSON.parse(r.body).token !== undefined,
  });

  sleep(1);
}
