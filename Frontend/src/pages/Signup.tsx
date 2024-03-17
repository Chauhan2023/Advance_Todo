import React, { useState, ChangeEvent, FormEvent } from "react";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";
import PreviousMap from "postcss/lib/previous-map";
import { wait } from "@testing-library/user-event/dist/utils";

interface user {
  name: string;
  mobile: number | null;
  email: string;
  password: string;
}

function Signup() {
  const [signdata, setsigndata] = useState<user>({
    name: "",
    mobile: null,
    email: "",
    password: "",
  });

  

  function onchanges(event: ChangeEvent<HTMLInputElement>) {
    setsigndata({ ...signdata, [event.target.name]: event.target.value });
  }

  async function handlesignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("http://localhost:80/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: signdata.name,
        mobile: signdata.mobile,
        email: signdata.email,
        password: signdata.password,
      }),
    });

    if (!res.ok) {
      alert("User is not create");
    } else {
      alert("User is successfully");
      const result = await res.json();
      console.log(result);
    }
  }

  return (
    <div className="relative w-full h-screen  bg-gradient-to-br from-red-500 via-red-600 to-red-700">
      <Navbar />

      <div className="absolute h-[70vh] w-3/4 md:w-2/6 border-[2px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-lg rounded px-2 flex py-3 items-center flex-col gap-2">
        <h1 className="text-white text-2xl">Please Fill Your Signup Detail</h1>
        <form
          onSubmit={handlesignup}
          className="h-full w-full items-center flex flex-col gap-5"
        >
          <input
            type="text"
            name="name"
            className="w-full text-2xl p-1 rounded-md border-gray-400"
            placeholder=" Enter your Name"
            onChange={onchanges}
            value={signdata.name}
          />

          <input
            type="number"
            name="mobile"
            className="w-full text-2xl p-1 rounded-md border-gray-400"
            placeholder=" Enter your Mobile No."
            onChange={onchanges}
            value={signdata.mobile !== null ? signdata.mobile : ""}
          />

          <input
            type="text"
            name="email"
            className="w-full text-2xl p-1 rounded-md border-gray-400"
            placeholder=" Enter your email"
            onChange={onchanges}
            value={signdata.email}
          />
          <input
            type="password"
            name="password"
            className="w-full text-2xl p-1 rounded-md border-gray-400"
            placeholder=" Enter your  Password"
            onChange={onchanges}
            value={signdata.password}
          />
          <button
            type="submit"
            className="bg-orange-300 w-3/4 text-2xl py-2  rounded-lg"
          >
            Submit
          </button>

          <Link to="/login">
            <h1 className="text-white">If you have account</h1>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
