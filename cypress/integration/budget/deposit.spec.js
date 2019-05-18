describe("Budget page deposit features", () => {
  beforeEach(() => {
    // Need to refactor codebase to not require entering in email and password for every setup.
    cy.seedAndVisitBudgetPage()
  })

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

  it.only("displays error warning if user enters non-integer input for depositAmount", () => {
    cy.contains("Total Balance:")
    cy.get(".deposit-btn").click()
    cy.getInputAndEnter("#income-source", "Check")
    cy.getInputAndEnter("#deposit-amount", "sadas")
    cy.contains("Please provide an integer value.")
  })
})
