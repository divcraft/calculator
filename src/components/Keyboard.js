import React, { useContext, useEffect } from 'react';
import {
   MainScreenContext,
   SecondaryScreenContext,
   ResetMainContext
} from '../ContextStore'
import {
   handleNumber,
   handleDot,
   handleNegation,
   handleOperation,
   handlePercent,
   handleFraction,
   handleSquare,
   handleSquareRoot,
   handleDeletion,
   handleClearEntry,
   handleClearAll
} from '../utils/buttonHandlers'

const buttons = [
   {
      name: 'zero',
      sign: '0',
      code: 48,
      shiftRequired: false,
      codeNum: 96,
      handleButton: handleNumber
   },
   {
      name: 'one',
      sign: '1',
      code: 49,
      shiftRequired: false,
      codeNum: 97,
      handleButton: handleNumber
   },
   {
      name: 'two',
      sign: '2',
      code: 50,
      shiftRequired: false,
      codeNum: 98,
      handleButton: handleNumber
   },
   {
      name: 'three',
      sign: '3',
      code: 51,
      shiftRequired: false,
      codeNum: 99,
      handleButton: handleNumber
   },
   {
      name: 'four',
      sign: '4',
      code: 52,
      shiftRequired: false,
      codeNum: 100,
      handleButton: handleNumber
   },
   {
      name: 'five',
      sign: '5',
      code: 53,
      shiftRequired: false,
      codeNum: 101,
      handleButton: handleNumber
   },
   {
      name: 'six',
      sign: '6',
      code: 54,
      shiftRequired: false,
      codeNum: 102,
      handleButton: handleNumber
   },
   {
      name: 'seven',
      sign: '7',
      code: 55,
      shiftRequired: false,
      codeNum: 103,
      handleButton: handleNumber
   },
   {
      name: 'eight',
      sign: '8',
      code: 56,
      shiftRequired: false,
      codeNum: 104,
      handleButton: handleNumber
   },
   {
      name: 'nine',
      sign: '9',
      code: 57,
      shiftRequired: false,
      codeNum: 105,
      handleButton: handleNumber
   },
   {
      name: 'negation',
      sign: '+/-',
      code: null,
      shiftRequired: false,
      codeNum: null,
      handleButton: handleNegation
   },
   {
      name: 'dot',
      sign: '.',
      code: 190,
      shiftRequired: false,
      codeNum: 110,
      handleButton: handleDot
   },
   {
      name: 'addition',
      sign: '+',
      code: 61,
      shiftRequired: true,
      codeNum: 107,
      handleButton: handleOperation
   },
   {
      name: 'subtraction',
      sign: '-',
      code: 173,
      shiftRequired: false,
      codeNum: 109,
      handleButton: handleOperation
   },
   {
      name: 'multiplication',
      sign: '*', // na interfejsie zamienić * na x
      code: 56,
      shiftRequired: true,
      codeNum: 106,
      handleButton: handleOperation
   },
   {
      name: 'division',
      sign: '/',
      code: 191,
      shiftRequired: false,
      codeNum: 111,
      handleButton: handleOperation
   },
   {
      name: 'equalSign',
      sign: '=',
      code: 61,
      shiftRequired: false,
      codeNum: 13,
      handleButton: handleOperation
   },
   {
      name: 'percent',
      sign: '%',
      code: 53,
      shiftRequired: true,
      codeNum: null,
      handleButton: handlePercent
   },
   {
      name: 'fraction',
      sign: '1/x',
      code: null,
      shiftRequired: false,
      codeNum: null,
      handleButton: handleFraction
   },
   {
      name: 'square',
      sign: 'x2',
      code: null,
      shiftRequired: false,
      codeNum: null,
      handleButton: handleSquare
   },
   {
      name: 'squareRoot',
      sign: '√x',
      code: null,
      shiftRequired: false,
      codeNum: null,
      handleButton: handleSquareRoot
   },
   {
      name: 'deletion',
      sign: '<',
      code: 8,
      shiftRequired: false,
      codeNum: null,
      handleButton: handleDeletion
   },
   {
      name: 'clearEntry',
      sign: 'CE',
      code: null,
      shiftRequired: false,
      codeNum: null,
      handleButton: handleClearEntry
   },
   {
      name: 'clearAll',
      sign: 'C',
      code: 27,
      shiftRequired: false,
      codeNum: null,
      handleButton: handleClearAll
   },
]

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
      console.log(mainScreen, secondaryScreen, resetMain)
   })
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