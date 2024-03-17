import { disconnect } from "process";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";

function Navbar() {
  const navigator = useNavigate();
  const userName = localStorage.getItem("userName");
  console.log(userName);
  return (
    <div className="w-full">
      {!localStorage.getItem("Token") ? (
        <div className="w-full text-3xl text-white font-bold flex justify-between bg-[#58C74C] gap-1 p-3">
          <Link to="/">
            <h1 className="text-zinc-700 w-full ">
              <IoMdHome />
            </h1>
          </Link>
          <h1 className="hidden w-full md:block text-center">
            `Welcome To Your advance Todo ${userName}`
          </h1>

          {localStorage.getItem("Token") ? (
            <div className="visible md:hidden right-2   bottom-2 z-10">
              <button className="p-2 text-xl text-white bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-lg">
                <Link to="/oldTodo">Your Old Todo</Link>
              </button>
            </div>
          ) : (
            ""
          )}

          <div className="text-xl flex gap-2">
            <button className="p-2 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-lg">
              <Link to="/login">Login</Link>
            </button>
            <button className="p-2 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-lg">
              {" "}
              <Link to="/signup">SignUp</Link>
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full text-3xl text-white font-bold flex justify-between bg-[#58C74C] gap-1 p-3">
          <Link to="/">
            <h1 className="text-zinc-700 w-full ">
              <IoMdHome />
            </h1>
          </Link>
          <h1 className="hidden w-full md:block text-center">
            Welcome To Your advance Todo
          </h1>
          <div className="visible md:hidden right-2   bottom-2 z-10">
            <button className="p-2 text-xl text-white bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-lg">
              <Link to="/oldTodo">Your Old Todo</Link>
            </button>
          </div>

          <div className="text-xl flex gap-2">
            <button
              className="p-2 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-lg"
              onClick={() => {
                localStorage.clear();
                navigator("/");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
