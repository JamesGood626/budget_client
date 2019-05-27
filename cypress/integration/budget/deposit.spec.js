describe("Budget page deposit features", () => {
  beforeEach(() => {
    // Need to refactor codebase to not require entering in email and password for every setup.
    cy.seedAndVisitBudgetPage()
  })

  // TODO: move the filling out form, posting form data, and confirming warning
  // into a command.
  it("creates a deposit", () => {
    cy.route("POST", "/api/deposit", {
      category: "DEPOSIT",
      type: "Check",
      amount: 4000,
      account_balance: 8000,
      date: "TBD",
    })
    cy.contains("Total Balance:")
    cy.get(".deposit-btn").click()
    cy.getInputAndEnter("#income-source", "Check")
    cy.getInputAndEnter("#deposit-amount", "4000")

    // POST form data
    cy.get(".deposit-submit-btn").click()
    // confirm POST submit
    cy.get(".confirm-warning-btn").click()
    cy.get(".deposit").should("have.text", "$40.00")
  })

  it("handles invalid session response properly when attempting to create a deposit", () => {
    cy.route("POST", "/api/deposit", {
      message: "INVALID_SESSION",
    })
    cy.contains("Total Balance:")
    cy.get(".deposit-btn").click()
    cy.getInputAndEnter("#income-source", "Check")
    cy.getInputAndEnter("#deposit-amount", "4000")

    // POST form data
    cy.get(".deposit-submit-btn").click()
    // confirm POST submit
    cy.get(".confirm-warning-btn").click()

    // User was redirected to login page
    cy.url().should("include", "/app/login")
    cy.url().should("eq", "http://localhost:8000/app/login")
  })

  it("displays error warning if user enters non-integer input for depositAmount", () => {
    cy.contains("Total Balance:")
    cy.get(".deposit-btn").click()
    cy.getInputAndEnter("#income-source", "Check")
    cy.getInputAndEnter("#deposit-amount", "sadas")
    cy.contains("Please provide an integer value.")
  })
})
