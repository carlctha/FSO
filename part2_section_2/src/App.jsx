import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ latLong }) => {
  if (latLong === null) {
    return <div></div>
  }

  const [data, setData] = useState(null)
  const [pngId, setPngId] = useState(null)
  const latitude = latLong[0]
  const longitude = latLong[1]
  const apiKey = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    axios
      .get(
        `
        https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}
        `
      )
      .then(response => {
        console.log(response.data)
        setData(response.data)
        setPngId(response.data.weather[0].icon)
      }).catch(error => {
        console.error("Error retrieving data from weather api", error)
      })
  }, [latitude, longitude])

  return (
    <div>
      {data && (
      <div>
        <h2>Weather in {data.name}</h2>
        <div>Temperature {data.main.temp -273.15} Celsius</div>
        <img src={`https://openweathermap.org/img/wn/${pngId}@2x.png`} alt="YEEEET" />
        <div>Wind {data.wind.speed} m/s</div>
      </div>
      )}
    </div>
  )
}

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

const CountryList = ({ countries, handleClick }) => {
  return (
    <div>
    {countries.map(country => (
      <div key={country.name.official}>
        {country.name.common}
      <button onClick={() => handleClick(country)}>show</button>
      </div>
    ))}
    </div>
  )
}

const App = () => {
  const [data, setData] = useState(null)
  const [display, setDisplay] = useState([])
  const [latLong, setLatLong] = useState(null)

  useEffect(() => {
    axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(response => {
      setData(response.data)
    })
  }, [])

  const handleClick = (country) => {
    const info = <Display country={country}/>
    setDisplay(info)
  }

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
      setLatLong(null)
    }
    else if (countries.length < 10 && countries.length > 1) {
      const countryList = <CountryList
        countries={countries} handleClick={handleClick} 
      />
      setDisplay(countryList)
      setLatLong(null)
    }
    else {
      const info = <Display country={countries[0]}/>
      setLatLong(countries[0].latlng)
      setDisplay(info)
    }
  }

  return (
    <div>
      find countries<input type="text" onChange={handleSearch}/>
      <div>{display}</div>
      <Weather latLong={latLong}/>
    </div>
  )
}

export default App
