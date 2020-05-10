import React, { useContext } from 'react';
import { MainScreenContext, SecondaryScreenContext } from '../ContextStore'

const Screen = () => {
   const [mainScreen] = useContext(MainScreenContext)
   const [secondaryScreen] = useContext(SecondaryScreenContext)

   return (
      <div className="screen">
         <div className="secondary-screen">
            {secondaryScreen.join(' ').slice(0, 80)}
         </div>
         <div className="main-screen">
            {mainScreen ? mainScreen.slice(0, 13) : '0'}
         </div>
      </div>
   );
}

export default Screen;