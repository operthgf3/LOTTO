;(() => {
  'use strict'

  const get = (target) => document.querySelector(target)

  const init = () => {
    get('form').addEventListener('submit', (event) => {
      playGame(event)
    })
    setPassword()
  }

  const baseball = {
    limit: 10,
    digit: 4,
    trial: 0,
    end: false,
    $question: get('.ball_question'),
    $answer: get('.ball_answer'),
    $input: get('.ball_input'),
  }

  const { limit, digit, $question, $answer, $input } = baseball
  let { trial, end } = baseball

  const setPassword = () => {
    const gameLimit = Array(limit).fill(false)
    let password = ''
    while (password.length < digit) {
      const random = parseInt(Math.random() * 5) + 1;

      if (gameLimit[random]) {
        continue
      }
      password += random
      gameLimit[random] = true
    }

    baseball.password = password
  }

  const onPlayed = (number, hint) => {
    return `<em>${trial}차 시도</em>: ${number} , ${hint}`
  }

  const isCorrect = (number, answer) => {
    return number === answer
  }

  const isDuplicate = (number) => {
    return [...new Set(number.split(''))].length !== digit
  }

  const getStrikes = (number, answer) => {
    let strike = 0
    const nums = number.split('')

    nums.map((digit, index) => {
      if (digit === answer[index]) {
        strike++
      }
    })

    return strike
  }

  const getBalls = (number, answer) => {
    let ball = 0
    const nums = number.split('')
    const gameLimit = Array(limit).fill(false)

    answer.split('').map((num) => {
      gameLimit[num] = true
    })

    nums.map((num, index) => {
      if (answer[index] !== num && !!gameLimit[num]) {
        ball++
      }
    })

    return ball
  }

  const getResult = (number, answer) => {
    if (isCorrect(number, answer)) {
      end = true
      $answer.innerHTML = baseball.password
      return '와 이걸????????'
    }

    const strikes = getStrikes(number, answer)
    const balls = getBalls(number, answer)

    return '맞춘 자릿수: ' + strikes + ', 적중한 숫자: ' + balls
  }

  const playGame = (event) => {
    event.preventDefault()

    if (!!end) {
      returnV
    }

    const inputNumber = $input.value
    const { password } = baseball

    if (inputNumber.length !== digit) {
      alert(`${digit}자리 숫자를 입력해주세요.`)
    } else if (isDuplicate(inputNumber)) {
      alert('좆 중복입니다.')
    } else {
      trial++
      const result = onPlayed(inputNumber, getResult(inputNumber, password))
      $question.innerHTML += `<span>${result}</span>`

      if (limit <= trial && !isCorrect(inputNumber, password)) {
        alert('준이는 메리다도 당첨 되는데 님들은 뭐함???')
        end = true
        $answer.innerHTML = password
      }
    }

    $input.value = ''
    $input.focus()
  }

  init()
})()
