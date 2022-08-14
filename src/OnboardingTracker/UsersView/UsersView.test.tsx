import React from 'react';
import { act, render, screen } from '@testing-library/react';
import UsersView from './UsersView';
import Router from "react-router-dom";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

test('renders initial page', async () => {

    jest.spyOn(Router, 'useParams').mockReturnValue({ userId: '1' })
    jest.spyOn(Router, 'useNavigate').mockReturnValue(jest.fn)


    render(<UsersView />);

    expect(screen.getByText(/Users/i)).toBeInTheDocument();
});


test('renders users list', async () => {

    jest.spyOn(Router, 'useParams').mockReturnValue({ userId: '1' })
    jest.spyOn(Router, 'useNavigate').mockReturnValue(jest.fn)

    const data = [
        {
            "id": 1,
            "name": "Leanne Graham",
        }];

    jest.spyOn(global, "fetch").mockImplementation(jest.fn(() =>
        Promise.resolve({
            status: 200,
            json: () => Promise.resolve(data)
        })
      ,) as jest.Mock)

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        render(<UsersView />);
    });

    expect(screen.getByText(data[0].name)).toBeInTheDocument();
});