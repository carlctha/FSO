const Header = ({ course }) => {
  return (
    <h1>
      {course.name}
    </h1>
  )
}

const Content = ({ course }) => {
  const content = []

  for (let i = 0; i < course.parts.length; i++) {
    content.push(
      <Part content={
        `${course.parts[i].name} ${course.parts[i].exercises}`
      }/>
    )
  }
  return (
    content
  )
}

const Part = (props) => {
  return (
    <p>
      {props.content}
    </p>
  )
}

const Total = ( {course} ) => {
  return (
    <p>
      {
      course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
      }
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
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
      },
      {
        name: "Redux",
        exercises: 11
      }
    ]
  }

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App
