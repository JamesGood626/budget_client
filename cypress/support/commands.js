Cypress.Commands.add(
  "seedAndVisitLogin",
  (seedData = "fixture:account-data") => {
    cy.server()
    cy.route("GET", "/api/csrf", { csrf_token: "testcsrftoken" })
    cy.route("POST", "/api/login", { message: "LOGIN_SUCCESS" })
    cy.route("GET", "/api/account", seedData)
    cy.visit("http://localhost:8000/app/login")
  }
)

Cypress.Commands.add(
  "seedAndVisitBudgetPage",
  (seedData = "fixture:account-data") => {
    cy.server()
    cy.route("GET", "/api/csrf", { csrf_token: "testcsrftoken" })
    cy.route("GET", "/api/account", seedData)
    window.localStorage.setItem("authenticated", true)
    cy.visit("http://localhost:8000/app/budget")
  }
)

Cypress.Commands.add("getInputAndEnter", (id, input) => {
  cy.get(id)
    .focus()
    .type(input)
})
