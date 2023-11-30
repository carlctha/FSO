import { useState } from 'react'

const Header = ({ heading }) => {
  return (
    <h1>{heading}</h1>
  )
}

const StatisticLine = ( {text, value} ) => {
  return (
    <div>{text} {value}</div>
  )
}

const Button = ( {handleClick, text} ) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({ all, average, positive }) => {
  return (
    <div>
      <div>all {all}</div>
      <div>average {average}</div>
      <div>positive {positive}</div>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good+neutral+bad
  const average = (good-bad)/all
  const positive = good/all

  const changeValue = (value, setValue, newValue) => {
    setValue(value + newValue)
  }

  return (
    <div>
      <Header heading="give feedback"/>
      <Button handleClick={() => changeValue(good, setGood, 1)} text="good"/>
      <Button handleClick={() => changeValue(neutral, setNeutral, 1)} text="neutral"/>
      <Button handleClick={() => changeValue(bad, setBad, 1)} text="bad"/>
      <Header heading="statistics" />

      {good > 0 || neutral > 0 || bad > 0 ? (
        <div>
          <StatisticLine value={good} text="good" />
          <StatisticLine value={neutral} text="neutral" />
          <StatisticLine value={bad} text="bad" />
          <Statistics all={all} average={average} positive={positive} />
        </div>
      ) : (
        <div>No feedback given</div>
      )}
    </div>
  )
}

export default App
