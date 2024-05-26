import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ModalWrapper from "../components/ModalWrapper";
import Textbox from "../components/Textbox";
import Loading from "../components/Loader";
import Button from "../components/Button";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner"

const Register = ({ userData  , open , setOpen}) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);

  const isUpdating = false;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const [addNewUser , {isLoading}] = useRegisterMutation()
  const handleOnSubmit = async (data) => {
    try {
      if(userData){

      }else{
        console.log({...data , password : data.email })
        const result = await addNewUser({...data , password : data.email , tasks:[] }).unwrap();
        toast.success("New user added succesfuly")
        navigate("/log-in")
      }
      setTimeout(() => {
        setOpen(false)
      },1500)
    } catch (error) {
      console.log(error)
      toast.error("something went wrong")
    }
  };

  return (
    <>
      <ModalWrapper open={true} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <h2 className='text-base font-bold leading-6 text-gray-900 mb-4'>
            {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
          </h2>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Full name'
              type='text'
              name='name'
              label='Full Name'
              className='w-full rounded'
              register={register("name", {
                required: "Full name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder='Title'
              type='text'
              name='title'
              label='Title'
              className='w-full rounded'
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder='Email Address'
              type='email'
              name='email'
              label='Email Address'
              className='w-full rounded'
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <Textbox
              placeholder='Role'
              type='text'
              name='role'
              label='Role'
              className='w-full rounded'
              register={register("role", {
                required: "User role is required!",
              })}
              error={errors.role ? errors.role.message : ""}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button
                type='submit'
                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                label='Submit'
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default Register;
