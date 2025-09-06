import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login-page/login.page';
import HomePage from './pages/home-page/home.page';
import AuthWrapper from './AuthWrapper';
import Layout from './components/layout/Layout';

export const routes = {
  home: '/',
  login: '/login',
  notFound: '*'
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={""} element={<AuthWrapper />}>
            <Route path={""} element={<Layout />}>
              <Route index element={<HomePage />} />
            </Route>
          </Route>
          <Route path={""} element={<Layout />}>
            {/* <Route path={routes.notFound} element={<NotFoundPage />} /> */}
          </Route>
        </Routes> 
    </BrowserRouter>
  );
};

export default App;