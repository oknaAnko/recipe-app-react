import React from 'react';

import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';

import './App.css'

import StoreProvider from './store/StoreProvider';

const App = () => {
  return (
    <StoreProvider >
      <Header />
      <div className="content-wrapper">
        <Content />
      </div>
      <Footer />
    </StoreProvider>
  );
}

export default App;