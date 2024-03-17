import React, { useState, ChangeEvent, FormEvent } from "react";

import Navbar from "../component/Navbar";
import { Link, useNavigate } from "react-router-dom";
interface login {
  email: string;
  password: string;
}
function Login() {
  const navigate = useNavigate();

  const [data, setdata] = useState<login>({ email: "", password: "" });

  function handelData(event: ChangeEvent<HTMLInputElement>) {
    setdata({ ...data, [event.target.name]: event.target.value });
  }

  async function handleform(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await fetch("http://localhost:80/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const resposeData = await res.json();
    console.log(resposeData);

    if (!res.ok) {
      alert(resposeData.error);
    } else {
      alert(resposeData.success);
      localStorage.setItem("userName", resposeData.username);
      localStorage.setItem("Token", resposeData.token);
      navigate("/");
      window.location.reload();
    }
  }
  return (
    <div className="relative w-full h-screen  bg-gradient-to-br from-red-500 via-red-600 to-red-700">
      <Navbar />

      <div className="absolute h-[50vh] w-3/4 md:w-2/6 border-[2px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-lg rounded px-2 flex py-3 items-center flex-col gap-2">
        <h1 className="text-white text-2xl">Please Fill Your Login Detail</h1>
        <form
          onSubmit={handleform}
          className="h-full w-full items-center flex flex-col gap-5"
        >
          <input
            type="text"
            value={data.email}
            name="email"
            onChange={handelData}
            className="w-full text-2xl p-1 rounded-md border-gray-400"
            placeholder=" Enter your registered email"
          />
          <input
            type="text"
            value={data.password}
            name="password"
            onChange={handelData}
            className="w-full text-2xl p-1 rounded-md border-gray-400"
            placeholder=" Enter your registered password"
          />
          <button
            type="submit"
            className="bg-orange-300 w-3/4 text-2xl py-2  rounded-lg"
          >
            Submit
          </button>

          <Link to="/signup">
            <h1 className="text-white">If you have no account</h1>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
