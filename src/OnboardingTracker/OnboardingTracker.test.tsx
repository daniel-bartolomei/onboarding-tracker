import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom'

import OnboardingTracker from './OnboardingTracker';

jest.mock("./UsersView", () => () => {
    return <div>UsersView page</div>;
});
jest.mock("./TasksListView", () => () => {
    return <div>TasksListView page</div>;
});

test('renders learn react link', async () => {
    render(<OnboardingTracker />, { wrapper: BrowserRouter });

    expect(screen.getByText(/Onboarding tracker/i)).toBeInTheDocument();
});
test('landing index page', () => {
    const route = '/'

    render(
        <MemoryRouter initialEntries={[route]}>
            <OnboardingTracker />
        </MemoryRouter>,
    )

    expect(screen.getByText(/UsersView page/i)).toBeInTheDocument()
})

test('landing user details page', () => {
    const route = '/users/:1'

    render(
        <MemoryRouter initialEntries={[route]}>
            <OnboardingTracker />
        </MemoryRouter>,
    )

    expect(screen.getByText(/UsersView page/i)).toBeInTheDocument()
    expect(screen.getByText(/TasksListView page/i)).toBeInTheDocument()
})

test('landing on a bad page', () => {
    const badRoute = '/error'

    render(
        <MemoryRouter initialEntries={[badRoute]}>
            <OnboardingTracker />
        </MemoryRouter>,
    )

    expect(screen.getByText(/404 Error/i)).toBeInTheDocument()
})
