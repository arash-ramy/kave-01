import React, { useState, useEffect } from "react";
import SideBar from "../../layout/Sidebar/Sidebar";
import axios from "axios";
import "./styles.css";
function Home() {
  const [sidebar, setSidebar] = useState();
  const [ifwasone, setIfwason] = useState(true);
  const [sidebarSelected, setSidebarSelected] = useState({ data: "خريدار" });
  const [indige, setIndige] = useState();

  useEffect(() => {
    const getFloor = async () => {
      await axios
        .get(`http://localhost:8001/api/v2/user/getsidebar`)
        .then((res) => {
          setSidebar(res.data.sidebar);
          // console.log(res)
        });
    };

    getFloor();
  }, []);
  useEffect(() => {
    const getFloor = async () => {
      console.log("rund");
      await axios
        .post(
          `http://localhost:8001/api/v2/user/getsinglesidebar`,
          sidebarSelected
        )
        .then((res) => {
          console.log("data", res);
          setIndige({ data: res.data.sidebar });
          // console.log(res)
        });
    };
    console.log(sidebarSelected);
    getFloor();
  }, [sidebarSelected]); 
  return (
    <div className="container">
      <div className="Home">
        <CreateSidebar
          setSidebarSelected={setSidebarSelected}
          ifwasone={ifwasone}
          setIfwason={setIfwason}
          sidebarSelected={sidebarSelected}
          sidebar={sidebar}
          indige={indige}
        />
        {/* <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sack-dollar" class="svg-inline--fa fa-sack-dollar sideMenuItem_icon me-2 text-white" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M320 96H192L144.6 24.88C137.5 14.24 145.1 0 157.9 0H354.1C366.9 0 374.5 14.24 367.4 24.88L320 96zM192 128H320C323.8 130.5 328.1 133.3 332.1 136.4C389.7 172.7 512 250.9 512 416C512 469 469 512 416 512H96C42.98 512 0 469 0 416C0 250.9 122.3 172.7 179 136.4C183.9 133.3 188.2 130.5 192 128V128zM276.1 224C276.1 212.9 267.1 203.9 255.1 203.9C244.9 203.9 235.9 212.9 235.9 224V230C230.3 231.2 224.1 232.9 220 235.1C205.1 241.9 192.1 254.5 188.9 272.8C187.1 283 188.1 292.9 192.3 301.8C196.5 310.6 203 316.8 209.6 321.3C221.2 329.2 236.5 333.8 248.2 337.3L250.4 337.9C264.4 342.2 273.8 345.3 279.7 349.6C282.2 351.4 283.1 352.8 283.4 353.7C283.8 354.5 284.4 356.3 283.7 360.3C283.1 363.8 281.2 366.8 275.7 369.1C269.6 371.7 259.7 373 246.9 371C240.9 370 230.2 366.4 220.7 363.2C218.5 362.4 216.3 361.7 214.3 361C203.8 357.5 192.5 363.2 189 373.7C185.5 384.2 191.2 395.5 201.7 398.1C202.9 399.4 204.4 399.9 206.1 400.5C213.1 403.2 226.4 407.4 235.9 409.6V416C235.9 427.1 244.9 436.1 255.1 436.1C267.1 436.1 276.1 427.1 276.1 416V410.5C281.4 409.5 286.6 407.1 291.4 405.9C307.2 399.2 319.8 386.2 323.1 367.2C324.9 356.8 324.1 346.8 320.1 337.7C316.2 328.7 309.9 322.1 303.2 317.3C291.1 308.4 274.9 303.6 262.8 299.9L261.1 299.7C247.8 295.4 238.2 292.4 232.1 288.2C229.5 286.4 228.7 285.2 228.5 284.7C228.3 284.3 227.7 283.1 228.3 279.7C228.7 277.7 230.2 274.4 236.5 271.6C242.1 268.7 252.9 267.1 265.1 268.1C269.5 269.7 283 272.3 286.9 273.3C297.5 276.2 308.5 269.8 311.3 259.1C314.2 248.5 307.8 237.5 297.1 234.7C292.7 233.5 282.7 231.5 276.1 230.3L276.1 224z"></path></svg> */}
      </div>
      <SideBar sidebar={sidebar} />
    </div>
  );
}

export default Home;

function CreateSidebar({
  sidebar,
  setIfwason,
  ifwasone,
  setSidebarSelected,
  sidebarSelected,
  indige,
}) {
  const [caption, setCaption] = useState();
  const [floor, setFloor] = useState();
  const [row, SetRow] = useState();
  const [showSingleDetail, setSingleDetail] = useState({});

  // console.log(indige.data.caption)
  // const [sendingAlldata, setSendingAlldata] = useState([]);
  const handleChangeSelect = async (e) => {
    e.preventDefault();

    //  if(e.target.name.one){
    //   e.target.value =1
    //   // console.log("object")

    // await axios
    // .post(`http://localhost:8001/api/v2/user/getsinglesidebar`,{"cap":e.target.value})
    // .then((res) => {
    //   setSingleDetail(res.data.sidebar)
    //   console.log(showSingleDetail,"this is showsingle")
    //   // setSidebar(res.data.sidebar);
    //   // console.log(res)
    // });

    //  console.log(e.target)

    //  if(e.target.value==1){
    //   setIfwason(true)
    //  }
    //  else{
    //   setIfwason(false)
    //  }
    console.log(e.target.value);

    setSidebarSelected({ data: e.target.value });
    // const d = sidebar.filter((i) => i.caption === e.target.value);
    // console.log(d ,"d")

    //  console.log(e.target ,"this is e")
    //   console.log(e.target.value,":")
    // setFloor(e.target.value);
  };
  useEffect(() => {}, [indige]);
  const onsubmitSidebar = async (e) => {
    e.preventDefault();
    try {
      // sendingAlldata([row,floor,caption])
      await axios
        .post(`http://localhost:8001/api/v2/user/createsidebar`, {
          row: row,
          floor: floor,
          caption: caption,
        })
        .then((res) => console.log(res));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="sdfjkfds">
        <div>
          <form onSubmit={onsubmitSidebar}>
            <div className="SidebarAction">
              <button
                className="clicks"
                onClick={(e) => {
                  e.preventDefault();
                  setIfwason(!ifwasone);
                }}
              >
                ساخت جديد
              </button>
              <label htmlFor="floor">فلور اول</label>
              <select
                defaultValue="2"
                name="floor"
                type="number"
                placeholder="inter floor"
                onChange={handleChangeSelect}
              >
                {sidebar?.map((e) => (
                  <option value={e.caption}>{e.caption}</option>
                ))}
              </select>
              <input
                    name="caption"
                    type="text"
                    placeholder="عنوان جديدي"
                    onChange={(e) => {
                      e.preventDefault();
                      setCaption(e.target.value);
                    }} />
                    <input
                    name="caption"
                    type="text"
                    placeholder="عنوان جديدي"
                    onChange={(e) => {
                      e.preventDefault();
                      setCaption(e.target.value);
                    }}
/>
              {ifwasone && (
                <div className="ifwasone">
                  <label htmlFor="caption">متن</label>
                  <input
                    name="caption"
                    type="text"
                    placeholder="عنوان جديدي"
                    onChange={(e) => {
                      e.preventDefault();
                      setCaption(e.target.value);
                    }}
                  />
                  <label htmlFor="floor">رديف</label>
                  <input
                    name="floor"
                    type="text"
                    placeholder="رديف"
                    onChange={(e) => {
                      e.preventDefault();
                      setFloor(e.target.value);
                    }}
                  />

                  <input
                    name="row"
                    type="text"
                    placeholder="inter row"
                    onChange={(e) => {
                      e.preventDefault();
                      SetRow(e.target.value);
                    }}
                  />
                  <button className="clicks">click</button>
                </div>
              )}
            </div>
          </form>
        </div>
        {/* section 2 */}
        <div>
          {/* {indige && indige.length > 0 ?indige?.data.caption} */}
          {indige ? (
            <p>
              {indige.data?.caption}
              <p>{indige.data?.floor}</p>
              <p>{indige.data?.row}</p>
              {indige.data?.childred.map((e) => (
                <p>{e.caption}</p>
              ))}

              {/* {indige.data.caption} */}
            </p>
          ) : null}
          <p></p>
        </div>
      </div>
    </>
  );
}
