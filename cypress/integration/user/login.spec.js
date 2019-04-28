describe("Login page", () => {
  beforeEach(() => {
    cy.seedAndVisitLogin()
  })

  it("can successfully login", () => {
    cy.get("#email")
      .focus()
      .type("james.good@codeimmersives.com")
    cy.get("#password")
      .focus()
      .type("passwordshabuya")

    cy.contains("Log In!").click()
    // Expect successful redirect after login
    cy.url().should("include", "/app/budget")
  })

  it("displays error if email is invalid", () => {
    cy.get("#email")
      .focus()
      .type("james.goodcodeimmersives.com")
    cy.get("#password")
      .focus()
      .type("passwordshabuya")

    cy.contains("Log In!").click()
    cy.contains("Invalid email")
  })

  it("displays error if password is invalid", () => {
    cy.get("#email")
      .focus()
      .type("james.good@codeimmersives.com")
    cy.get("#password")
      .focus()
      .type("password")

    cy.contains("Log In!").click()
    cy.contains("Invalid password")
  })
})
