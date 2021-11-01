import React from "react";
import "../../../assets/css/style.css";

const Header: React.FC = () => {
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
        <div className="value">18</div>
      </div>
      <div className="day-of-week text-2xl text-white font-medium">Monday</div>
      <div className="month-year-container text-white">
        <span className="month">July </span>
        <span className="year">2021</span>
      </div>
      <button className="add-task-button bg-yellow-400 w-12 h-12 text-white rounded-full absolute  -bottom-6 right-10 shadow-md  hover:bg-yellow-500  transition transition-all duration-500">
        <span className="icon">
          <i className="fal fa-plus"></i>
        </span>
      </button>
    </header>
  );
};

const Task: React.FC = () => {
  return (
    <li className="task flex justify-between items-center py-4 pr-3 ml-4 first:pt-8 last:pb-8 border-l">
      <div className="text-xs text-blue-400 px-4 w-20">6 am</div>
      <div className="block pr-6">
        <div className="title text-blue-400 font-semibold">Wake up</div>
        <div className="description text-blue-300 text-xs ">Lorem isum Lorem isum Lorem isum Lorem isum </div>
      </div>
      <div className="">
        <button className="w-6 h-6 border border-blue-300 rounded-md text-white">
          <span className="icon">
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
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
    </ul>
  );
};

const Index: React.FunctionComponent = () => {
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
