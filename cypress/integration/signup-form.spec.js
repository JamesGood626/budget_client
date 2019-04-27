describe("Login page", () => {
  it("can successfully login", () => {
    cy.seedAndVisitLogin()
    cy.get("#email")
      .focus()
      .type("james.good@codeimmersives.com")
    cy.get("#password")
      .focus()
      .type("password")

    cy.contains("Log In!").click()
    // Expect successful redirect after login
    cy.url().should("include", "/app/budget")
  })
})
