// https://docs.cypress.io/api/introduction/api.html

describe("Integration Testing", () => {
  // ユーザインタフェースを描画
  it("Draw user interface", () => {
    cy.visit("/");
    cy.get(".header h1").should("have.text", "yumemi-frontend-codecheck");
    cy.get(".checkbox h1").should("have.text", "都道府県");
  });
});
