// <reference types="Cypress" />
context('Pizza Creator', () => {
    beforeEach(() => {
      // uses base url setting from cypress.json
      // which right now points at "localhost:3000"
      cy.visit('/')
    })
  
    it('orders custom pizza', function () {
      // enter delivery information
      cy.get('[formcontrolname="name"]').type('Joe')
      cy.get('[formcontrolname="email"]').type('foo@bar.com')
      cy.get('[formcontrolname="confirm"]').type('foo@bar.com')
  

      cy.get('button[type="submit"]').should('be.disabled')
  
      cy.get('[formcontrolname="address"]').type('1 Pizza st')
      cy.get('[formcontrolname="postcode"]').type('12345')
      cy.get('[formcontrolname="phone"]').type('1234567890')
  
      cy.get('button[type="submit"]').should('be.disabled')
  
      
      cy.contains('label.pizza-topping', 'Pepperoni').click()
      cy.contains('label.pizza-topping', 'Onion').click()
      cy.contains('label.pizza-topping', 'Mozzarella').click()
      cy.contains('label.pizza-topping', 'Basil').click()
  
      // check the price and order pizza
      cy.contains('.pizza-summary__total-price', 'Total: $12.75')
  
      // let us confirm we can place our order,
      // but first, prepare for "window.alert" call
      cy.on('window:alert', cy.stub().as('alert'))
  
      // now the button should be enabled
      cy.get('button[type="submit"]')
        .should('be.enabled')
        .click()
      cy.get('@alert').should('have.been.calledWithExactly', 'Order placed')
  
      it('draws pizza correctly', function () {
        cy.percySnapshot('Empty Pizza')
      
        cy.enterDeliveryInformation()
        const toppings = ['Pepperoni', 'Chili', 'Onion']
        cy.pickToppings(...toppings)
      
        // make sure the web app has updated
        cy.contains('.pizza-summary__total-price', 'Total: $12.06')
        cy.percySnapshot(toppings.join(' - '))
      
        // scroll pizza view back into view
        cy.get('form')
          .scrollIntoView({})
          .should('be.visible')
      })
      // scroll pizza view back into view
      
    })
  })