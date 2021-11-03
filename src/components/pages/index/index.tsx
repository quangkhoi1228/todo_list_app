import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import dateFormat from "dateformat";
import React, { useEffect, useReducer, useState } from "react";
import "../../../assets/css/style.css";
import TaskInterface from "../../interface/task";

const Index: React.FunctionComponent = () => {
  //date time
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(function () {
      setDate(new Date());
    }, 5 * 60 * 1000);
  }, []);

  //tasks
  const tasksInitState: TaskInterface[] = [];

  const taskStorageKey = "taskStorageKey";
  const sortTask = (tasksInput: TaskInterface[]) => {
    return tasksInput.sort((pre, current) => (pre.time > current.time ? -1 : 1));
  };
  const getTaskStorage: any = () => {
    const saved: string | null = localStorage.getItem(taskStorageKey);
    return saved ? sortTask(JSON.parse(saved)) : tasksInitState;
  };
  const [tasks, setTasks] = useState(() => {
    return getTaskStorage();
  });
  const setTaskStorage = (value: TaskInterface[]) => {
    setTasks(sortTask(value));
    localStorage.setItem(taskStorageKey, JSON.stringify(sortTask(value)));
  };

  //remove all tasks
  const removeAllTasks = () => setTaskStorage(tasksInitState);

  //check all tasks
  const checkAllTasks = () =>
    setTaskStorage(
      tasks.map((taskItem: TaskInterface) => {
        taskItem["status"] = true;
        return taskItem;
      })
    );

  //add task

  function reducerIsAddingTask(state: any, action: any) {
    return action;
  }
  const [isAddingTask, dispatchIsAddingTask] = useReducer(reducerIsAddingTask, false);

  // GUI

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
          <button className="text-white" onClick={removeAllTasks}>
            <span className="icon">
              <i className="fal fa-trash"></i>
            </span>
          </button>
          <p className="timeline text-md text-white ">Timeline</p>
          <button className="text-white" onClick={checkAllTasks}>
            <span className="icon">
              <i className="fal fa-check-double"></i>
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
        <button
          className="add-task-button bg-yellow-400 w-12 h-12 text-white rounded-full absolute  -bottom-6 right-10 shadow-md  hover:bg-yellow-500  transition  duration-500"
          onClick={() => dispatchIsAddingTask(true)}
        >
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
    const changeStatusTask = (currentItem: TaskInterface) => {
      setTaskStorage(
        getTaskStorage().map((item: TaskInterface) =>
          item.id === currentItem.id
            ? {
                id: item.id,
                name: item.name,
                description: item.description,
                time: item.time,
                status: !item.status,
              }
            : item
        )
      );
    };
    return (
      <li className="task flex justify-between items-center py-4 pr-3 ml-4 first:pt-8 last:pb-8 border-l">
        <div className="text-xs text-blue-400 px-4 w-25">{dateFormat(new Date(data.time), "dd/mm/yyyy hh:MM")}</div>
        <div className="block pr-6">
          <div className="title text-blue-400 font-semibold">{data.name}</div>
          <div className="description text-blue-300 text-xs ">{data.description}</div>
        </div>
        <div className="">
          <button
            className="w-6 h-6 border border-blue-300 rounded-md text-white"
            onClick={(e) => changeStatusTask(data)}
          >
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
        {tasks.length > 0 ? (
          tasks.map((item: any, index: any) => {
            console.log(item);
            return <Task key={item.id} data={item} />;
          })
        ) : (
          <div className="text-center my-8 text-gray-400 flex justify-center">
            <span className="icon mr-2">
              <i className="fal fa-times-circle"></i>
            </span>
            <span className="">Task list is empty</span>
          </div>
        )}
      </ul>
    );
  };

  const AddTaskModal: React.FC = () => {
    //add new task
    // const defaultDate = new Date(
    //   new Date(new Date(new Date().setMinutes(0)).setHours(0)).setDate(new Date().getDate() + 1)
    // );
    const defaultName = "";
    const defaultDescription = "";

    const [addTaskTime, setAddTaskTime] = React.useState<Date | null>(null);
    const [addTaskName, setAddTaskName] = useState(defaultName);
    const [addTaskDescription, setAddTaskDescription] = useState(defaultDescription);

    const addTaskHandle = (e: React.FormEvent) => {
      e.preventDefault();
      if ([addTaskName, addTaskDescription, addTaskName].map((item) => item.trim()).includes("")) {
        alert("Please fill all input");
        return false;
      } else {
        const newTask: TaskInterface = {
          id: new Date().getTime(),
          time: addTaskTime?.getTime() || new Date().getTime(),
          name: addTaskName,
          description: addTaskDescription,
          status: false,
        };
        setTaskStorage(getTaskStorage().concat([newTask]));
        dispatchIsAddingTask(false);
        return true;
      }
    };

    return (
      <>
        <header className="p-4 text-center border-b text-blue-400 font-medium">Add Task</header>
        <form className="p-4 add-task-form" onSubmit={addTaskHandle}>
          <div className="field">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDateTimePicker
                label="Time"
                renderInput={(params) => <TextField {...params} required />}
                value={addTaskTime}
                onChange={(newValue) => {
                  setAddTaskTime(newValue);
                }}
              />
            </LocalizationProvider>
          </div>
          <div className="field">
            <TextField
              type="text"
              label="Name"
              color="info"
              variant="outlined"
              value={addTaskName}
              onChange={(e) => setAddTaskName(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <TextField
              type="text"
              label="Description"
              multiline
              minRows="2"
              color="info"
              variant="outlined"
              value={addTaskDescription}
              onChange={(e) => setAddTaskDescription(e.target.value)}
              required
            />
          </div>
          <div className="buttons">
            <button type="submit" className="bg-yellow-300 py-2 px-5 rounded-md mr-3 text-white  cursor-pointer">
              <span className="icon mr-2">
                <i className="fal fa-plus"></i>
              </span>
              <span>Add</span>
            </button>
            <button
              className="bg-gray-300 py-2 px-5 rounded-md mr-3 text-white  cursor-pointer"
              onClick={() => dispatchIsAddingTask(false)}
            >
              <span className="icon mr-2">
                <i className="fal fa-chevron-left"></i>
              </span>
              <span>Back</span>
            </button>
          </div>
        </form>
      </>
    );
  };

  return (
    <>
      <div className="main-background  fixed w-screen h-screen z-0 overflow-hidden"></div>
      <main className="w-screen h-screen flex justify-center items-center overflow-hidden">
        <div className="card overflow-hidden relative z-10  w-96 rounded-xl bg-white shadow-2xl my-20">
          <section className={isAddingTask ? "hidden" : ""}>
            <Header />
            <TaskList />
          </section>
          <section className={isAddingTask ? "" : "hidden"}>
            <AddTaskModal />
          </section>
        </div>
      </main>
    </>
  );
};

export default Index;
