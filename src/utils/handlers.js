export const handleNumber = (context, sign) => {
   const { mainScreen, setMainScreen, secondaryScreen, setSecondaryScreen, resetMain, setResetMain } = context
   const secondaryLastItem = secondaryScreen[secondaryScreen.length - 1]

   if (sign === '0' && !mainScreen) return

   if (sign === '0' && resetMain && secondaryLastItem === '=') {
      setMainScreen('')
      setSecondaryScreen([])
      if (resetMain) setResetMain(false)
   } else if (resetMain) {
      setMainScreen(sign)
      if (secondaryLastItem === '=') setSecondaryScreen([])
      setResetMain(false)
   } else if (mainScreen === '0') {
      setMainScreen(sign)
   } else {
      setMainScreen(mainScreen + sign)
   }
}

export const handleDot = (context) => {
   const { mainScreen, setMainScreen, resetMain, setResetMain } = context
   const mainLastItem = mainScreen[mainScreen.length - 1]

   if (mainScreen.includes('.') && !resetMain) return
   if (mainLastItem === '-') return

   if (!mainScreen) {
      setMainScreen('0.')
      if (resetMain) setResetMain(false)
   } else if (mainScreen && resetMain) {
      setMainScreen('0.')
      setResetMain(false)
   } else if (mainScreen && !resetMain) {
      setMainScreen(mainScreen + '.')
   }
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
   const hasNoBracket = secondaryScreen[secondaryScreen.length - 2] !== ')'

   if (mainLastItem === '.') return
   if (!mainScreen && secondaryScreen.length === 0) return
   if (sign !== '=' && resetMain) {
      if ((sign === '*' || sign === '/') && hasNoBracket) {
         return setSecondaryScreen(['(', ...secondaryScreen.slice(0, -1), ')', sign])
      } else {
         return setSecondaryScreen([...secondaryScreen.slice(0, -1), sign])
      }
   }

   let main
   let score
   let secondary

   main = mainScreen
   if (main === '') main = '0'
   if (main[0] === '-') main = `(${main})`
   secondaryScreen.length < 2 ? score = secondaryScreen : score = secondaryScreen.slice(0, -1)
   score = score.join('')
   if (score) score = `(${score})`
   secondaryScreen.length < 2 ? score = score + main : score = score + secondaryLastItem + main

   if (sign === '=' && secondaryLastItem === '=') {
      const lastOperationSign = secondaryScreen[secondaryScreen.length - 3]
      const lastNumber = secondaryScreen[secondaryScreen.length - 2]

      if (secondaryScreen.length === 2) {
         score = mainScreen
         secondary = [mainScreen, '=']
      } else {
         score = `(${mainScreen})` + lastOperationSign + lastNumber
         secondary = [mainScreen, lastOperationSign, lastNumber, '=']
      }
   } else if ((sign === '*' || sign === '/') && hasNoBracket) {
      secondary = ['(', ...secondaryScreen, main, ')', sign]
   } else {
      secondary = [...secondaryScreen, main, sign]
   }

   score = eval(score)
   score = score.toString()

   setMainScreen(score)
   setSecondaryScreen(secondary)
   setResetMain(true)
}

export const handlePercent = (context) => {
   const { mainScreen, setMainScreen, secondaryScreen, setSecondaryScreen, setResetMain } = context
   const secondaryLastItem = secondaryScreen[secondaryScreen.length - 1]

   if (secondaryLastItem === '=' || !mainScreen || secondaryScreen.length < 2) return

   let prevScore = (secondaryScreen.slice(0, -1))
   prevScore = prevScore.join('')
   prevScore = eval(prevScore)

   let percent = Number(mainScreen) * 0.01 * prevScore
   percent = percent.toString()

   let score = secondaryScreen.slice(0, -1)
   score = score.join('')
   score = `(${score})` + secondaryLastItem + percent
   score = eval(score)
   score = score.toString()

   setMainScreen(score)
   setSecondaryScreen([...secondaryScreen, percent, '='])
   setResetMain(true)

}

export const handleFraction = (context) => {
   const { mainScreen, setMainScreen, secondaryScreen, setSecondaryScreen, setResetMain } = context
   const mainLastItem = mainScreen[mainScreen.length - 1]
   const secondaryLastItem = secondaryScreen[secondaryScreen.length - 1]

   if (!mainScreen || mainScreen === '0' || mainLastItem === '.') return

   let score
   let secondary

   if (secondaryLastItem !== '=') {
      score = secondaryScreen.join('') + `1/${mainScreen}`
      secondary = [...secondaryScreen, `(1/${mainScreen})`, '=']
   } else {
      score = `1/${mainScreen}`
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
   const mainLastItem = mainScreen[mainScreen.length - 1]
   const secondaryLastItem = secondaryScreen[secondaryScreen.length - 1]

   if (!mainScreen || mainScreen === '0' || mainLastItem === '.') return

   let score
   let secondary

   if (secondaryLastItem !== '=') {
      score = secondaryScreen.join('') + `Math.pow(${mainScreen}, 2)`
      secondary = [...secondaryScreen, `Math.pow(${mainScreen}, 2)`, '=']
   } else {
      score = `Math.pow(${mainScreen}, 2)`
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
   const mainLastItem = mainScreen[mainScreen.length - 1]
   const secondaryLastItem = secondaryScreen[secondaryScreen.length - 1]

   if (!mainScreen || mainScreen === '0' || mainLastItem === '.') return

   let score
   let secondary

   if (secondaryLastItem !== '=') {
      score = secondaryScreen.join('') + `Math.sqrt(${mainScreen})`
      secondary = [...secondaryScreen, `Math.sqrt(${mainScreen})`, '=']
   } else {
      score = `Math.sqrt(${mainScreen})`
      secondary = [`Math.sqrt(${mainScreen})`, '=']
   }

   score = eval(score)
   score = score.toString()

   setMainScreen(score)
   setSecondaryScreen(secondary)
   setResetMain(true)

}

export const handleDeletion = (context) => {
   const { mainScreen, setMainScreen, secondaryScreen, setSecondaryScreen, resetMain } = context
   const secondaryLastItem = secondaryScreen[secondaryScreen.length - 1]

   if (!mainScreen) return

   if (secondaryScreen.length > 0 && resetMain && secondaryLastItem === '=') {
      setSecondaryScreen([])
   } else if (mainScreen === '0.') {
      setMainScreen('')
   } else if (!resetMain) {
      setMainScreen(mainScreen.slice(0, -1))
   }
}

export const handleClearEntry = (context) => {
   const { mainScreen, setMainScreen, secondaryScreen, setSecondaryScreen } = context
   const secondaryLastItem = secondaryScreen[secondaryScreen.length - 1]

   if (!mainScreen) return

   if (secondaryLastItem === '=') {
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
