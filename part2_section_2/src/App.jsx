import { useState, useEffect } from "react";
import axios from "axios";

const Part = ({ languages }) => {
  return (
    <ul>
      {Object.keys(languages).map(key => (
    <li key={key}>{languages[key]}</li>
  ))}
    </ul>
  )
}

const Display = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <p><strong>languages:</strong></p>
      <Part languages={country.languages}/>
      <img className="flag" src={country.flags.svg} alt={country.flags.alt} />
    </div>
  )
}

const App = () => {
  const [data, setData] = useState([])
  const [display, setDisplay] = useState([])

  useEffect(() => {
    axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(response => {
      console.log(response.data[169])
      setData(response.data)
    })
  }, [])

  const handleSearch = (event) => {
    const currValue = event.target.value
    const countries = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].name.common.toLowerCase().includes(currValue)) {
        countries.push(data[i])
      }
    }

    if (countries.length >= 10) {
      setDisplay("To many matches, specify another filter")
    }
    else if (countries.length < 10 && countries.length > 1) {
      setDisplay(countries.map(country => (
        <div key={country.name.official}>
          {country.name.common}
        </div>
      )))
    }
    else {
      const info = <Display country={countries[0]}/>
      setDisplay(info)
    }
  }

  return (
    <div>
      find countries<input type="text" onChange={handleSearch}/>
      <div>{display}</div>
    </div>
  )
}

export default App
