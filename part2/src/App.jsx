import { useState, useEffect } from "react"
import service from "./services/persons"

const Person = ( {person, onClick} ) => {
  return (
    <li>
      {person.name} {person.number} <button onClick={() => onClick(person)}>delete</button>
    </li>
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

const Persons = ( {filterPersons, persons, filter, onClick} ) => {
  return (
    <div>
      {filter !== "" ? (
        <ul>
          {filterPersons.map(person => <Person key={person.id} person={person}/>)}
        </ul>
      ) : (
        <ul>
          {persons.map(person => <Person key={person.id} person={person} onClick={onClick}/>)}
        </ul>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [filterPersons, setFilterPersons] = useState([...persons])

  const hook = () => {
    service
      .getAll()
      .then(dbPersons => {
        setPersons(dbPersons)
      }).catch(error => {
        console.error("Error retrieving persons", error)
      })
  }

  const addInput = (event) => {
    event.preventDefault()

    const nameInPersons = persons.find(
      person => person.name === newName
    )

    if (nameInPersons) {
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )) {
        const updatedPersons = [...persons]
        for (let i = 0; i < updatedPersons.length; i++) {
          if (updatedPersons[i].name !== newName) {
            continue
          }
          else {
            console.log(newNumber)
            updatedPersons[i].number = newNumber
            service.update(updatedPersons[i].id, updatedPersons[i])
          }
        }
        console.log(updatedPersons)
        setPersons(updatedPersons)
      }
    }
    else {
      const personObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      service.create(personObj).catch(error => {
        console.error("Error creating person", error)
      })

      setPersons(persons.concat(personObj))
    }
    setNewName("")
    setNewNumber("")
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

  const onClickDeleteButton = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      service.remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        }).catch(error => {
          console.error("Error deleting person", error)
        })
    }
  }

  useEffect(hook, [])

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
      <Persons filter={filter} filterPersons={filterPersons} persons={persons} onClick={onClickDeleteButton}/>
    </div>
  )
}

export default App
