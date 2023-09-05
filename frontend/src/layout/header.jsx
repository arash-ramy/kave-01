import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import {HiUserCircle} from "react-icons/hi"
import { useState } from 'react';

function Header() {
    const [showUser, setShowUser] = useState(false);

    const { loading, isAuthenticated,user } = useSelector((state) => state.user);

const onMouseUser=()=>{
    setShowUser(true)
}
const onMouseLeave=()=>{
    setShowUser(false)
}

    return (
        <div className="w-full h-12  flex items-center justify-center bg-blue-900 text-white" >
            <div className="max-w-7xl w-full  h-full  flex items-center  justify-end  " >
         
          
            <div className="relative flex flex-row-reverse">
            <HiUserCircle size={25} onMouseEnter={onMouseUser} onMouseLeave={onMouseLeave} />
            {showUser&&
                <span className="p-2 bg-white absolute top-8 rounded-sm	text-blue-900">           {isAuthenticated===true&&user?.email} 
</span>
         }
            </div>
            </div>

            
        </div>
    )
}

export default Header
