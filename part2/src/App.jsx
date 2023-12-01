import { useState } from 'react'

const Person = ( {person} ) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    }
  ]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const addInput = (event) => {
    event.preventDefault()

    const nameInPersons = persons.find(
      person => person.name === newName
    )

    if (nameInPersons) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      setPersons(persons.concat(personObj))
      setNewName("")
    }

  }

  const handleInputName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleInputNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addInput}>
        <div>
          name: <input value={newName} onChange={handleInputName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleInputNumber}/>
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
