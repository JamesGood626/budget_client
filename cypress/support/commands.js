Cypress.Commands.add("seedAndVisitLogin", () => {
  cy.server()
  cy.route("POST", "/api/login", { message: "Login Success!" })
  cy.route("GET", "/api/account", "fixture:account-data")
  cy.visit("http://localhost:8000/app/login")
})
