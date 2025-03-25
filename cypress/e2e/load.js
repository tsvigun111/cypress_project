import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 }, // Simulate normal load (50 users)
    { duration: '1m', target: 200 }, // Simulate peak load (200 users)
    { duration: '1m', target: 500 }, // Simulate stress conditions (500 users)
    { duration: '1m', target: 0 }, // Ramp down to 0 users
  ],
};

export default function () {
  let userId;

  const createUserResponse = http.post('https://reqres.in/api/users', JSON.stringify({
    name: 'John Doe',
    job: 'Software Engineer',
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(createUserResponse, {
    'Create User - Status is 201': (r) => r.status === 201,
  });

  userId = createUserResponse.json('id');
  const getUserResponse = http.get(`https://reqres.in/api/users/${userId}`);

  check(getUserResponse, {
    'Get User - Status is 200': (r) => r.status === 200,
  });

  const updateUserResponse = http.put(`https://reqres.in/api/users/${userId}`, JSON.stringify({
    name: 'Jane Doe',
    job: 'Senior Software Engineer',
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(updateUserResponse, {
    'Update User - Status is 200': (r) => r.status === 200,
  });

  const deleteUserResponse = http.del(`https://reqres.in/api/users/${userId}`);

  check(deleteUserResponse, {
    'Delete User - Status is 204': (r) => r.status === 204,
  });

  sleep(1);
}
