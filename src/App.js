import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import store from './store/store';

import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import './App.scss'  

import StoreProvider from './store/StoreProvider';

const App = () => { 
  return (
    <Provider store={store}> 
      <StoreProvider>
        <Router>
          <Header />
          <Content />
        </Router>
        <Footer />
        </StoreProvider>
    </Provider>
  );
}

export default App;