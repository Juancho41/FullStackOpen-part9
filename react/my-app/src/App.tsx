
const Header = ({courseName}:{courseName:string}) => {

  return(
    <h1>{courseName}</h1>
  )
};

interface courseObj {
  name: string;
  exerciseCount: number;
}

interface courseParts {
  courseParts: courseObj[]
}

const Content = (props: courseParts) => {

  return(
    <div>
      {props.courseParts.map(course => {

        return(
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
        )})}
    </div>
  )
};


const Total = (props: courseParts) => {

  return(
      <p>
        Number of exercises {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
  )
};



const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
};

export default App;