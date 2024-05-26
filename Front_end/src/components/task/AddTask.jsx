import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import { useCreateTaskMutation, useUpdateTaskMutation } from "../../redux/slices/api/taskApiSlice";
import {toast} from "sonner";
import { dateFormatter } from "../../utils";
import AddSubTask from "./AddSubTask";

const LISTS = ["TODO", "IN_PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "LOW"];

// const uploadedFileURLs = [];

const AddTask = ({ open, setOpen , task}) => {
  const defaultValues = {
    title : task?.title || "",
    date : dateFormatter(task?.date || new Date()),
    team : [],
    stage : "",
    priority : "",
    assets : [],
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues});
  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [createTask , {isLoding}] = useCreateTaskMutation();
  const [updateTask , {isLoding: isUpdating}] = useUpdateTaskMutation()

  const submitHandler = async (data) => {
    try {
      const newData = {
        ...data,
        team,
        stage,
        priority
      }
      const res = task?._id
        ? await updateTask({ ...newData, _id : task._id}).unwrap()
        : await createTask(newData).unwrap()

      toast.success(res.message)
      console.log(res)
      setTimeout(() => {
        setOpen(false)
      },500);

    } catch (error) {
      console.log(error)
    }
  };

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen} >
        <form onSubmit={handleSubmit(submitHandler)} className="text-gray-200">
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-200 mb-4'
          >
            {task ? "MODIFIER TACHE" : "Créer UNE TACHE"}
          </Dialog.Title>

          <div className='mt-2 flex flex-col gap-6 '>
            <Textbox
              placeholder='Titre De Tache'
              type='text'
              name='title'
              label='Titre De Tache'
              className='w-full rounded text-gray-200'
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team} />

            <div className='flex gap-4'>
              <SelectList
                label='Etas Tache'
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <div className='w-full'>
                <Textbox
                  placeholder='Date'
                  type='date'
                  name='date'
                  label='Date Tache'
                  className='w-full rounded text-white'
                  register={register("date", {
                    required: "Date is required!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className='flex gap-4'>
              <SelectList
                label='Priorité'
                lists={PRIORIRY}
                selected={priority}
                setSelected={setPriority}
              />
            </div>

            <div className='py-6 sm:flex sm:flex-row-reverse gap-4'>
              {uploading ? (
                <span className='text-sm py-2 text-red-500'>
                  Uploading assets
                </span>
              ) : (
                <Button
                  label='Envoyer'
                  type='submit'
                  className='bg-blue-900 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                />
              )}

              <Button
                type='button'
                className='bg-gray-200 px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Retour'
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;
