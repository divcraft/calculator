export const handleNumber = (context, sign) => {
   const { mainScreen, setMainScreen, secondaryScreen, setSecondaryScreen, resetMain, setResetMain } = context
   if (sign === '0' && !mainScreen) return
   if (sign === '0' && mainScreen && resetMain) return
   if (sign === '0' && resetMain && secondaryScreen[secondaryScreen.length - 1] === '=') {
      setMainScreen('')
      setSecondaryScreen([])
   } else if (resetMain) {
      if (secondaryScreen[secondaryScreen.length - 1] === '=') setSecondaryScreen([])
      setMainScreen(sign)
   } else {
      setMainScreen(mainScreen + sign)
   }
   setResetMain(false)
}

export const handleDot = (context) => {
   const { mainScreen, setMainScreen, resetMain, setResetMain } = context
   if (mainScreen[mainScreen.length - 1] === '-') return
   if (!mainScreen) return setMainScreen('0.')
   if (mainScreen && resetMain) {
      setResetMain(false)
      return setMainScreen('0.')
   }
   if (mainScreen.includes('.')) return
   setMainScreen(mainScreen + '.')
}

export const handleNegation = (context) => {
   const { mainScreen, setMainScreen } = context
   if (!mainScreen || mainScreen === '0' || mainScreen === '0.') return
   mainScreen.includes('-') ? setMainScreen(mainScreen.replace('-', '')) : setMainScreen('-' + mainScreen)
}

export const handleOperation = (context, sign) => {

   const { mainScreen, setMainScreen, secondaryScreen, setSecondaryScreen, resetMain, setResetMain } = context
   const mainLastItem = mainScreen[mainScreen.length - 1]
   const secondaryLastItem = secondaryScreen[secondaryScreen.length - 1]

   if (mainLastItem === '.') return
   if (!mainScreen && secondaryScreen.length === 0) return
   if (sign !== '=' && resetMain) {
      if ((sign === '*' || sign === '/') && secondaryScreen[secondaryScreen.length - 2] !== ')') {
         return setSecondaryScreen(['(', ...secondaryScreen.slice(0, -1), ')', sign])
      } else {
         return setSecondaryScreen([...secondaryScreen.slice(0, -1), sign])
      }
   }

   let score
   let main
   let secondary

   mainScreen[0] === '-' ? main = `(${mainScreen})` : main = mainScreen
   secondaryScreen.length < 2 ? score = secondaryScreen : score = secondaryScreen.slice(0, -1)
   score = score.join('')
   if (score) score = `(${score})`
   secondaryScreen.length < 2 ? score = score + main : score = score + secondaryLastItem + main

   if (sign === '=' && secondaryLastItem === '=') {
      const lastNumber = secondaryScreen[secondaryScreen.length - 2]
      const lastOperationSign = secondaryScreen[secondaryScreen.length - 3]
      if (secondaryScreen.length === 2) {
         score = mainScreen
         secondary = [mainScreen, '=']
      } else {
         score = `(${mainScreen})` + lastOperationSign + lastNumber
         secondary = [mainScreen, lastOperationSign, lastNumber, '=']
      }
   } else if ((sign === '*' || sign === '/') && secondaryScreen[secondaryScreen.length - 2] !== ')') {
      secondary = ['(', ...secondaryScreen, main, ')', sign]
   } else {
      secondary = [...secondaryScreen, main, sign]
   }

   score = eval(score)
   score = score.toString()

   setSecondaryScreen(secondary)
   setMainScreen(score)
   setResetMain(true)
}

export const handlePercent = (context) => {
   const { mainScreen, setMainScreen, secondaryScreen, setSecondaryScreen, setResetMain } = context
   if (mainScreen && secondaryScreen.length >= 2) {
      if (secondaryScreen[secondaryScreen.length - 1] === '=') return

      let lastScore = (secondaryScreen.slice(0, -1))
      lastScore = lastScore.join('')
      lastScore = eval(lastScore)

      let percent = Number(mainScreen) * 0.01 * lastScore
      percent = percent.toString()

      let score = secondaryScreen.join('') + percent
      score = eval(score)
      score = score.toString()

      setSecondaryScreen([...secondaryScreen, percent, '='])
      setMainScreen(score)
      setResetMain(true)
   }
}

export const handleFraction = (context) => {
   const { mainScreen, setMainScreen, secondaryScreen, setSecondaryScreen, setResetMain } = context
   if (!mainScreen || mainScreen === '0' || mainScreen[mainScreen.length - 1] === '.') return

   let score = `1/${mainScreen}`
   let secondary

   if (secondaryScreen[secondaryScreen.length - 1] !== '=') {
      score = secondaryScreen.join('') + score
      secondary = [...secondaryScreen, `(1/${mainScreen})`, '=']
   } else {
      secondary = [`(1/${mainScreen})`, '=']
   }

   score = eval(score)
   score = score.toString()

   setMainScreen(score)
   setSecondaryScreen(secondary)
   setResetMain(true)
}

export const handleSquare = (context) => {
   const { mainScreen, setMainScreen, secondaryScreen, setSecondaryScreen, setResetMain } = context
   if (!mainScreen || mainScreen === '0' || mainScreen[mainScreen.length - 1] === '.') return


   let score = `Math.pow(${mainScreen}, 2)`
   let secondary

   if (secondaryScreen[secondaryScreen.length - 1] !== '=') {
      score = secondaryScreen.join('') + score
      secondary = [...secondaryScreen, `Math.pow(${mainScreen}, 2)`, '=']
   } else {
      secondary = [`Math.pow(${mainScreen}, 2)`, '=']
   }

   score = eval(score)
   score = score.toString()

   setMainScreen(score)
   setSecondaryScreen(secondary)
   setResetMain(true)

}

export const handleSquareRoot = (context) => {
   const { mainScreen, setMainScreen, secondaryScreen, setSecondaryScreen, setResetMain } = context
   if (!mainScreen || mainScreen === '0' || mainScreen[mainScreen.length - 1] === '.') return

   let score = `Math.sqrt(${mainScreen})`
   let secondary

   if (secondaryScreen[secondaryScreen.length - 1] !== '=') {
      score = secondaryScreen.join('') + score
      secondary = [...secondaryScreen, `Math.sqrt(${mainScreen})`, '=']
   } else {
      secondary = [`Math.sqrt(${mainScreen})`, '=']
   }

   score = eval(score)
   score = score.toString()

   setMainScreen(score)
   setSecondaryScreen(secondary)
   setResetMain(true)

}

export const handleDeletion = (context) => {
   const { mainScreen, setMainScreen, setSecondaryScreen, resetMain } = context
   if (resetMain) return setSecondaryScreen([])
   if (!mainScreen) return
   if (mainScreen === '0.') return setMainScreen('')
   setMainScreen(mainScreen.slice(0, -1))
}

export const handleClearEntry = (context) => {
   const { mainScreen, setMainScreen, secondaryScreen, setSecondaryScreen } = context
   if (!mainScreen) return
   if (secondaryScreen.length === 0) return setMainScreen('')
   if (secondaryScreen[secondaryScreen.length - 1] === '=') {
      setSecondaryScreen([])
      setMainScreen('')
   } else {
      setMainScreen('')
   }
}

export const handleClearAll = (context) => {
   const { mainScreen, setMainScreen, secondaryScreen, setSecondaryScreen } = context
   if (!mainScreen && secondaryScreen.length === 0) return
   setMainScreen('')
   setSecondaryScreen([])
}
