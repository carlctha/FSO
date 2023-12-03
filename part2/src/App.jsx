import { useState } from 'react'

const Person = ( {person} ) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const Filter = ( {filter, handleFilter} ) => {
  return (
    <div>
        filter shown with <input value={filter} onChange={handleFilter}/>
    </div>
  )
  
}

const Form = (props) => {
  return (
    <form onSubmit={props.addInput}>
      <div>
        name: <input value={props.newName} onChange={props.handleInputName}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleInputNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ( {filterPersons, persons, filter} ) => {
  return (
    <div>
      {filter !== "" ? (
        <ul>
          {filterPersons.map(person => <Person key={person.id} person={person}/>)}
        </ul>
      ) : (
        <ul>
          {persons.map(person => <Person key={person.id} person={person}/>)}
        </ul>
      )}
    </div>
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
      setNewNumber("")
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
    const new_persons = persons.filter(person => (
      person.name.toLowerCase().includes(currFilter.toLowerCase())
    ))
    setFilterPersons(new_persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>Add a new</h2>
      <Form
        addInput={addInput}
        newName={newName}
        handleInputName={handleInputName}
        newNumber={newNumber}
        handleInputNumber={handleInputNumber}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} filterPersons={filterPersons} persons={persons}/>
    </div>
  )
}

export default App
