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
import LandingLayout from './components/layout/LandingLayout';
import LandingPage from './pages/landing-page/landing.page';
import ProfilePage from './pages/profile-page/profile.page';
import ChatPage from './pages/chat-page/chat.page';
import NotFoundPage from './pages/not-found-page/not-found.page';
import TermsOfServicePage from './pages/legal-pages/terms-of-service.page';
import PrivacyPolicyPage from './pages/legal-pages/privacy-policy.page';
import CookiePolicyPage from './pages/legal-pages/cookie-policy.page';
import SecurityOverviewPage from './pages/security-pages/security-overview.page';
import PricingPage from './pages/pricing-page/pricing.page';
import { Toaster } from 'react-hot-toast';

export const routes = {
    landing: '/',
    home: '/dashboard',
    profile: '/profile',
    chat: '/chat',
    events: {
        all: '/events',
        new: '/events/new',
        by_id: '/events/:id',
        edit: '/events/:id/edit',
    },
    legal: {
        terms: '/legal/terms',
        privacy: '/legal/privacy',
        cookies: '/legal/cookies',
    },
    security: {
        overview: '/security',
    },
    pricing: '/pricing',
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
                    <Route path={''} element={<LandingLayout />}>
                        <Route
                            index
                            path={routes.landing}
                            element={<LandingPage />}
                        />
                        <Route
                            path={routes.legal.terms}
                            element={<TermsOfServicePage />}
                        />
                        <Route
                            path={routes.legal.privacy}
                            element={<PrivacyPolicyPage />}
                        />
                        <Route
                            path={routes.legal.cookies}
                            element={<CookiePolicyPage />}
                        />
                        <Route
                            path={routes.security.overview}
                            element={<SecurityOverviewPage />}
                        />
                        <Route
                            path={routes.pricing}
                            element={<PricingPage />}
                        />
                    </Route>
                    <Route path={''} element={<AuthWrapper />}>
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
                            <Route path={routes.chat} element={<ChatPage />} />
                        </Route>
                    </Route>
                    <Route path='' element={<LandingLayout />}>
                        <Route
                            path={routes.notFound}
                            element={<NotFoundPage />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster />
        </Provider>
    );
};

export default App;
