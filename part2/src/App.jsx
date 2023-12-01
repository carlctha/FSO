import { useState } from 'react'

const Person = ( {person} ) => {
  return (
    <li>{person.name}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      id: 1
    }
  ]) 
  const [newName, setNewName] = useState("")

  const displayNames = persons.map(person => (
    person.name
  ))

  const addName = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      id: persons.length + 1
    }

    setPersons(persons.concat(personObj))
    setNewName("")
  }

  const handleInput = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Person key={person.id} person={person}/>)}
      </ul>
    </div>
  )
}

export default App
