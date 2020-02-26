describe("Interviews", () => {
    beforeEach(()=> {
        cy.visit('/');
    })

    it('User can create an interview', ()=> {
        cy.get('[alt="Add"]')
        .first()
        .click();
        cy.get('[data-testid=student-name-input')
        .type('Lydia Miller-Jones')

        cy.get ('.interviewers--data_selected').should('not.exist')
        
        cy.get ('.interviewers__item-image')
        .first()
        .click()
        
        cy.get ('.interviewers--data_selected').should('not.exist')

        cy.get('[alt="Add"]')
        .first()
        .click();

        cy.get(':nth-child(3) > .appointment__card')
        .within(()=> {
            cy.get('.interviewers__item--selectd').should('not.exist')
        })
    })
})