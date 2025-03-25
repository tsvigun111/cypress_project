describe('CRUD API Test', () => {
  let userId;

  it('Should create a new user', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      body: {
        name: 'John Doe',
        job: 'Software Engineer'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      userId = response.body.id;
    });
  });

  it('Should retrieve the created user', () => {
    cy.request({
      method: 'GET',
      url: `https://reqres.in/api/users`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Should update the user', () => {
    cy.request({
      method: 'PUT',
      url: `https://reqres.in/api/users/${userId}`,
      body: {
        name: 'John Doe',
        job: 'Senior Software Engineer'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Should delete the user', () => {
    cy.request({
      method: 'DELETE',
      url: `https://reqres.in/api/users/${userId}`
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
