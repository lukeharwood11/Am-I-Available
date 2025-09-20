import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LoginPage from './pages/login-page/login.page';
import HomePage from './pages/home-page/home.page';
import AuthCallbackPage from './pages/auth-callback-page/auth-callback.page';
import EventsPage from './pages/events-page/events.page';
import EventDetailPage from './pages/events-page/event-detail.page';
import CreateEventsPage from './pages/events-page/create-events.page';
import EditEventPage from './pages/events-page/edit-event.page';
import AuthWrapper from './AuthWrapper';
import Layout from './components/layout/Layout';
import LandingPage from './pages/landing-page/landing.page';
import ProfilePage from './pages/profile-page/profile.page';

export const routes = {
    landing: '/',
    home: '/dashboard',
    profile: '/profile',
    events: {
        all: '/events',
        new: '/events/new',
        by_id: '/events/:id',
        edit: '/events/:id/edit',
    },
    login: '/login',
    authCallback: '/auth/callback',
    notFound: '*',
};

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path={routes.login} element={<LoginPage />} />
                    <Route
                        path={routes.authCallback}
                        element={<AuthCallbackPage />}
                    />
                    <Route path={''} element={<AuthWrapper />}>
                        <Route
                            index
                            path={routes.landing}
                            element={<LandingPage />}
                        />
                        <Route path={''} element={<Layout />}>
                            <Route path={routes.home} element={<HomePage />} />
                            <Route
                                path={routes.events.all}
                                element={<EventsPage />}
                            />
                            <Route
                                path={routes.events.new}
                                element={<CreateEventsPage />}
                            />
                            <Route
                                path={routes.events.by_id}
                                element={<EventDetailPage />}
                            />
                            <Route
                                path={routes.events.edit}
                                element={<EditEventPage />}
                            />
                            <Route
                                path={routes.profile}
                                element={<ProfilePage />}
                            />
                        </Route>
                    </Route>
                    <Route path={''} element={<Layout />}>
                        {/* <Route path={routes.notFound} element={<NotFoundPage />} /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
