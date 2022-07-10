const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: Course[] = [
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
      <Header name={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
      
    </div>
  );
};

interface HeaderProps {
  name: string;
}

type Course =  {
  name: string,
  exerciseCount: number,

}

interface ContentProps {
  courseParts: Course[];
}

interface TotalProps {
  courseParts: Course[];
}

const Header = (props: HeaderProps) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props: ContentProps) => {
  return (
    <>
    <p>
        {props.courseParts[0].name} {props.courseParts[0].exerciseCount}
      </p>
      <p>
        {props.courseParts[1].name} {props.courseParts[1].exerciseCount}
      </p>
      <p>
        {props.courseParts[2].name} {props.courseParts[2].exerciseCount}
      </p>
      </>
  )

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