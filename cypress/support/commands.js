Cypress.Commands.add(
  "seedAndVisitLogin",
  (seedData = "fixture:account-data") => {
    cy.server()
    cy.route("POST", "/api/login", { message: "Login Success!" })
    cy.route("GET", "/api/account", seedData)
    cy.visit("http://localhost:8000/app/login")
  }
)

Cypress.Commands.add(
  "seedAndVisitBudgetPage",
  (seedData = "fixture:account-data") => {
    cy.server()
    cy.route("POST", "/api/login", { message: "Login Success!" })
    cy.route("GET", "/api/account", seedData)
    cy.visit("http://localhost:8000/app/login")
    cy.get("#email")
      .focus()
      .type("james.good@codeimmersives.com")
    cy.get("#password")
      .focus()
      .type("passwordshbuya")
    cy.contains("Log In!").click()
  }
)