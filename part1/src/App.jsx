const Header = (props) => {
  return (
    <h1>
      {props.title}
    </h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part content={`${props.parts[0].name} ${props.parts[0].exercises}`} />
      <Part content={`${props.parts[1].name} ${props.parts[1].exercises}`} />
      <Part content={`${props.parts[2].name} ${props.parts[2].exercises}`} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.content}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>
      {
      props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
      }
    </p>
  )
}

const App = () => {
  const course = "Half Stack application development"
  const parts = [{
    name: "Fundamentals of React",
    exercises: 10
  },
  {
    name: "Using props to pass data",
    exercises: 7
  },
  {
    name: "State of a component",
    exercises: 14
  }  
  ]
  return (
    <div>
      <Header title={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
