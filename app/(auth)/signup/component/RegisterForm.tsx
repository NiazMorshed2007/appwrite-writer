"use client";

import { RegisterInterface, register } from "@/lib/services/auth.service";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

const RegisterForm = (): JSX.Element => {
  const [data, setData] = useState<RegisterInterface>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.password !== confirmedPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const user = await register(data);
      localStorage.setItem("user", JSON.stringify(user));
      toast.message("Registration Successful!");
      setConfirmedPassword("");
      setData({
        name: "",
        email: "",
        password: "",
      });
      if (user) {
        router.push("/playground");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="py-10 flex flex-col gap-3 w-full items-center justify-center"
    >
      <div className="mb-4 w-full">
        <label className="block mb-2 text-xs text-secondary font-medium">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full p-2 rounded-md bg-gray-100 dark:bg-black outline-none border-2 border-gray-300 dark:border-stone-100 text-sm"
          name="name"
          value={data.name}
          onChange={handleInputChange}
          type="text"
          placeholder="Full Name"
        />
      </div>
      <div className="mb-4 w-full">
        <label className="block mb-2 text-xs text-secondary font-medium">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full p-2 rounded-md bg-gray-100 dark:bg-black outline-none border-2 border-gray-300 dark:border-stone-100 text-sm"
          name="email"
          value={data.email}
          onChange={handleInputChange}
          type="email"
          placeholder="Email"
        />
      </div>
      <div className="w-full flex items-center gap-4 ">
        <div className="mb-4 w-full">
          <label className="block mb-2 text-xs text-secondary font-medium">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full p-2 rounded-md bg-gray-100 dark:bg-black outline-none border-2 border-gray-300 dark:border-stone-100 text-sm"
            name="password"
            value={data.password}
            onChange={handleInputChange}
            required
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2 text-xs text-secondary font-medium">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full p-2 rounded-md bg-gray-100 dark:bg-black outline-none border-2 border-gray-300 dark:border-stone-100 text-sm"
            name="confirmedPassword"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            required
            type="password"
            placeholder="Re-type password"
          />
        </div>
      </div>

      <button
        disabled={loading}
        className="w-full dark:text-black text-slate-50 flex items-center justify-center gap-2 py-2 rounded-md dark:bg-slate-50  bg-black text-sm"
      >
        {loading && <Loader2 className=" animate-spin" size={15} />}
        Signup
      </button>
      <p className="text-sm mt-3">
        Alread have an account?{" "}
        <Link className="underline" href={"/login"}>
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
