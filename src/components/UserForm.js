"use client";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { formSchema } from "@/validations/formSchema";
import { interests } from "@/data/data";

export default function UserForm() {
  const [userInterests, setUserInterests] = useState([]);

  const inputClass =
    "border border-white-400 rounded-md h-10 p-2 w-full bg-transparent outline-none text-white caret-white";

  const errorClass = "text-red-500 text-[10px] font-bold text-md";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    alert("Successfully Registered!");
    reset();
  };

  useEffect(() => {
    setValue("interests", userInterests);
  }, [userInterests]);

  return (
    <div className="w-[400px]">
      <h1 className="text-center font-bold text-4xl">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5">
          <input
            type="text"
            placeholder="Name"
            className={inputClass}
            {...register("name")}
          />
          <span className={errorClass}>{errors.name?.message}</span>
        </div>
        <div className="mt-5">
          <input
            type="date"
            placeholder="Date of birth"
            className={`${inputClass} "`}
            {...register("dob")}
          />
        </div>
        <span className={errorClass}>{errors.dob?.message}</span>
        <div className="mt-5">
          <input
            type="email"
            placeholder="Email"
            className={inputClass}
            {...register("email")}
          />
          <span className={errorClass}>{errors.email?.message}</span>
        </div>
        <div className="mt-5">
          <input
            type="text"
            placeholder="Phone Number"
            className={inputClass}
            {...register("number")}
          />
          <span className={errorClass}>{errors.number?.message}</span>
        </div>
        <div className="mt-5">
          <input
            type="password"
            placeholder="Password"
            className={inputClass}
            {...register("password")}
          />
          <span className={errorClass}>{errors.password?.message}</span>
        </div>
        <div className="mt-5">
          <input
            type="password"
            placeholder="Confirm password"
            className={inputClass}
            {...register("confirm_password")}
          />
          <span className={errorClass}>{errors.confirm_password?.message}</span>
        </div>
        <div className="mt-5">
          <select {...register("gender")} className={inputClass}>
            <option value="male" className="text-black">
              Male
            </option>
            <option value="female" className="text-black">
              Female
            </option>
            <option value="other" className="text-black">
              Others
            </option>
          </select>
          <span className={errorClass}>{errors.gender?.message}</span>
        </div>
        <div className="mt-5">
          <label>Select your Area of Interest</label>
          <div className="grid grid-cols-3 mt-2">
            {interests.map((item) => (
              <div className="flex items-center gap-2" key={item.key}>
                <input
                  type="checkbox"
                  value={item.key}
                  className="ml-2"
                  id={item.key}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setUserInterests([...userInterests, event.target.value]);
                    } else {
                      const filteredInterests = userInterests.filter(
                        (item) => item != event.target.value
                      );
                      setUserInterests(filteredInterests);
                    }
                  }}
                />
                <label htmlFor={item.key}>{item.value}</label>
              </div>
            ))}
          </div>
          <span className={errorClass}>{errors.interests?.message}</span>
        </div>

        <div className="mt-5">
          <button className="bg-white w-full p-2 h-10 rounded-lg text-black">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
