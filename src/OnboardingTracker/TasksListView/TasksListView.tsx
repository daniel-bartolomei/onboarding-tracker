/*****************************
* Author: Robert Bartolomei *
*****************************/

import React, { useEffect, useState } from 'react';
import { Case, Switch } from 'react-if';
import { useParams } from 'react-router-dom'
import apis from '../apis';
import Todo from '../models/Todo';

import './TasksListView.scss'

const TasksListView: React.FC = (): React.ReactElement => {
    const [loading, setLoading] = useState(false)   // to show the loading placeholders
    const [error, setError] = useState<Error>()     // in case of any rerrors to be displayed
    const [todos, setTodos] = useState<Todo[]>([])  // list of todos
    const { userId } = useParams()                  //get userId from the URL trough react router

    useEffect(() => {
        setLoading(true) // before requesting the data set loading to true

        apis.getTodos(Number(userId)).then((todos: Todo[]) => {
            setTodos(todos)             // update todos list
            setLoading(false)           // set loading to false once finished retrieving the data
        }).catch((error: Error) => {    // for catching api errors and displaying to the user
            setError(error)
        })
    }, [userId])

    return (
        <div className='tasks-list'>
            <header>Tasks List</header>
            <Switch>
            <Case condition={loading && !error}>
                    <div className="placeholder-glow">
                        <div className="form-check unselectable placeholder col-12 placeholder-lg" />
                        <div className="form-check unselectable placeholder col-12 placeholder-lg" />
                        <div className="form-check unselectable placeholder col-12 placeholder-lg" />
                    </div>
                </Case>
                <Case condition={!loading && todos?.length}>
                    <div className='list'>
                        {todos.map((todo: Todo) => {
                            return (
                                <div className="form-check unselectable" key={todo.id}>
                                    <input
                                        disabled
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={todo.completed}
                                        id={todo.id.toString()} />
                                    <label className="form-check-label" htmlFor={todo.id.toString()}>
                                        {todo.title}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </Case>
                <Case condition={error !== undefined}>
                    <div className="alert alert-danger" role="alert">
                        {error?.message}
                    </div>
                </Case>
            </Switch>
        </div>
    );
}

export default TasksListView;