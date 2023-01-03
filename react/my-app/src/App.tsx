interface CoursePartBase {
  [index: string]: number | string | string[];
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescPart extends CoursePartBase {
  type: string;
  description: string;
}

interface CourseNormalPart extends CourseDescPart {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescPart {
  type: "special";
  requirements: string[];
}


type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

interface courseParts {
  courseParts: CoursePart[]
}

interface Course {
  course: CoursePart
}

const Header = ({courseName}:{courseName:string}) => {

  return(
    <h1>{courseName}</h1>
  )
};

const Part = (props: Course) => {

  return(
    <div style={{display: "inline"}}>
      {Object.keys(props.course).map(key => {

        if (key !== 'type') {
          if (key == 'name' || key == 'exerciseCount' ) {
            return (
              <span key={key} >
                <span style={{fontWeight: "bold"}}>{props.course[key]} </span>
              </span>

            )
          } else if (key == 'requirements') {
            return (
              <div key={key}>
                <div>required skills: {(props.course[key] as string[]).map(prueba => {
                  return(
                    <span key={prueba}>{prueba}, </span>
                  )
                })} </div>
              </div>

            )

          } else {
              return (
                <div key={key} >
                  <p>{props.course[key]} </p>
                </div>

              )
          }

        }
      })}
    </div>

  )
};

const Content = (props: courseParts) => {

  return(
    <div>
      {props.courseParts.map(course => {

        switch (course.type) {
          case "groupProject":
            return(
              <div key={course.name}>
                <Part course={course} />
                <hr />

              </div>
            )
            break;

          case "normal":
            return(
              <div key={course.name}>
                <Part course={course} />
                <hr />
              </div>
            )
            break;

            case "submission":
              return(
                <div key={course.name}>
                  <Part course={course} />
                  <hr />
                </div>
              )
              break;

              case "special":
                return(
                  <div key={course.name}>
                    <Part course={course} />
                    <hr />
                  </div>
                )
                break;

            default:
              break;
        }})}
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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
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