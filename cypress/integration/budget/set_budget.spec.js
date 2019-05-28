describe("Budget page set budget feature", () => {
  beforeEach(() => {
    cy.seedAndVisitBudgetPage()
  })

  it("sets a new budget", () => {
    cy.route("POST", "/api/account", {
      budget: {
        account_balance: 0,
        budget_exceeded: false,
        budget_set: true,
        current_budget: 60000,
      },
      current_month: 5,
      current_year: 2019,
      message: "Successfully set your budget for the month.",
      updated_month_data: {
        budget: 60000,
        budget_exceeded: false,
        deposits: [],
        necessary_expenses: [],
        total_deposited: 0,
        total_necessary_expenses: 0,
        total_unnecessary_expenses: 0,
        unnecessary_expenses: [],
      },
    })
    cy.contains("Total Balance:")
    cy.get(".set-budget-btn").click()
    cy.getInputAndEnter("#set-budget-input", "100000")

    cy.get(".set-budget-submit-btn").click()
    cy.get(".confirm-warning-btn").click()

    //   cy.get("#expense")
    //     .focus()
    //     .type("Rent")
    //   cy.get("#amount")
    //     .focus()
    //     .type("9000")
    //   cy.get(".expense-submit-btn").click()
    //   cy.contains("Warning")
    //   cy.get(".confirm-warning-btn").click()
    //   cy.get(".expense").should("have.text", "$9000")
  })

  it("handles invalid session response properly when attempting to create a budget", () => {
    cy.route("POST", "/api/account", {
      message: "INVALID_SESSION",
    })
    cy.contains("Total Balance:")
    cy.get(".set-budget-btn").click()
    cy.getInputAndEnter("#set-budget-input", "100000")

    cy.get(".set-budget-submit-btn").click()
    cy.get(".confirm-warning-btn").click()

    // User was redirected to login page
    cy.url().should("include", "/app/login")
    cy.url().should("eq", "http://localhost:8000/app/login")
  })
})
