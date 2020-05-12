import React, { useContext, useEffect } from 'react';
import { MainScreenContext, SecondaryScreenContext, ResetMainContext } from '../store/ContextStore'

import { buttons } from '../utils/buttons'

const Keyboard = () => {
   const [mainScreen, setMainScreen] = useContext(MainScreenContext)
   const [secondaryScreen, setSecondaryScreen] = useContext(SecondaryScreenContext)
   const [resetMain, setResetMain] = useContext(ResetMainContext)
   const context = { mainScreen, setMainScreen, secondaryScreen, setSecondaryScreen, resetMain, setResetMain }
   const handleKeyDown = (e) => {
      buttons.forEach(button => {
         if (e.keyCode === button.code) {
            if (e.shiftKey && button.shiftRequired) return button.handleButton(context, button.sign)
            if (!e.shiftKey && !button.shiftRequired) return button.handleButton(context, button.sign)
         }
         if (e.keyCode === button.codeNum) return button.handleButton(context, button.sign)
      })
   }
   useEffect(() => {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
   })
   return (
      <div className="keyboard">
         {buttons.map(button => (
            <button
               key={button.name}
               className={button.name}
               onClick={() => button.handleButton(context, button.sign)}>
               {button.sign}
            </button>))}
      </div>
   );
}

export default Keyboard;