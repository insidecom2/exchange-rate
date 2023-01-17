describe('Navigation', () => {
    it('should Found page', () => {
      cy.visit('http://localhost/market/BTC_THB')
      // The new page should contain an h1 with "About page"
      cy.get('title').contains('Exchange rate')

      cy.get('.button-active').contains('BTC/THB')

      cy.get('.ant-typography').contains('BTC/THB')
    })
  
    it('should Found BUSD/THB', () => {
      cy.visit('http://localhost/market/BUSD_THB')
      // The new page should contain an h1 with "About page"
      cy.get('title').contains('Exchange rate')

      cy.get('.button-active').contains('BUSD/THB')

      cy.get('.ant-typography').contains('BUSD/THB')
    })
  
    it('should click BUSD/THB', () => {
      cy.visit('http://localhost/market/BTC_THB')
      // The new page should contain an h1 with "About page"
      cy.get('title').contains('Exchange rate')

      cy.get('#btn-1').click();

      cy.get('.button-active').contains('BUSD/THB')

      cy.get('.ant-typography').contains('BUSD/THB')
    })
  
    it('should click BUSD/THB', () => {
      cy.visit('http://localhost/market/USDT_THB')
      // The new page should contain an h1 with "About page"
      cy.get('title').contains('Exchange rate')

      cy.get('#btn-2').click();

      cy.get('.button-active').contains('USDT/THB')

      cy.get('.ant-typography').contains('USDT/THB')
    })
  })