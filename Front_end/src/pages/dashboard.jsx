import React from "react";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import { summary } from "../assets/data";
import clsx from "clsx";
import { Chart } from "../components/Chart";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import UserInfo from "../components/UserInfo";
import { useGetAllTaskQuery} from "../redux/slices/api/taskApiSlice";
import Loading from "../components/Loader";

const TaskTable = ({ tasks }) => {
  const ICONS = {
    HIGH: <MdKeyboardDoubleArrowUp />,
    MEDIUM: <MdKeyboardArrowUp />,
    LOW: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-400 '>
      <tr className='text-white text-left'>
        <th className='py-2'>Titre Tache</th>
        <th className='py-2'>Priorité</th>
        <th className='py-2'>Membres</th>
        <th className='py-2 hidden md:block'>Crée le</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className='border-b border-gray-400 text-gray-200 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />

          <p className='text-base text-gray-200'>{task.title}</p>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex gap-1 items-center'>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className='capitalize'>{task?.priority == "HIGH" ? "Haute": task?.priority == "MEDIUM" ? "Mediume":"Bas"} Priorité</span>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS.length]
              )}
            >
              <UserInfo userId={m} />
            </div>
          ))}
        </div>
      </td>
      <td className='py-2 hidden md:block'>
        <span className='text-base text-gray-200'>
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );
  return (
    <>
      <div className='w-full md:full bg-gray-800 px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
        <table className='w-full'>
          <TableHeader />
          <tbody>
            {tasks?.map((task, id) => (
              <TableRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const UserTable = ({ users }) => {
  const TableHeader = () => (
    <thead className='border-b border-gray-600 '>
      <tr className='text-black  text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Status</th>
        <th className='py-2'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b border-gray-600  text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700'>
            <span className='text-center'>{getInitials(user?.name)}</span>
          </div>

          <div>
            <p> {user.name}</p>
            <span className='text-xs text-black'>{user?.role}</span>
          </div>
        </div>
      </td>

      <td>
        <p
          className={clsx(
            "w-fit px-3 py-1 rounded-full text-sm",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>
      <td className='py-2 text-sm'>{moment(user?.createdAt).fromNow()}</td>
    </tr>
  );

  return (
    <div className='w-full md:w-1/3 bg-gray-800 h-fit px-2 md:px-6 py-4 shadow-md rounded'>
      <table className='w-full mb-5'>
        <TableHeader />
        <tbody>
          {users?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
const Dashboard = () => {

  const {data,isLoading} = useGetAllTaskQuery({
    strQuery : "", isTrashed : "" , search : "" 
  })
  const todo = data?.filter(item => item.stage === "TODO");
  const prog = data?.filter(item => item.stage === "IN_PROGRESS");
  const term = data?.filter(item => item.stage === "COMPLETED");
   
  const totals = data?.length;
  if(isLoading){
    return(
      <div className="py-10">
        <Loading />
      </div>
    )
  }
  const stats = [
    {
      _id: "1",
      label: "TOTALE TACHE",
      total: totals || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "TACHE TERMINE",
      total: term.length,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TACHE EN COURS",
      total: prog.length|| 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TACHE A FAIRE",
      total: todo.length || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className='w-full h-32 bg-gray-800 p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-200'>{label}</p>
          <span className='text-2xl font-semibold text-gray-200'>{count}</span>
        </div>

        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };
  return (
    <div className='h-full py-4'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      {/* <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-600 font-semibold'>
          Chart by Priority
        </h4>
        <Chart />
      </div> */}

      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        {/* /left */}

        <TaskTable tasks={data} />

        {/* /right */}

        {/* <UserTable users={data.users} /> */}
      </div>
    </div>
  );
};

export default Dashboard;
