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
    cy.get("#expense")
      .focus()
      .type("Rent")
    cy.get("#amount")
      .focus()
      .type("9000")
    cy.get(".expense-submit-btn").click()
    cy.contains("Warning")
    cy.get(".confirm-warning-btn").click()
    cy.get(".expense").should("have.text", "$9000")
  })

  it("creates an unecessary expense", () => {
    cy.route("POST", "/api/unnecessary-expense", {
      category: "UNNECESSARY_EXPENSE",
      type: "Coffee",
      amount: 4000,
      account_balance: -5000,
      date: "TBD",
    })
    cy.contains("Total Balance:")
    cy.get(".expense-btn").click()
    cy.get("#expense-type-select").select("Unnecessary Expense")
    cy.get("#expense")
      .focus()
      .type("Coffee")
    cy.get("#amount")
      .focus()
      .type("4000")
    cy.get(".expense-submit-btn").click()
    cy.contains("Warning")
    cy.get(".confirm-warning-btn").click()
    cy.get(".expense").should("have.text", "$4000")
  })
})
