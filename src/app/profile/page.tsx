"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    const resp = await axios.get("/api/users/userDetail");
    console.log(resp.data)
    setData(resp.data.data._id);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successfull !");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div>Profile Page</div>
      <h2 className="mt-4">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link className="py-2 bg-gray-100 text-black" href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <div className="flex gap-4 mt-4">
        <button onClick={logout} className="p-5 mt-4 bg-green-400">
          Logout
        </button>
        <button onClick={getUserDetails} className="p-5 mt-4 bg-blue-400">
          Get User Details
        </button>
      </div>
    </div>
  );
}
