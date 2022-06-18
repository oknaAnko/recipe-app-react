import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from '../src/helpers/history';
import store from './store/store';

import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header.tsx';
import ErrorBoundary from './components/ErrorPages/ErrorBoundary';

import './App.scss';

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <ErrorBoundary>
          <Content />
        </ErrorBoundary>
      </Router>
      <Footer />
    </Provider>
  );
};

export default App;
