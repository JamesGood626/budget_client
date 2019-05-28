describe("Budget page expend features", () => {
  beforeEach(() => {
    cy.seedAndVisitBudgetPage()
  })

  // TODO: move the filling out form, posting form data, and confirming warning
  // into a command.
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
    cy.getInputAndEnter("#expense-amount", "9000")

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
    cy.getInputAndEnter("#expense-amount", "4000")

    // POST form data
    cy.get(".expense-submit-btn").click()
    cy.contains("Warning")
    // confirm POST submit
    cy.get(".confirm-warning-btn").click()
    cy.get(".expense").should("have.text", "$40.00")
  })

  it("handles invalid session response properly when attempting to create a necessary-expense", () => {
    cy.route("POST", "/api/necessary-expense", {
      message: "INVALID_SESSION",
    })
    cy.contains("Total Balance:")
    cy.get(".expense-btn").click()
    cy.getInputAndEnter("#expense", "Rent")
    cy.getInputAndEnter("#expense-amount", "9000")

    // POST form data
    cy.get(".expense-submit-btn").click()
    cy.contains("Warning")
    // confirm POST submit
    cy.get(".confirm-warning-btn").click()

    // User was redirected to login page
    cy.url().should("include", "/app/login")
    cy.url().should("eq", "http://localhost:8000/app/login")
  })

  it("handles invalid session response properly when attempting to create a unnecessary-expense", () => {
    cy.route("POST", "/api/unnecessary-expense", {
      message: "INVALID_SESSION",
    })
    cy.contains("Total Balance:")
    cy.get(".expense-btn").click()
    cy.get("#expense-type-select").select("Unnecessary Expense")
    cy.getInputAndEnter("#expense", "Coffee")
    cy.getInputAndEnter("#expense-amount", "4000")

    // POST form data
    cy.get(".expense-submit-btn").click()
    cy.contains("Warning")
    // confirm POST submit
    cy.get(".confirm-warning-btn").click()

    // User was redirected to login page
    cy.url().should("include", "/app/login")
    cy.url().should("eq", "http://localhost:8000/app/login")
  })

  it("displays error warning if user enters non-integer input for expenseAmount", () => {
    cy.contains("Total Balance:")
    cy.get(".expense-btn").click()
    cy.getInputAndEnter("#expense", "Coffee")
    cy.getInputAndEnter("#expense-amount", "sadas")
    cy.contains("Please provide an integer value.")
  })
})
