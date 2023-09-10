import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { server } from "../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  const ENDPOINT = "http://localhost:4000";
  const socket = socketIO.connect("http://localhost:4000");
  const [section, setSection] = useState(1);
  
  const [selectOptionReadonly, setselectOptionReadonly] = useState([]);
  const [selectedmulty, setSelectedmulty] = useState([]);

  const [getUsers, setGetUsers] = useState([]);
  const [message, setMessage] = useState([]);
  const [responseMessage, setResponseMessage] = useState([]);


  const [subject, setSubject] = useState([]);
  const [description, setDescription] = useState([]);
  const [selectOption, setSelectOption] = useState([]);
  const {  user } = useSelector((state) => state.user);

  // USE EFFECT FETCHING USERS
  useEffect(() => {
    socket.clients((error, clients) => {
      if (error) throw error;
      console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
    });
    socket.on('messageResponse', (data) =>
    console.log(data,"op")
    );
    console.log("objectdddd",responseMessage);


    const getSelectUsers = async (e) => {
      console.log(user, 'usssser')
      try {
        await axios
          .get(`${server}/user/getalluser`)
          .then((res) => {
            // console.log(res.data.message);
            // console.log(res.data.users[0]._id);
            // setGetUsers(res.data.users);
            // setGetUsers((prev) => [...prev, res.data.users]);

            console.log("this is getusers", getUsers);
            // console.log("this is getusers", getUsers;
            // if(res.data.success===true){
            //             setGetUsers(res.data.users)
            //           }
            setGetUsers(res.data.users);
          })

          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getSelectUsers();
  }, []);

  const [selectedcolleagues, setSelectedcolleagues] = useState();
  const handleChange = (e) => {
    e.preventDefault();
  
    if(e.target.name==="subject"){
      setSubject(e.target.value)
    }
    if(e.target.name==="description"){
      setDescription(e.target.value)
    }
    if(e.target.name==="selected"){
      setSelectOption(e.target.value)
    }
    if(e.target.name==="selectOptionReadonly"){
      setselectOptionReadonly(e.target.value)
      
    }
    // setMessages([...messages, res.data.message]);


    setMessage(subject,description,selectOption,selectOptionReadonly)

  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if(subject===""||description==="" ||selectOption==="")
    socket.emit("message", {
      text: subject,
      description:description,
      senderId:user._id,
      receiver:selectOption,
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    })
      setSubject('')
      setDescription('')
      setSelectOption('')

   
    // const message = {
    //   sender: user._id,
    //   text: newMessage,
    //   conversationId: currentChat._id,
    // };
    // const receiverId = currentChat.members.find(
    //   (member) => member !== user?._id
    // );

    // socketId.emit("sendMessage", {
    //   senderId: user?._id,
    //   receiverId,
    //   text: newMessage,
    // });
  };

  return (
    <div className="w-full flex ">
      <div className="w-1/6 bg-yellow-500 ">
        <div className="flex w-full m-auto justify-center  ">
          <ul className="w-full flex gap-6 flex-col mt-5 " >
            <li onClick={(e)=>{e.preventDefault()
    setSection(1)
}} className="w-full hover:bg-red-400 p-5">ليست چت ها</li>
            <li onClick={(e)=>{e.preventDefault()
    setSection(2)
}} className="w-full hover:bg-red-400 p-5">ارسال درخواست</li>
          </ul>
        </div>
      </div>
      
     {section===1&& <div className=" w-5/6 bg-cyan-100 flex items-center justify-center ">
        <form>
          <div className="flex  max-w-lg flex-col gap-4 mt-4">
            <label htmlFor="subject">موضوع</label>

            <input value={subject} onChange={handleChange} type="text" name="subject" />
            <label htmlFor="message"></label>
            <textarea value={description}  onChange={handleChange} name="description" id="" cols="30" rows="10"></textarea>

            <label htmlFor="colleagues"></label>
          </div>
          <div className="flex flex-col  gap-5">
            {selectedmulty &&
            selectedmulty.map((i,index)=>(
              <span>
                {i.email}
              </span>
            ))}
            {/* SELECT RAW */}
            <select  value={selectOption}   onChange={handleChange} className="w-max" name="selected" id="">
              {getUsers &&
                getUsers.map((i, index) => (
                  <option className="optionS" >
                    {i.email}
                  </option>
                ))}
            </select>
            {/* READ ONLY SELECT */}
            <select  value={selectOptionReadonly}   onChange={handleChange} className="w-max" name="selectOptionReadonly" id="">
              {getUsers &&
                getUsers.map((i, index) => (
                  <option className="optionS" >
                    {i.email}
                  </option>
                ))}
            </select>
            <button
              onClick={sendMessageHandler}
              className=" text-white flex items-center justify-center  p-0.5 pl-3 pr-3 mt-5 hover:bg-blue-500 bg-blue-900 w-fit "
            >
              <span>ارسال</span>
            </button>
          </div>
        </form>
      </div>
      }
      {section===2&& <div className=" w-5/6 bg-cyan-100 flex items-center justify-center ">
        
      </div>
      }
    </div>
  );
}

export default ChatPage;

// import React, { useEffect, useRef, useState } from "react";
//import { useSelector } from "react-redux";
// import socketIO from "socket.io-client";
// import { format } from "timeago.js";
// import { server } from "../server";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
// import { TfiGallery } from "react-icons/tfi";
// import styles from "../styles/styles";
// const ENDPOINT = "https://socket-ecommerce-tu68.onrender.com/";
// const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

// const UserInbox = () => {
//   const { user,loading } = useSelector((state) => state.user);
//   const [conversations, setConversations] = useState([]);
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const [currentChat, setCurrentChat] = useState();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [userData, setUserData] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [images, setImages] = useState();
//   const [activeStatus, setActiveStatus] = useState(false);
//   const [open, setOpen] = useState(false);
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     socketId.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat]);

//   useEffect(() => {
//     const getConversation = async () => {
//       try {
//         const resonse = await axios.get(
//           `${server}/conversation/get-all-conversation-user/${user?._id}`,
//           {
//             withCredentials: true,
//           }
//         );

//         setConversations(resonse.data.conversations);
//       } catch (error) {
//         // console.log(error);
//       }
//     };
//     getConversation();
//   }, [user, messages]);

//   useEffect(() => {
//     if (user) {
//       const sellerId = user?._id;
//       socketId.emit("addUser", sellerId);
//       socketId.on("getUsers", (data) => {
//         setOnlineUsers(data);
//       });
//     }
//   }, [user]);

//   const onlineCheck = (chat) => {
//     const chatMembers = chat.members.find((member) => member !== user?._id);
//     const online = onlineUsers.find((user) => user.userId === chatMembers);

//     return online ? true : false;
//   };

//   // get messages
//   useEffect(() => {
//     const getMessage = async () => {
//       try {
//         const response = await axios.get(
//           `${server}/message/get-all-messages/${currentChat?._id}`
//         );
//         setMessages(response.data.messages);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getMessage();
//   }, [currentChat]);

//   // create new message
//   const sendMessageHandler = async (e) => {
//     e.preventDefault();

//     const message = {
//       sender: user._id,
//       text: newMessage,
//       conversationId: currentChat._id,
//     };
//     const receiverId = currentChat.members.find(
//       (member) => member !== user?._id
//     );

//     socketId.emit("sendMessage", {
//       senderId: user?._id,
//       receiverId,
//       text: newMessage,
//     });

//     try {
//       if (newMessage !== "") {
//         await axios
//           .post(`${server}/message/create-new-message`, message)
//           .then((res) => {
//             setMessages([...messages, res.data.message]);
//             updateLastMessage();
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateLastMessage = async () => {
//     socketId.emit("updateLastMessage", {
//       lastMessage: newMessage,
//       lastMessageId: user._id,
//     });

//     await axios
//       .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
//         lastMessage: newMessage,
//         lastMessageId: user._id,
//       })
//       .then((res) => {
//         setNewMessage("");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleImageUpload = async (e) => {
//     const reader = new FileReader();

//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         setImages(reader.result);
//         imageSendingHandler(reader.result);
//       }
//     };

//     reader.readAsDataURL(e.target.files[0]);
//   };

//   const imageSendingHandler = async (e) => {

//     const receiverId = currentChat.members.find(
//       (member) => member !== user._id
//     );

//     socketId.emit("sendMessage", {
//       senderId: user._id,
//       receiverId,
//       images: e,
//     });

//     try {
//       await axios
//         .post(
//           `${server}/message/create-new-message`,
//           {
//             images: e,
//             sender: user._id,
//             text: newMessage,
//             conversationId: currentChat._id,
//           }
//         )
//         .then((res) => {
//           setImages();
//           setMessages([...messages, res.data.message]);
//           updateLastMessageForImage();
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateLastMessageForImage = async () => {
//     await axios.put(
//       `${server}/conversation/update-last-message/${currentChat._id}`,
//       {
//         lastMessage: "Photo",
//         lastMessageId: user._id,
//       }
//     );
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
//   }, [messages]);

//   return (
//     <div className="w-full">
//       {!open && (
//         <>

//           <h1 className="text-center text-[30px] py-3 font-Poppins">
//             All Messages
//           </h1>
//           {/* All messages list */}
//           {conversations &&
//             conversations.map((item, index) => (
//               <MessageList
//                 data={item}
//                 key={index}
//                 index={index}
//                 setOpen={setOpen}
//                 setCurrentChat={setCurrentChat}
//                 me={user?._id}
//                 setUserData={setUserData}
//                 userData={userData}
//                 online={onlineCheck(item)}
//                 setActiveStatus={setActiveStatus}
//                 loading={loading}
//               />
//             ))}
//         </>
//       )}

//       {open && (
//         <SellerInbox
//           setOpen={setOpen}
//           newMessage={newMessage}
//           setNewMessage={setNewMessage}
//           sendMessageHandler={sendMessageHandler}
//           messages={messages}
//           sellerId={user._id}
//           userData={userData}
//           activeStatus={activeStatus}
//           scrollRef={scrollRef}
//           handleImageUpload={handleImageUpload}
//         />
//       )}
//     </div>
//   );
// };

// const MessageList = ({
//   data,
//   index,
//   setOpen,
//   setCurrentChat,
//   me,
//   setUserData,
//   userData,
//   online,
//   setActiveStatus,
//   loading
// }) => {
//   const [active, setActive] = useState(0);
//   const [user, setUser] = useState([]);
//   const navigate = useNavigate();
//   const handleClick = (id) => {
//     navigate(`/inbox?${id}`);
//     setOpen(true);
//   };

//   useEffect(() => {
//     setActiveStatus(online);
//     const userId = data.members.find((user) => user !== me);
//     const getUser = async () => {
//       try {
//         const res = await axios.get(`${server}/shop/get-shop-info/${userId}`);
//         setUser(res.data.shop);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getUser();
//   }, [me, data]);

//   return (
//     <div
//       className={`w-full flex p-3 px-3 ${
//         active === index ? "bg-[#00000010]" : "bg-transparent"
//       }  cursor-pointer`}
//       onClick={(e) =>
//         setActive(index) ||
//         handleClick(data._id) ||
//         setCurrentChat(data) ||
//         setUserData(user) ||
//         setActiveStatus(online)
//       }
//     >
//       <div className="relative">
//         <img
//           src={`${user?.avatar?.url}`}
//           alt=""
//           className="w-[50px] h-[50px] rounded-full"
//         />
//         {online ? (
//           <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
//         ) : (
//           <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
//         )}
//       </div>
//       <div className="pl-3">
//         <h1 className="text-[18px]">{user?.name}</h1>
//         <p className="text-[16px] text-[#000c]">
//           {!loading && data?.lastMessageId !== userData?._id
//             ? "You:"
//             : userData?.name.split(" ")[0] + ": "}{" "}
//           {data?.lastMessage}
//         </p>
//       </div>
//     </div>
//   );
// };

// const SellerInbox = ({
//   setOpen,
//   newMessage,
//   setNewMessage,
//   sendMessageHandler,
//   messages,
//   sellerId,
//   userData,
//   activeStatus,
//   scrollRef,
//   handleImageUpload,
// }) => {
//   return (
//     <div className="w-[full] min-h-full flex flex-col justify-between p-5">
//       {/* message header */}
//       <div className="w-full flex p-3 items-center justify-between bg-slate-200">
//         <div className="flex">
//           <img
//             src={`${userData?.avatar?.url}`}
//             alt=""
//             className="w-[60px] h-[60px] rounded-full"
//           />
//           <div className="pl-3">
//             <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
//             <h1>{activeStatus ? "Active Now" : ""}</h1>
//           </div>
//         </div>
//         <AiOutlineArrowRight
//           size={20}
//           className="cursor-pointer"
//           onClick={() => setOpen(false)}
//         />
//       </div>

//       {/* messages */}
//       <div className="px-3 h-[75vh] py-3 overflow-y-scroll">
//         {messages &&
//           messages.map((item, index) => (
//             <div
//               className={`flex w-full my-2 ${
//                 item.sender === sellerId ? "justify-end" : "justify-start"
//               }`}
//               ref={scrollRef}
//             >
//               {item.sender !== sellerId && (
//                 <img
//                   src={`${userData?.avatar?.url}`}
//                   className="w-[40px] h-[40px] rounded-full mr-3"
//                   alt=""
//                 />
//               )}
//               {item.images && (
//                 <img
//                   src={`${item.images?.url}`}
//                   className="w-[300px] h-[300px] object-cover rounded-[10px] ml-2 mb-2"
//                 />
//               )}
//               {item.text !== "" && (
//                 <div>
//                   <div
//                     className={`w-max p-2 rounded ${
//                       item.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]"
//                     } text-[#fff] h-min`}
//                   >
//                     <p>{item.text}</p>
//                   </div>

//                   <p className="text-[12px] text-[#000000d3] pt-1">
//                     {format(item.createdAt)}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//       </div>

//       {/* send message input */}
//       <form
//         aria-required={true}
//         className="p-3 relative w-full flex justify-between items-center"
//         onSubmit={sendMessageHandler}
//       >
//         <div className="w-[30px]">
//           <input
//             type="file"
//             name=""
//             id="image"
//             className="hidden"
//             onChange={handleImageUpload}
//           />
//           <label htmlFor="image">
//             <TfiGallery className="cursor-pointer" size={20} />
//           </label>
//         </div>
//         <div className="w-full">
//           <input
//             type="text"
//             required
//             placeholder="Enter your message..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             className={`${styles.input}`}
//           />
//           <input type="submit" value="Send" className="hidden" id="send" />
//           <label htmlFor="send">
//             <AiOutlineSend
//               size={20}
//               className="absolute right-4 top-5 cursor-pointer"
//             />
//           </label>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UserInbox;
