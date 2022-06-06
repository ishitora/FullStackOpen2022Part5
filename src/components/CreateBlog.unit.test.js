import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CreateBlogFrom from './CreateBlogFrom';

describe('<CreateBlogFrom>', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'john',
        url: 'google.com',
        likes: 0,
    };
    const getUser = jest.fn();
    test('likeBlog is called twice when clicked twice ', async () => {
        const createBlog = jest.fn();

        const { container } = render(
            <CreateBlogFrom
                createBlog={createBlog}
                getUser={() => {}}
                displayNotification={() => {}}
            />
        );

        const user = userEvent.setup();

        const button = container.querySelector('.add_button');

        const author = screen.getByPlaceholderText('enter author');
        const title = screen.getByPlaceholderText('enter title');
        const url = screen.getByPlaceholderText('enter url');

        await user.type(author, 'author1');
        await user.type(title, 'title1');
        await user.type(url, 'url1');

        await user.click(button);
        expect(createBlog.mock.calls).toHaveLength(1);

        expect(createBlog.mock.calls[0][0]).toEqual({
            author: 'author1',
            title: 'title1',
            url: 'url1',
        });
    });
});
