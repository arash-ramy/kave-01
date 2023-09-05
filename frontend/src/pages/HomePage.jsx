import React from "react";
import Header from "../layout/header";
import pic from "../static/Outlook.png";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FiSearch } from "react-icons/fi";



function chatRoom({ user }) {
  return (
    <div className="w-full  w-3/12 bg-blue-700">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

function HomePage({ user }) {
  console.log(user, "this is userrr");
  return (
    <>
      {/* <Header /> */}
      <div className="w-full h-12  flex items-center justify-center">
        <div className="max-w-7xl w-full  flex    text-left  flex-wrap  ">
          <div className="flex-4  w-3/12 bg-red-400 ">profile</div>
          <div className="flex-1 w-6/12 bg-red-500 ">chat here</div>
          {/* section 3*/}
          <div className="w-full  w-3/12  flex flex-col items-center justify-center">
            {/* user profile */}
            <div className="flex flex-row-reverse align-center justify-between w-full p-4 gap-4">
              <div className="flex gap-5">
                <div className="">
                  <span className="">asghar farhadi</span>
                  <span
                    className="text-white bg-blue-800 rounded p-0.4 text-xs	flex items-center justify-center

"
                  >
                    senior developer
                  </span>
                </div>

                <div className=" flex  items-center justify-center flex-wrap  ">
                  <div className="w-8 h-8 borderr rounded-full overflow-hidden">
                    <img
                      className="max-w-full max-h-full bg-cover "
                      src="https://handsontek.net/images/SharePoint/ProfilePicture/Outlook.PNG"
                      alt="React Logo"
                    />
                  </div>
                </div>
              </div>
              <div className=" flex self-center cursor-pointer">
                <h4>
                  <MdOutlineModeEditOutline size={21} />
                </h4>
              </div>
            </div>

            {/* search chat lists */}
            <div className="flex flex-row-reverse  bg-slate-400 items-center gap-1 p-1  rounded-2xl w-9/12 ">
              <div className="ml-2"><FiSearch/></div>
              <input className="bg-transparent text-left p1" type="text" />
            </div>
            <div></div>
          </div>{" "}
        </div>
      </div>
    </>
  );
}

export default HomePage;
