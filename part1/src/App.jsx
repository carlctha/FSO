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
      <Part content={props.content1} />
      <Part content={props.content2} />
      <Part content={props.content3} />
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
      {props.total}
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
      <Content
        content1={`${parts[0].name} ${parts[0].exercises}`}
        content2={`${parts[1].name} ${parts[1].exercises}`}
        content3={`${parts[2].name} ${parts[2].exercises}`}
      />
      <Total
        total={parts[0].exercises+parts[1].exercises+parts[2].exercises}
      />
    </div>
  )
}

export default App
