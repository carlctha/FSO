import Course from "./components/course"

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
