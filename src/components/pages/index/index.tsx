import React, { useEffect, useState } from "react";
import "../../../assets/css/style.css";
import TaskInterface from "../../interface/task";

const Index: React.FunctionComponent = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(function () {
      setDate(new Date());
    }, 60 * 1000);
  }, []);

  const tasksInitState: TaskInterface[] = [
    {
      id: "1",
      name: "Wake up",
      description: "Lorem isum Lorem isum Lorem isum Lorem isum",
      time: "6 am",
      status: true,
    },
    {
      id: "2",
      name: "Wake up1",
      description: "Lorem isum Lorem isum Lorem isum Lorem isum",
      time: "1 am",
      status: false,
    },
    {
      id: "3",
      name: "Wake up3",
      description: "Lorem isum Lorem isum Lorem isum Lorem isum",
      time: "9 am",
      status: true,
    },
  ].sort((pre, current) => (pre.time > current.time ? 1 : -1));

  const [tasks, setTasks] = useState(tasksInitState);

  const Header: React.FC = () => {
    const dayOfWeek: { [key: string]: any } = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      <header className="relative beach-background header column text-center  p-5 rounded-t-xl ">
        <div className="flex justify-between items-center">
          <button className="text-white">
            <span className="icon">
              <i className="fal fa-align-left"></i>
            </span>
          </button>
          <p className="timeline text-md text-white ">Timeline</p>
          <button className="text-white">
            <span className="icon">
              <i className="fal fa-eye"></i>
            </span>
          </button>
        </div>
        <div className="date-container leading-none">
          <div className="value">{date.getDate()}</div>
        </div>
        <div className="day-of-week text-2xl text-white font-medium">{dayOfWeek[date.getDay()]}</div>
        <div className="month-year-container text-white">
          <span className="month">{month[date.getMonth()]} </span>
          <span className="year">{date.getFullYear()}</span>
        </div>
        <button className="add-task-button bg-yellow-400 w-12 h-12 text-white rounded-full absolute  -bottom-6 right-10 shadow-md  hover:bg-yellow-500  transition  duration-500">
          <span className="icon ">
            <i className="fal fa-plus"></i>
          </span>
        </button>
      </header>
    );
  };

  const Task: React.FC<{
    data: TaskInterface;
  }> = ({ data }) => {
    return (
      <li className="task flex justify-between items-center py-4 pr-3 ml-4 first:pt-8 last:pb-8 border-l">
        <div className="text-xs text-blue-400 px-4 w-20">{data.time}</div>
        <div className="block pr-6">
          <div className="title text-blue-400 font-semibold">{data.name}</div>
          <div className="description text-blue-300 text-xs ">{data.description}</div>
        </div>
        <div className="">
          <button className="w-6 h-6 border border-blue-300 rounded-md text-white">
            <span className={data.status ? `icon text-blue-500` : `icon  `}>
              <i className="fal fa-check"></i>
            </span>
          </button>
        </div>
      </li>
    );
  };

  const TaskList: React.FC = () => {
    return (
      <ul className="task-list overflow-auto">
        {tasks.map((item: any, index: any) => {
          console.log(item);
          return <Task key={item.id} data={item} />;
        })}
      </ul>
    );
  };

  return (
    <>
      <div className="main-background  fixed w-screen h-screen z-0"></div>
      <main className="w-screen h-screen flex justify-center items-center">
        <div className="card overflow-hidden relative z-10  w-96 rounded-xl bg-white shadow-2xl my-20">
          <Header />
          <TaskList />
        </div>
      </main>
    </>
  );
};

export default Index;
function reducer(reducer: any, initialState: any, init: any): [any, any] {
  throw new Error("Function not implemented.");
}
