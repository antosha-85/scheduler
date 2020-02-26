describe("Should book an interview", () => {
    it("should book an interview", () => {
        cy.visit("/");
        cy.contains("Monday");
        cy.get("[alt=Add]")
        .first()
        .click()
        .get("[data-testid=student-name-input]")
        .type('Lydia Miller-Jones')
    });
});
