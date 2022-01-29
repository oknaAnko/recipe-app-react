import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header.tsx';

import './App.scss';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Content />
      </Router>
      <Footer />
    </Provider>
  );
};

export default App;
