describe("Budget page deposit features", () => {
  beforeEach(() => {
    cy.seedAndVisitBudgetPage()
  })

  it("creates a deposit", () => {
    cy.contains("Total Balance:")
  })
})
