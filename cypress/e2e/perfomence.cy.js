const { urls } = require("../constants/selectors");


describe('Perfomence Test', () => {
  it('Should test Lighthouse task is registered on live website', () => {
    cy.task('lighthouse', {
      url: urls.baseUrl,
      thresholds: {
        performance: 50,
        accessibility: 50,
        'best-practices': 50,
        seo: 50,
      },
    }).then((results) => {
      cy.log('Lighthouse audit results:', results);
    });
  });

  it('Should measure WebSocket latency under normal conditions', () => {
    cy.visit(urls.webSocketUrl);

    cy.window().then((win) => {
      const socket = new win.WebSocket(urls.WebSocket);

      const startTime = Date.now();
      socket.onopen = () => {
        const latency = Date.now() - startTime;
        cy.log(`WebSocket connection latency: ${latency}ms`);
        expect(latency).to.be.lessThan(100);
        socket.close();
      };

      socket.onerror = (error) => {
        cy.log('WebSocket error:', error);
        throw new Error('WebSocket connection failed');
      };
    });
  });

  it('Should measure WebSocket latency under peak load', () => {
    cy.visit(urls.webSocketUrl);

    for (let i = 0; i < 100; i++) {
      cy.window().then((win) => {
        const socket = new win.WebSocket(urls.WebSocket);

        const startTime = Date.now();
        socket.onopen = () => {
          const latency = Date.now() - startTime;
          cy.log(`WebSocket connection ${i + 1} latency: ${latency}ms`);
          expect(latency).to.be.lessThan(200);
          socket.close();
        };

        socket.onerror = (error) => {
          cy.log(`WebSocket ${i + 1} error:`, error);
          throw new Error('WebSocket connection failed');
        };
      });
    }
  });

  it('Should measure WebSocket latency under stress conditions', () => {
    cy.visit(urls.webSocketUrl);

    for (let i = 0; i < 500; i++) {
      cy.window().then((win) => {
        const socket = new win.WebSocket(urls.WebSocket);

        const startTime = Date.now();
        socket.onopen = () => {
          const latency = Date.now() - startTime;
          cy.log(`WebSocket connection ${i + 1} latency: ${latency}ms`);
          expect(latency).to.be.lessThan(500);
          socket.close();
        };

        socket.onerror = (error) => {
          cy.log(`WebSocket ${i + 1} error:`, error);
          throw new Error('WebSocket connection failed');
        };
      });
    }
  });
});