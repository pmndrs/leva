describe('Number', () => {
  it('Works.', () => {
    cy.visit('/')
    cy.findByLabelText(/number/).should('exist')
    
    cy.findByLabelText(/number/).clear().type(123).blur()
    // expect 123 to be the value
    cy.findByLabelText(/number/).should("have.value", 123)
    // expect previous value when empty string is used
    cy.findByLabelText(/number/).focus().clear().blur()

  })

  it("Doesn't accept non-numbers.", () => {
    cy.visit('/')
    
    // expect previous value when typing invalid characters
    cy.findByLabelText(/number/).clear().type("ABC").blur()
    cy.findByLabelText(/number/).should("have.value", 10)
  })
})

describe("MinMax", () => {

  it("Works.", () => {
    cy.visit('/')
    cy.findByLabelText(/minmax/).should('exist')

    cy.findByLabelText(/number/).clear().type(12.5).blur()
    cy.findByLabelText(/number/).should("have.value", 12.5)
    // expect previous value when empty string is used
    cy.findByLabelText(/number/).focus().clear().blur()
  })

  it("Doesn't go over.", () => {
    cy.visit('/')

    // since value is over max, it should reset to max
    cy.findByLabelText(/minmax/).clear().type(123).blur()
    cy.findByLabelText(/minmax/).should("have.value", 30.5)
  })

  it("Doesn't go under.", () => {
    cy.visit('/')

    // since value is under min, it should reset to initial
    cy.findByLabelText(/minmax/).clear().type(1).blur()
    cy.findByLabelText(/minmax/).should("have.value", 5.5)
  })

})