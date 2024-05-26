import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { toast } from "sonner";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../../utils";
import clsx from "clsx";
import { FaList } from "react-icons/fa";
import UserInfo from "../UserInfo";
import Button from "../Button";
import ConfirmatioDialog from "../Dialogs";
import { useTrashTaskMutation } from "../../redux/slices/api/taskApiSlice";
import AddTask from "./AddTask";
import { useDispatch, useSelector } from "react-redux";

const ICONS = {
  HIGH: <MdKeyboardDoubleArrowUp />,
  MEDIUM: <MdKeyboardArrowUp />,
  LOW: <MdKeyboardArrowDown />,
};

const Table = ({ tasks }) => {
  const { user } = useSelector((state) => state.auth);

  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openEdit , setOpenEdit] = useState(false)
  const [trashTask] = useTrashTaskMutation()

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };
  const editTaskHandler = (el) => {
    setSelected(el);
    setOpenEdit(true);
  }
  const deleteHandler = async () => {
    try {
      const result = await trashTask({
        id : selected,
      }).unwrap()

      toast.success(result?.message);

      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload()
      },500)

    } catch (error) {
      console.log(error)
      toast.error(err?.data?.message || err.error)
    }
  };
  

  const TableHeader = () => (
    <thead className='w-full border-b border-gray-300'>
      <tr className='w-full text-white text-left'>
        <th className='py-2'>Titre De Tache</th>
        <th className='py-2'>Priorité</th>
        <th className='py-2 line-clamp-1'>Crée le</th>
        <th className='py-2 '>Commentaire</th>
        <th className='py-2'>Membres</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className='border-b border-gray-200 text-gray-200 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className='w-full line-clamp-2 text-base text-white'>
            {task?.title}
          </p>
        </div>
      </td>

      <td className='py-2'>
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className='capitalize line-clamp-1'>
          {task?.priority == "HIGH" ? "Haute": task?.priority == "MEDIUM" ? "Mediume":"Bas"} Priorité
          </span>
        </div>
      </td>

      <td className='py-2'>
        <span className='text-sm text-gray-200'>
          {formatDate(new Date(task?.date))}
        </span>
      </td>

      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='flex gap-1 items-center text-sm text-gray-200'>
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          {/* <div className='flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400'>
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
          <div className='flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400'>
            <FaList />
            <span>0/{task?.subTasks?.length}</span>
          </div> */}
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task?.team?.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS?.length]
              )}
            >
              <UserInfo userId={m} />
            </div>
          ))}
        </div>
      </td>

      <td className='py-2 flex gap-2 md:gap-4 justify-end'>
        {
          user?.role=="chef" || !user?.isAdmin? 
          <Button
            className='text-blue-400 hover:text-blue-600 sm:px-0 text-sm md:text-base'
            label='Modifier'
            type='button'
            onClick={() => editTaskHandler(task)}
          /> : <></>
        }
        {
          user?.role=="chef" ? 
        <Button
          className='text-red-400 hover:text-red-500 sm:px-0 text-sm md:text-base'
          label='Supprimer'
          type='button'
          onClick={() => deleteClicks(task._id)}
        /> : <></>
        }
      </td>
    </tr>
  );
  return (
    <>
      <div className='bg-gray-800  px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
        <div className='overflow-x-auto'>
          <table className='w-full '>
            <TableHeader />
            <tbody>
              {tasks.map((task, index) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TODO */}
      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={selected}
        key={new Date().getTime()}
      />
    </>
  );
};

export default Table;
