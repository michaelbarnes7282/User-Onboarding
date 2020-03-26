describe("Testing our volunteer form", function () {
    beforeEach(function () {
        cy.visit("http://localhost:3000/");
    })
    it("Add test to inputs and submit form", function () {
        cy.get('input[name="name"]')
            .type("Michael")
            .should("have.value", "Michael");
        cy.get('input[name="email"]')
            .type("testemail@gmail.com")
            .should("have.value", "testemail@gmail.com");
        cy.get('input[name="password"]')
            .type("password")
            .should("have.value", "password");
        cy.get('[type="checkbox"]')
            .check()
            .should("be.checked");
        cy.get("button")
            .click();
        cy.get("button")
            .click()
            .should("be.disabled");
    });
});