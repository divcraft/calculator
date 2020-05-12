import React, { useState } from 'react';

export const MainScreenContext = React.createContext()
export const SecondaryScreenContext = React.createContext()
export const ResetMainContext = React.createContext()

export const ContextStore = ({ children }) => {

   const [mainScreen, setMainScreen] = useState('')
   const [secondaryScreen, setSecondaryScreen] = useState([])
   const [resetMain, setResetMain] = useState(false)

   return (
      <MainScreenContext.Provider value={[mainScreen, setMainScreen]}>
         <SecondaryScreenContext.Provider value={[secondaryScreen, setSecondaryScreen]}>
            <ResetMainContext.Provider value={[resetMain, setResetMain]}>
               {children}
            </ResetMainContext.Provider>
         </SecondaryScreenContext.Provider>
      </MainScreenContext.Provider>
   );
}
