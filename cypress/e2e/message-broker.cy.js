import { urls } from "../constants/selectors";

describe('Webhook Publish Test', () => {
  it('Should publish an event to Webhook.site', () => {
    // Publish an event to the webhook URL
    cy.request({
      method: 'POST',
      url: urls.webhookUrl,
      body: {
        eventType: 'order_created',
        orderId: 1,
        status: 'pending'
      },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 429) {
        cy.log('Received 429 Too Many Requests. Please try again later.');
      } else {
        expect(response.status).to.eq(200);
        // The code below shows if the request was successful on the UI.
        // It's better to do this using a token, but it is available in the paid version.
        cy.visit(urls.webhookUrl);
        cy.get('a[href]').contains('Change response in Webhook.site')
          .click();
      }
    });
  });
});
