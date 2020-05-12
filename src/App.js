import React from 'react';
import './styles/App.css';
import divcraftLogo from './images/logo.svg';
import githubLogo from './images/GitHub-Mark-64px.png';
import { ContextStore } from './store/ContextStore'

import Screen from './components/Screen';
import Keyboard from './components/Keyboard';

function App() {
  return (
    <ContextStore>
      <div className="wrapper">
        <header className='header'>

          <a href="https://github.com/divcraft" TARGET="_blank">
            <img className='logo divcraft-logo' src={divcraftLogo} alt="div-craft logo" />
          </a>
          <a href="https://github.com/divcraft/calculator" TARGET="_blank">
            <img className='logo github-logo' src={githubLogo} alt="github logo" />
          </a>
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
