import React from 'react';
import { act, render, screen } from '@testing-library/react';
import TasksListView from './TasksListView';
import Router from "react-router-dom";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

test('renders initial page', async () => {

    jest.spyOn(Router, 'useParams').mockReturnValue({ userId: '1' })

    render(<TasksListView />);

    expect(screen.getByText(/Tasks List/i)).toBeInTheDocument();
});


test('renders todos list', async () => {

    jest.spyOn(Router, 'useParams').mockReturnValue({ userId: '1' })

    const data = [
        {
            "userId": 1,
            "id": 1,
            "title": "some title",
            "completed": true
        }];

    jest.spyOn(global, "fetch").mockImplementation(jest.fn(() =>
        Promise.resolve({
            status: 200,
            json: () => Promise.resolve(data)
        })
      ,) as jest.Mock)

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        render(<TasksListView />);
    });

    expect(screen.getByText(data[0].title)).toBeInTheDocument();
});