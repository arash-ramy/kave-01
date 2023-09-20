import React, { useState } from 'react'
import "./styles.css"
function SideBar({sidebar}) {
    const [toggle, setToggle] = useState();

    console.log(sidebar,"uuuuuuuuu")
    return (
        <div className="sideBar">
            
            <div className="sideBarAB">
                <ul className="ul">
                  {sidebar?.map((s)=>(
                      <div onClick={(e)=>{
                        e.preventDefault()
                        setToggle(!toggle)
                    }}>
                      <li className="lii"  >
                          {s.caption}
                   
                          

                      </li>

                      <ul>

                          <li>
                              {s.floor
                              ==2 ||s?.childred ? s?.childred?.map((q)=>(
                                  (q.caption)
                              ))
                            :
                            "no"
                            }
                          </li>
                      </ul>
                      </div>
                  ))}
                </ul>
            </div>
        </div>
    )
}

export default SideBar
