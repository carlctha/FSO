const Header = ({ course }) => {
  return (
    <h1>
      {course.name}
    </h1>
  )
}

const Content = ({ course }) => {
  const content = course.parts.map(part => (
    <Part content={`${part.name} ${part.exercises}`} />
  ))
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
  let total = course.parts.reduce(
    (sum, part) => sum += part.exercises, 0
  )
  return (
    <p>
      <strong>total of {total} exercises</strong>
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
  const courses = [
    {
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const courses_array = courses.map(part => (
    <Course course={part}/>
  ))

  return (
    courses_array
  )
}

export default App
