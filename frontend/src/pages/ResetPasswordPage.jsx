// import axios from "axios";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { server } from "../server";
// import { Link, useNavigate } from "react-router-dom";

// // const ResetPassword = () => {
//   const { activation_token } = useParams();
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (activation_token) {
//       const sendRequest = async () => {
//         await axios
//           .post(`${server}/user/activation`, {
//             activation_token,
//           })
//           .then((res) => {

//             console.log(res);
//             console.log("this is ",activation_token);
//             navigate("/");
//           })
//           .catch((err) => {
//             navigate("/");
//             setError(true);
//           });
//       };
//       sendRequest();
//     }
//   }, [activation_token]);

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {error ? (
//         <p>Your token is expired!</p>
//       ) : (
//         <p>Your account has been created suceessfully!</p>
//       )}
//     </div>
//   );
// };

// export default ResetPassword;
