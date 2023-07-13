"use client";

import { LoginInterface, login } from "@/lib/services/auth.service";
import { Loader2 } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

const LoginForm = (): JSX.Element => {
  const router: AppRouterInstance = useRouter();
  const [data, setData] = useState<LoginInterface>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login({ email: data.email, password: data.password });
      localStorage.setItem("user", JSON.stringify(user));
      setData({ email: "", password: "" });
      toast.message("Login Successful!");
      router.push("/playground");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="py-10">
      <div className="mb-4">
        <label className="block mb-2 text-xs text-secondary font-medium">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full p-2 rounded-md bg-gray-100 dark:bg-black outline-none border-2 border-gray-300 dark:border-stone-100 text-sm"
          required
          name="email"
          value={data.email}
          onChange={handleInputChange}
          type="email"
          placeholder="Email"
        />
      </div>
      <div className="mb-4">
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
      <button
        disabled={loading}
        className="w-full dark:text-black text-slate-50 flex items-center justify-center gap-2 py-2 rounded-md dark:bg-slate-50  bg-black text-sm"
      >
        {loading && <Loader2 className=" animate-spin" size={15} />}
        Login
      </button>
      <p className="text-sm mt-6">
        Don&apos;t have an account?{" "}
        <Link className="underline" href={"/signup"}>
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
