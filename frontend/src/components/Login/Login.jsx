import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useRef } from "react";

const PrincipaleLogin = () => {
  const [authType, setAuthType] = useState(1);
  const [resetPasswordPhone, setResetPasswordPhone] = useState(1);

  switch (authType) {
    case 1:
      return <Login setAuthType={setAuthType} />;
    case 2:
      return <Singup setAuthType={setAuthType} />;
    case 3:
      return <ResetPassword setResetPasswordPhone={setResetPasswordPhone} setAuthType={setAuthType} />;
    case 4:
      return <ResetPasswordPsw resetPasswordPhone={resetPasswordPhone} setAuthType={setAuthType} />;
    default:
      return <Login />;
  }
  // return (
  //   <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"></div>
  // );
};

const Login = ({ setAuthType }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error("ايميل يا رمز عبور اشتباه");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          ورود با ايميل
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                ايميل
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                رمز عبور
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute left-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute left-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  منو به خاطر بسپار
                </label>
              </div>
              <div className="text-sm">
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    setAuthType(3);
                  }}
                  className="text-blue-600 pl-2 cursor-pointer"
                >
                  فراموشي رمز عبور
                </span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                ارسال
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>قبلا ثبت نام نكرده ايد</h4>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  setAuthType(2);
                }}
                className="text-blue-600 pl-2 cursor-pointer"
              >
                ثبت نام
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Singup = ({ setAuthType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${server}/user/create-user`,       
       { email, password }, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        setEmail("");
        setPassword("");
        setAuthType(1)
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          ثبت نام
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div></div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                ايميل
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                رمز عبور
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute left-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute left-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center"></div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                ارسال
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>قبلا ثبت نام كرده ايد ؟</h4>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  setAuthType(1);
                }}
                className="text-blue-600 pl-2 cur cursor-pointer"
              >
                ورود
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ResetPassword = ({ setAuthType, setResetPasswordPhone }) => {
  const [email, setEmail] = useState("");


  const onChangehandler =async (e)=>{
    if(e.target.name==="email"){
    setEmail(e.target.value)
    setResetPasswordPhone(e.target.value)
  }
  
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${server}/user/resetpasswordphn`        
      ,{ email } ,{ withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        setEmail("");
        setAuthType(4);
        // setPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          نوسازي رمز عبور
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div></div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                ايميل
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="ايميل خود را وارد كنيد"
                  value={email}
                  onChange={onChangehandler}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div></div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                ارسال
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  setAuthType(1);
                }}
                className="text-blue-600 pl-2 cursor-pointer"
              >
                بازگشت به صفحه اصلي
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ResetPasswordPsw = ({ setAuthType ,resetPasswordPhone}) => {
  const [resetCode, setResectCode] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [pswError, setPswError] = useState(false);



  const navigate = useNavigate();




  const changehandler=(e)=>{
    e.preventDefault();

    // if(e.target.value===e.target.value){
    //   resetpsw2.current.style.border="1px solid orange"

    if(e.target.name ==="resetCode"){
      setResectCode(e.target.value)}
    if(e.target.name ==="firstPassword"){
      setFirstPassword(e.target.value)
    }
    if(e.target.name ==="secondPassword"){
      setSecondPassword(e.target.value)
    }
   
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (password !== password2) {
      axios
        .post(`${server}/user/resetpasswordpsw`, { firstPassword,resetCode,secondPassword,resetPasswordPhone })
        .then((res) => {
          toast.success(res.data.message);
          setResectCode("");
          setFirstPassword("");
          setSecondPassword("");
          // window.location.reload(true);


        })
        .catch((error) => {
          toast.error(error.response.data.message);
        }); 
    // } else {
    //   setPswError("");
    // }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          نوسازي رمز عبور
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              {/* <h3>كد ارسال شده را وارد كنيد</h3> */}
            </div>
            <div>
              <label 
                htmlFor="password"
                className=" block text-sm font-medium  mb-7  text-gray-700"
              >كد ارسال شده را وارد كنيد</label>
              <div className="mt-1 relative flex justify-center">
                <input
                  type={"text"}
                  name="resetCode"
                  autoComplete="current-password"
                  required
                
                  placeholder="inter reset code"
                  value={resetCode}
                  onChange={changehandler}
                  className=" appearance-none block w-35 px-3 text-center py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                رمز عبور جديد
              </label>
              <div className="mt-1 relative">
                <input
                  type={"password"}
                  name="firstPassword"

                  autoComplete="current-password"
                  required
                  value={firstPassword}
                  onChange={changehandler}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                تكرار رمز عبور جديد
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  name="secondPassword"
                  autoComplete="current-password"
                  required
                  value={secondPassword}
                  onChange={changehandler}
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 border-gray-300  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm `}
                />
              </div>

            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                ارسال
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>قبلا ثبت نام كرده ايد ؟</h4>
              <span
                onClick={(e)=>{e.preventDefault()
                  setAuthType(1)}}
                className="text-blue-600 pl-2 cur cursor-pointer"
              >
                ورود
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};



// const Logout = ({ setAuthType ,resetPasswordPhone}) => {

//   const changehandler=(e)=>{
  
//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // if (password !== password2) {
//       axios
//         .get(`${server}/user/logout`)
//         .then((res) => {
//           toast.success(res.data.message);
       
//            navigate('/');


//         })
//         .catch((error) => {
//           toast.error(error.response.data.message);
//         }); 
//     // } else {
//     //   setPswError("");
//     // }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           پسوورد جديد خود را وارد كنيد
//         </h2>
//       </div>
//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div></div>
           
            

//             <div>
//               <button
//                 type="submit"
//                 className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
//               >
//                 ارسال
//               </button>
//             </div>
            
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };



export default PrincipaleLogin;
