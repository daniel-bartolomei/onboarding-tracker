/*****************************
* Author: Robert Bartolomei *
*****************************/

import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './OnboardingTracker.scss'
import TasksListView from './TasksListView';
import UsersView from './UsersView';

const OnboardingTracker: React.FC = (): React.ReactElement => {
    return (
        <div className='onboarding-tracker'>
            <header>Onboarding tracker</header>
            <Routes>
                <Route path="/" element={(
                    <>
                        <div className="row">
                            <div className="col-md-6">
                                <UsersView />
                            </div>
                        </div>
                    </>
                )} />
                <Route path="/users/:userId" element={(
                    <>
                        <div className="row">
                            <div className="col-md-6">
                                <UsersView />
                            </div>
                            <div className="col-md-6">
                                <TasksListView />
                            </div>
                        </div>
                    </>
                )} />
                <Route path="/error" element={(
                    <>
                        <div className="alert alert-danger" role="alert">
                            404 Error: User could not be found... <Link to={"/"}>go back to index page</Link>.
                        </div>
                        
                    </>
                )} />
            </Routes>
        </div>
    );
}

export default OnboardingTracker;