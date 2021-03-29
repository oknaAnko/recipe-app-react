import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import './App.scss'

import StoreProvider from './store/StoreProvider';

const App = () => {
  return (
    <StoreProvider >
      <Router>
        <Header />
        <Content />
      </Router>
      <Footer />
    </StoreProvider>
  );
}

export default App;