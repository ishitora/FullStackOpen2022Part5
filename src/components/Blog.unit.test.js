import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Blog from './Blog';

describe('<Blog>', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'john',
        url: 'google.com',
        likes: 0,
    };

    test('render blog title、author,no render url when not yet click', () => {
        const { container } = render(<Blog blog={blog} getUser={() => {}} />);

        const blogInfo = container.querySelector('.blog_info');

        expect(blogInfo).toHaveTextContent(
            'Component testing is done with react-testing-library john'
        );

        const url = container.querySelector('.blog_url');
        expect(url).toBeNull();
    });

    test('render url and likes after button click', async () => {
        const { container } = render(<Blog blog={blog} getUser={() => {}} />);

        const user = userEvent.setup();

        const button = container.querySelector('.button');
        await user.click(button);
        const url = container.querySelector('.blog_url');
        const likes = container.querySelector('.blog_likes');
        expect(url).toHaveTextContent('google.com');
        expect(likes).toHaveTextContent('0');
    });

    test('likeBlog is called twice when clicked twice ', async () => {
        const likeBlog = jest.fn(() => Promise.resolve({ data: {} }));

        const { container } = render(
            <Blog blog={blog} handleLike={likeBlog} getUser={() => {}} />
        );

        const user = userEvent.setup();

        const button = container.querySelector('.button');
        await user.click(button);
        const buttonLike = container.querySelector('.button_like');
        console.log(buttonLike);
        await user.click(buttonLike);
        await user.click(buttonLike);
        expect(likeBlog.mock.calls).toHaveLength(2);
    });
});
