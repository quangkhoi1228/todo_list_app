import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
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

  const [tasks, setTasks] = useState(tasksInitState);

  //remove all tasks
  const removeAllTasks = () => setTasks(tasksInitState);

  //check all tasks
  const checkAllTasks = () =>
    setTasks(
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

  //add new task
  const defaultDate = new Date(
    new Date(new Date(new Date().setMinutes(0)).setHours(0)).setDate(new Date().getDate() + 1)
  );
  const defaultName = "";
  const defaultDescription = "";

  const [addTaskTime, setAddTaskTime] = React.useState<Date | null>(defaultDate);
  const [addTaskName, setAddTaskName] = useState(defaultName);
  const [addTaskDescription, setAddTaskDescription] = useState(defaultDescription);

  const addTaskHandle = () => {
    console.log(addTaskName, addTaskDescription, addTaskTime);
    const newTask: TaskInterface = {
      id: new Date().getTime().toString(),
      time: addTaskTime ? addTaskTime.toString() : "",
      name: addTaskName,
      description: addTaskDescription,
      status: false,
    };
    setTasks(tasks.concat([newTask]));
  };

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

  const TextInput = React.memo<{
    label: any;
    value: any;
    onChange: Function;
  }>((props) => {
    return (
      <TextField
        label={props.label}
        variant="outlined"
        color="info"
        value={addTaskName}
        onChange={(e) => props.onChange(e)}
      />
    );
  });

  const AddTaskModal: React.FC = () => {
    return (
      <>
        <header className="p-4 text-center border-b text-gray-400 font-medium">Add Task</header>
        <section className="p-4 add-task-form">
          <div className="field">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDateTimePicker
                label="Time"
                renderInput={(params) => <TextField {...params} />}
                value={addTaskTime}
                onChange={(newValue) => {
                  setAddTaskTime(newValue);
                }}
              />
            </LocalizationProvider>
          </div>
          <div className="field">
            <TextInput
              label="Name"
              value={addTaskName}
              onChange={(e: any) => {
                setAddTaskName(e.target.value);
              }}
            />
          </div>
          <div className="field">
            <TextField
              label="Description"
              multiline
              minRows="2"
              color="info"
              value={addTaskDescription}
              onChange={(e) => setAddTaskDescription(e.target.value)}
              variant="outlined"
            />
          </div>
          <div className="buttons">
            <button
              className="bg-yellow-300 py-2 px-5 rounded-md mr-3 text-white  cursor-pointer"
              onClick={() => addTaskHandle()}
            >
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
        </section>
      </>
    );
  };

  return (
    <>
      <div className="main-background  fixed w-screen h-screen z-0"></div>
      <main className="w-screen h-screen flex justify-center items-center">
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
