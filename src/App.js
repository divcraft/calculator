import React from 'react';
import './App.css';
import logo from './logo.svg';
import { ContextStore } from './ContextStore'

import Screen from './components/Screen';
import Keyboard from './components/Keyboard';

function App() {
  return (
    <ContextStore>
      <div className="wrapper">
        <header>
          <img className='logo' src={logo} alt="logo" />
        </header>
        <section className="calculator">
          <Screen />
          <Keyboard />
        </section>
      </div>
    </ContextStore>
  );
}

export default App;
