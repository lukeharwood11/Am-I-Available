import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LoginPage from './pages/login-page/login.page';
import HomePage from './pages/home-page/home.page';
import AuthCallbackPage from './pages/auth-callback-page/auth-callback.page';
import RequestsPage from './pages/requests-page/requests.page';
import RequestDetailPage from './pages/requests-page/request-detail.page';
import CreateRequestPage from './pages/requests-page/create-request.page';
import EditRequestPage from './pages/requests-page/edit-request.page';
import AuthWrapper from './AuthWrapper';
import Layout from './components/layout/Layout';
import LandingPage from './pages/landing-page/landing.page';
import ProfilePage from './pages/profile-page/profile.page';

export const routes = {
  landing: '/',
  home: '/dashboard',
  profile: '/profile',
  requests: {
    all: '/requests',
    new: '/requests/new',
    by_id: '/requests/:id',
    edit: '/requests/:id/edit',
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
          <Route path={routes.authCallback} element={<AuthCallbackPage />} />
          <Route path={''} element={<AuthWrapper />}>
            <Route index path={routes.landing} element={<LandingPage />} />
            <Route path={''} element={<Layout />}>
              <Route path={routes.home} element={<HomePage />} />
              <Route path={routes.requests.all} element={<RequestsPage />} />
              <Route path={routes.requests.new} element={<CreateRequestPage />} />
              <Route path={routes.requests.by_id} element={<RequestDetailPage />} />
              <Route path={routes.requests.edit} element={<EditRequestPage />} />
              <Route path={routes.profile} element={<ProfilePage />} />
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
