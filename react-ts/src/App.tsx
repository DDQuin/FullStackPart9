const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
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
  ]

  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
      
    </div>
  );
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBaseDesc extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseDesc {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseDesc {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseDesc {
  type: "special";
  requirements: Array<string>
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

interface HeaderProps {
  name: string;
}

interface PartProps {
  coursePart: CoursePart;
}



interface ContentProps {
  courseParts: CoursePart[];
}

interface TotalProps {
  courseParts: CoursePart[];
}

const Header = (props: HeaderProps) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map(part =>  {
        return (
          <>
      <Part key={part.type} coursePart={part}/>
      <br></br>
      </>
        )
})}
    </div>
  )

}

const Part = (props: PartProps) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch(props.coursePart.type) {
    case "groupProject":
      return (
        <div>
          <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br></br>
          project exercises {props.coursePart.groupProjectCount}
        </div>
      )
    case "normal":
      return (
        <div>
          <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br></br>
          <em>{props.coursePart.description}</em>
        </div>
      )
    case "submission":
      return (
        <div>
          <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br></br>
          <em>{props.coursePart.description}</em><br></br>
          submit to {props.coursePart.exerciseSubmissionLink}
        </div>
      )

      case "special":
      return (
        <div>
          <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br></br>
          <em>{props.coursePart.description}</em><br></br>
          required skills: {props.coursePart.requirements.toString()}
        </div>
      )
    default:
      return assertNever(props.coursePart)

  }
}

const Total = (props: TotalProps) => {
  return (
    <>
    <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </>
  )

}

export default App;