describe('To Do List', () => {

    it('Hit the ToDo portal URL in the browser', () => {
        cy.visit('http://todomvc.com/examples/react/#/')
    });

    it('User should be able add a To Do', () => {
        cy.addNote('.new-todo', 'Collect keys from Mr.A @8.')
        cy.get('ul.todo-list li:first label')
            .should('have.text', 'Collect keys from Mr.A @8.')
    });

    it('User should be able to add only a valid To Do', () => {
        cy.addNote('.new-todo', '##$$%%^^')
        cy.get('.view > label:last')
            .should('not.have.text', '##$$%%^^')
    });

    it('There should be a Max length restriction of 500 characters to add a To Do', () => {
        Cypress.config('defaultCommandTimeout', 10000)
        var input = 'An area which is rarely used in Facebook is the Notes section. It is a writing area which many bloggers find useful. The reason is because Facebook Notes does not have a character limit, as of yet. Users are directed to this area if they have very long status or comment to make. This can be used to someone\'s advantage if they have a longer post to make and wish to share it with their friends through tagging. At Facebook, users upload and post new photos every day. When uploading pictures, users may need to write a description, which is less than 63,206 characters. Once uploaded, few friends will comment about the post, which should give them a character limit of 8000 characters.';
        cy.addNote('.new-todo', input)
        Cypress.config('defaultCommandTimeout', 5000)
        cy.get('.view > label:last')
            .should('not.have.text', input)
    });

    it('User should not be able to add duplicate To Do', () => {
        cy.addNote('.new-todo', 'Collect keys from Mr.A @8.')
        cy.get('.view > label:last')
            .should('not.have.text', 'Collect keys from Mr.A @8.')
    });

    it('User should see the newly added item at the end of the list.', () => {
        cy.addNote('.new-todo', 'Last Item Test')
        cy.get('.view > label:last')
            .should('have.text', 'Last Item Test')
    });

    it('User should be able to edit the ToDo\'s added earlier', () => {
        cy.addNote('.new-todo', 'Initial Text')
        cy.get('.view > label:last').dblclick()
        cy.updateNote('.todo-list li:last > input', 'Updated Text')
        cy.get('.view > label:last')
            .should('have.text', 'Updated Text')
    });

    it('User should be able to update only a valid ToDo', () => {
        cy.addNote('.new-todo', 'Initial Text')
        cy.get('.view > label:last').dblclick()
        cy.updateNote('.todo-list li:last > input', '##$$%%^^')
        cy.get('.view > label:last')
            .should('not.have.text', '##$$%%^^')
    });

    it('There should be a Max length restriction during ToDo edit', () => {
        var input = 'An area which is rarely used in Facebook is the Notes section. It is a writing area which many bloggers find useful. The reason is because Facebook Notes does not have a character limit, as of yet. Users are directed to this area if they have very long status or comment to make. This can be used to someone\'s advantage if they have a longer post to make and wish to share it with their friends through tagging. At Facebook, users upload and post new photos every day. When uploading pictures, users may need to write a description, which is less than 63,206 characters. Once uploaded, few friends will comment about the post, which should give them a character limit of 8000 characters.';
        cy.addNote('.new-todo', 'Initial Task')
        cy.get('.view > label:last').dblclick()
        Cypress.config('defaultCommandTimeout', 10000)
        cy.updateNote('.todo-list li:last > input', input)
        Cypress.config('defaultCommandTimeout', 5000)
        cy.get('.view > label:last')
            .should('not.have.text', input)
    });

    it('User should not be able to edit and add a duplicate ToDo item', () => {

        cy.addNote('.new-todo', 'Initial Text')
        cy.get('.view > label:last').dblclick()
        cy.updateNote('.todo-list li:last > input', 'Collect keys from Mr.A @8.')
        cy.get('.view > label:last')
            .should('not.have.text', 'Collect keys from Mr.A @8.')
    });

    it('User should be able to mark task he added as "Complete"', () => {
        cy.get('ul.todo-list li:first label')
            .should('have.text', 'Collect keys from Mr.A @8.')
        cy.get('ul.todo-list li:first .view > input')
            .click()
    });

    it('User should be able to change the "Complete" task to "Active" again', () => {
        cy.get('ul.todo-list li:first label')
            .should('have.text', 'Collect keys from Mr.A @8.')
        cy.get('ul.todo-list li:first .view > input')
            .click()
    });

    it('User should be able to mark all the task as "Complete" at once"', () => {
        cy.get('[data-reactid=".0.1.1"')
            .click()
    });

    it('User should be able to change all the "Complete" task to "Active" again', () => {
        cy.get('[data-reactid=".0.1.1"')
            .click()
    });

    it('"Clear Completed" button should be visbile only if there is atleast one completed task', () => {
        cy.get('.clear-completed')
            .should('not.be.visible')
    });

    it('User should be able to clear all the completed tasks', () => {
        cy.get('ul.todo-list li:first label')
            .should('have.text', 'Collect keys from Mr.A @8.')
        cy.get('ul.todo-list li:first .view > input')
            .click()
        cy.get('.clear-completed')
            .click()
    });

    it('User should be able to Delete an item from todo', () => {
        cy.get('.view > label:last')
            .should('have.text', 'Collect keys from Mr.A @8.')
            .trigger('mouseover')
        cy.get('ul.todo-list li:last .view > button')
            .invoke('show')
            .click()
    });

    it('Confirmation before deleting an item', () => {
        cy.addNote('.new-todo', 'Text to be deleted')
        cy.get('.view > label:last')
            .should('have.text', 'Text to be deleted')
            .trigger('mouseover')
        cy.get('ul.todo-list li:last .view > button')
            .invoke('show')
            .click()
        cy.get('.view > label:last')
            .should('have.text', 'Text to be deleted')
    });

    it('User should be able to view all the active tasks', () => {
        cy.get('[data-reactid=".0.2.1.2"] > a')
            .click()
        cy.get('[data-reactid=".0.2.0.0"]')
            .should('have.text', '7')

    });

    it('User should be able to view all the completed tasks', () => {
        cy.addNote('.new-todo', 'Water the plants')
        cy.get('ul.todo-list li:last .view > input')
            .click()
        cy.get('[data-reactid=".0.2.1.4"] > a')
            .click()
    });

    it('User should be able to view all the task irrespective of any status', () => {
        cy.get('[data-reactid=".0.2.1.0"] > a')
            .click()
    });

})