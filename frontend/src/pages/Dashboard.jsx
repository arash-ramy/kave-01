
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const changehandler=(e)=>{
  
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (password !== password2) {
      axios
        .get(`${server}/user/logout`,{ withCredentials: true })
        .then((res) => {
          toast.success(res.data.message);
       
           navigate('/');


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
          خروج از حساب كاربري
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
         
           
            

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                ارسال
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard