import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LoginPage from './pages/login-page/login.page';
import HomePage from './pages/home-page/home.page';
import AuthCallbackPage from './pages/auth-callback-page/auth-callback.page';
import AuthWrapper from './AuthWrapper';
import Layout from './components/layout/Layout';

export const routes = {
  home: '/',
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
            <Route path={''} element={<Layout />}>
              <Route index element={<HomePage />} />
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
