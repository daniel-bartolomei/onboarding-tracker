/*****************************
* Author: Robert Bartolomei *
*****************************/

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { Switch, Case } from 'react-if';
import classNames from 'classnames';

import apis from '../apis';

import './UsersView.scss'
import User from '../models/User';


const UsersView: React.FC = (): React.ReactElement => {

    const [users, setUsers] = useState<User[]>([])  // list of users
    const [loading, setLoading] = useState(false)   // to show the loading placeholders
    const [error, setError] = useState<Error>()     // in case of any rerrors to be displayed
    const { userId } = useParams()                  // get userId from the URL trough react router
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true) // before requesting the data set loading to true

        apis.getUsers().then((users: User[]) => {
            setUsers(users)
            setLoading(false)

            /* set current user trough react router (which will be received trough 'userId' from useParams()) */
            if(userId === undefined) {
                navigate(`/users/${users[0].id}`)
            }

            /* if the userId is defied and not in the list of users any more, we need to redirect to 404 error page */
            if(userId !== undefined && !users.find((user:User) => user.id === Number(userId))) {
                navigate(`/error`)
            }
        }).catch((error: Error) => {    // for catching api errors and displaying to the user
            setError(error)
        })
    }, [])

    return (
        <div className='users'>
            <header>Users</header>
            <Switch>
                <Case condition={loading && !error}>
                    <div className="placeholder-glow">
                        <div className="user-wrapper unselectable placeholder col-12 placeholder-lg" />
                        <div className="user-wrapper unselectable placeholder col-12 placeholder-lg" />
                        <div className="user-wrapper unselectable placeholder col-12 placeholder-lg" />
                    </div>
                </Case>
                <Case condition={!loading && users?.length}>
                    <div className='list'>
                        {users.map((user: User) => {
                            return (
                                <div className="user-wrapper unselectable" key={user.id} onClick={() => { navigate(`/users/${user.id}`); }}>
                                    {user.name} <span className={classNames({ nodisplay: Number(userId) !== user.id })}>{'≫'}</span>
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

export default UsersView;
