import React, { useState } from "react";
// import "./styles.css";
function ChatPage() {
  const [selectedcolleagues, setSelectedcolleagues] = useState();
  const handleSelectedcolleagues = (e) => {
    e.preventDefault();
    
    setSelectedcolleagues(e.tatget.value);
    console.log(selectedcolleagues);
  };
  return (
    <div className="w-full flex ">
      <div className="flex-1 flex  items-center  ">
        <div className="flex w-full m-auto justify-center  "> <form action="
              ">
          <div className="max-w-xl w-full bg-blue-800 text-white flex flexcol p-5 flex-col rounded-lg   gap-5 justify-center">
             
                        متن تكست ارسالي
                  <input type="text" />
                  <button>ارسال</button>

              
          </div>
          </form>
        </div>
      </div>
      <div className="flex-1 ">
        <form
          action="
                "
        >
          <div className="flex  max-w-lg flex-col gap-4 mt-4">
            <label htmlFor="subject">موضوع</label>

            <input type="text" name="subject" />
            <label htmlFor="message"></label>
            <textarea name="message" id="" cols="30" rows="10"></textarea>

            <label htmlFor="colleagues"></label>
          </div>
          <select className="w-max" name="colleagues" id="">
            <option
              className="optionS"
              onClick={handleSelectedcolleagues}
              value="s"
            >
              سينا اميري
            </option>
            <option
              className="optionS"
              onClick={handleSelectedcolleagues}
              value="s"
            >
              سينا اميري
            </option>
            <option
              className="optionS"
              onClick={handleSelectedcolleagues}
              value="s"
            >
              سينا اميري
            </option>
            <option
              className="optionS"
              onClick={handleSelectedcolleagues}
              value="s"
            >
              سينا اميري
            </option>
          </select>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
