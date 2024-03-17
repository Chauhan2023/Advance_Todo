import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { Link, redirectDocument } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Home() {
  const [newtext, setText] = useState<string>("");
  const [list, setList] = useState<string[]>([]);

  const handleTodo = () => {
    setList([...list, newtext]);
    setText("");
  };

  const deleteList = (index: number): void => {
    setList((previous) => {
      return previous.filter((items, key) => {
        return index != key;
      });
    });
  };

  async function sendToDatabase(){
    const res=await fetch("http://localhost:80/upload",{
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        list:list,
        name:localStorage.getItem('userName')
      }),

    })

    const responseUpload=await res.json();

    if(res.ok){
      alert(responseUpload.success)
    }
    else{
      alert(responseUpload.error)
    }
  }

  return (
    <div className="md:h-screen w-full bg-gradient-to-br from-cyan-500 via-green-500 to-yellow-400 overflow-hidden relative">
      <Navbar />
      {(localStorage.getItem("Token")) ? (
        <div className="relative flex justify-center items-center w-full h-[85vh] mt-3">
          <div className="relative w-3/4 md:w-2/4 lg:w-1/3 border-white h-full border-[2px] rounded-xl ">
            <h1 className="w-full text-center p-2 text-2xl font-bold bg-red-400 rounded-tl-lg rounded-tr-lg">
              Todo
            </h1>

            <div className="w-full p-2 overflow-scroll overflow-x-hidden h-[60vh] text-2xl">
              {list.map((items, index) => (
                <div
                  className="bg-white flex justify-between my-1 rounded-lg px-1"
                  key={index}
                  id={`${index}`}
                >
                  <h1 className=" overflow-clip ">{items}</h1>
                  <div className="flex gap-2">
                    <button onClick={() => deleteList(index)} className="px-2">
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 w-full text-2xl px-2">
              <div className="w-full flex gap-1 justify-between bg-white py-1  px-2 rounded-lg">
                <input
                  className="w-4/5 border-white border-[2px] bg-transparent  rounded-xl overflow-hidden "
                  type="text"
                  placeholder="Enter your task"
                  value={newtext}
                  onChange={(event) => setText(event.target.value)}
                />

                <button
                  onClick={handleTodo}
                  className="bg-red-300 px-3 rounded"
                >
                  <FaArrowAltCircleRight />
                </button>
              </div>
              <button
                onClick={sendToDatabase}
                className="flex justify-center items-center gap-1 bg-gradient-to-br from-red-500 via-red-600 to-red-700 p-1 px-5 rounded-xl my-1 w-full"
              >
                Submit to Database <FaCloudUploadAlt />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[100vw] md:h-[50vh]  flex justify-center items-center flex-col gap-10">
          <h1 className="text-6xl">Welcome to Advance Todo</h1>
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
      )}

      {(localStorage.getItem("Token"))?<div className="absolute right-2  hidden md:block  bottom-2 z-10">
        <button className="p-2 text-white bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-lg">
          <Link to="/oldTodo">Your Old Todo</Link>
        </button>
      </div>:""}
    </div>
  );
}

export default Home;
