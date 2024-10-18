"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      toast.success("login successful")
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-semibold">{loading ? "Processing" : "LogIn"}</h1>
      <label htmlFor="label" className="mt-4">
        Email
      </label>
      <input
        className="px-4 py-2 text-black border-gray-300 rounded-lg mb-4"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder="Email"
      />
      <label htmlFor="label">Password</label>
      <input
        className="px-4 py-2 text-black border-gray-300 rounded-lg mb-4"
        id="password"
        type="text"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        placeholder="Password"
      />
      <button
        disabled={buttonDisabled}
        onClick={onLogin}
        className="px-4 py-2 bg-green-600 rounded-lg mt-2"
      >
        LogIn
      </button>
      <Link className="mt-2" href={"/signup"}>
        Visit SignUp Page
      </Link>
    </div>
  );
}
