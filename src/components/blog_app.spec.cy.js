const user = {
    name: 'testuser',
    username: 'user123',
    password: 'password12345',
};

describe('Blog app', function () {
    beforeEach(function () {
        cy.clearLocalStorage('token');
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.request('POST', 'http://localhost:3003/api/users/', user);
        cy.visit('http://localhost:3000');
    });

    it('Login form is shown', function () {
        cy.get('.username_input');
        cy.get('.password_input');
    });

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('.username_input').type('user123');
            cy.get('.password_input').type('password12345');
            cy.get('button').click();
            cy.get('p').should('contain', 'user123 logged in');
        });

        it('fails with wrong credentials', function () {
            cy.reload();
            cy.get('.username_input').type('user122');
            cy.get('.password_input').type('password12345');
            cy.get('button').click();
            cy.get('.notification').should(
                'have.css',
                'color',
                'rgb(255, 0, 0)'
            );
        });
    });

    describe('When logged in', function () {
        beforeEach(function () {
            cy.get('.username_input').type('user123');
            cy.get('.password_input').type('password12345');
            cy.get('button').click();
        });

        // it('A blog can be created', function () {
        //     cy.contains('button', 'new blog').click();
        //     cy.get('input[name="title"]').type('blog1');
        //     cy.get('input[name="author"]').type('user123');
        //     cy.get('input[name="url"]').type('www.react.com');
        //     cy.contains('button', 'create').click();

        //     cy.get('.blog_info')
        //         .should('include.text', 'blog1')
        //         .and('include.text', 'user123');
        //     cy.request('GET', 'http://localhost:3003/api/blogs').should(
        //         (response) => {
        //             expect(response.status).to.eq(200);
        //             expect(response.body.length).to.eq(1);
        //         }
        //     );
        // });

        // it('A blog can be liked', function () {
        //     cy.contains('button', 'new blog').click();
        //     cy.get('input[name="title"]').type('blog1');
        //     cy.get('input[name="author"]').type('user123');
        //     cy.get('input[name="url"]').type('www.react.com');
        //     cy.contains('button', 'create').click();
        //     cy.contains('button', 'detial').click();

        //     cy.contains('button', 'like').click();

        //     cy.get('.blog_likes').should('contain', '1');
        // });
        // it('A blog can be deleted', function () {
        //     cy.contains('button', 'new blog').click();
        //     cy.get('input[name="title"]').type('blog1');
        //     cy.get('input[name="author"]').type('user123');
        //     cy.get('input[name="url"]').type('www.react.com');
        //     cy.contains('button', 'create').click();
        //     cy.contains('button', 'detial').click();

        //     cy.contains('button', 'remove').click();

        //     cy.get('.blog_info').should('not.exist');
        // });

        it('Blogs can be sorted', function () {
            cy.contains('button', 'new blog').click();
            cy.get('input[name="title"]').type('blog1');
            cy.get('input[name="author"]').type('user123');
            cy.get('input[name="url"]').type('www.react.com');
            cy.contains('button', 'create').click();
            cy.contains('button', 'new blog').click();
            cy.get('input[name="title"]').type('The title with the most likes');
            cy.get('input[name="author"]').type('user123');
            cy.get('input[name="url"]').type('www.test.com');
            cy.contains('button', 'create').click();

            cy.contains('button', 'detial').click();
            cy.contains('button', 'detial').click();
            cy.get('.blog_info').then(($titles) => {
                cy.wrap($titles)
                    .eq(0)
                    .parent('div')
                    .find('.button_like')
                    .then(($button) => {
                        cy.wrap($button).click();
                        cy.wait(1500);
                        cy.wrap($button).click();
                        cy.wait(1500);
                        cy.wrap($button).click();
                    });

                cy.wrap($titles)
                    .eq(1)
                    .parent('div')
                    .find('.button_like')
                    .then(($button) => {
                        cy.wrap($button).click();
                        cy.wait(1500);
                        cy.wrap($button).click();
                        cy.wait(1500);
                        cy.wrap($button).click();
                        cy.wait(1500);
                        cy.wrap($button).click();

                        cy.wait(1500);

                        cy.get('.blog_info')
                            .eq(0)
                            .should(
                                'include.text',
                                'The title with the most likes'
                            );
                        cy.get('.blog_info')
                            .eq(1)
                            .should('include.text', 'blog1');
                    });
            });
        });
    });
});
