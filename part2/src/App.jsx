import { useState } from 'react'

const Person = ( {person} ) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [filterPersons, setFilterPersons] = useState([...persons])

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
    setNewName(event.target.value)
  }

  const handleInputNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
    let currFilter = event.target.value
    const new_persons = []
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.toLowerCase().includes(currFilter.toLowerCase())) {
        new_persons.push(persons[i])
      }
    }
    setFilterPersons(new_persons)
  }

  console.log(filterPersons)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addInput}>
        <div>
          filter shown with <input value={filter} onChange={handleFilter}/>
        </div>
        <h2>Add a new</h2>
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
        {filterPersons.map(person => <Person key={person.id} person={person}/>)}
      </ul>
    </div>
  )
}

export default App
