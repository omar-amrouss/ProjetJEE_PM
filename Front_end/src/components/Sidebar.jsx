import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { AiOutlineSchedule } from 'react-icons/ai';
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";

const linkData = [
  {
    label: "Tableau De Bord",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Taches",
    link: "tasks",
    icon: <FaTasks />,
  },

  {
    label: "Membres",
    link: "team",
    icon: <FaUsers />,
  },
 
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 2);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-200 text-base hover:bg-gray-700",
          path === el.link.split("/")[0] ? "bg-blue-900 text-neutral-100" : ""
        )}
      >
        {el.icon}
        <span className='hover:text-gray-300'>{el.label}</span>
      </Link>
    );
  };
  return (
    <div className='w-full  h-full flex flex-col gap-6 p-5 bg-gray-800'>
      <h1 className='flex gap-1 items-center'>
        <p className='bg-blue-900 p-2 rounded-full'>
          <AiOutlineSchedule  className='text-white text-2xl font-black' />
        </p>
        <span className='text-2xl font-bold text-white'>Logo</span>
      </h1>

      <div className='flex-1 flex flex-col gap-y-5 py-8'>
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      <div className=''>
        <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800'>
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
