describe("Budget page expend features", () => {
  beforeEach(() => {
    // Need to refactor codebase to not require entering in email and password for every setup.
    cy.seedAndVisitBudgetPage()
  })

  it("creates a necessary expense", () => {
    cy.route("POST", "/api/necessary-expense", {
      category: "NECESSARY_EXPENSE",
      type: "Rent",
      amount: 9000,
      account_balance: -1000,
      date: "TBD",
    })
    cy.contains("Total Balance:")
    cy.get(".expense-btn").click()
    cy.getInputAndEnter("#expense", "Rent")
    cy.getInputAndEnter("#amount", "9000")

    // POST form data
    cy.get(".expense-submit-btn").click()
    cy.contains("Warning")
    // confirm POST submit
    cy.get(".confirm-warning-btn").click()
    cy.get(".expense").should("have.text", "$90.00")
  })

  it("creates an unecessary expense", () => {
    cy.route("POST", "/api/unnecessary-expense", {
      category: "UNNECESSARY_EXPENSE",
      type: "Coffee",
      amount: 4000,
      account_balance: -4000,
      date: "TBD",
    })
    cy.contains("Total Balance:")
    cy.get(".expense-btn").click()
    cy.get("#expense-type-select").select("Unnecessary Expense")
    cy.getInputAndEnter("#expense", "Coffee")
    cy.getInputAndEnter("#amount", "4000")

    // POST form data
    cy.get(".expense-submit-btn").click()
    cy.contains("Warning")
    // confirm POST submit
    cy.get(".confirm-warning-btn").click()
    cy.get(".expense").should("have.text", "$40.00")
  })
})
