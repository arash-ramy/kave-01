const express = require("express");
const User = require("../model/user");
const Sidebar = require("../model/sidebar");
const mongoose = require("mongoose");

const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");

// create user
router.post("/create-user", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }
    if (email === null || password === null) {
      return next(
        new ErrorHandler("Please enter valid email and password_4888", 400)
      );
    }
    if (email === undefined || password === undefined) {
      return next(
        new ErrorHandler("Please enter valid email and password_055", 400)
      );
    }
    if (email === "" || password === "") {
      return next(
        new ErrorHandler("Please enter valid email and password_589", 400)
      );
    }
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    // const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    //   folder: "avatars",
    // });

    const user = {
      email: email,
      password: password,
      // avatar: {
      //   public_id: myCloud.public_id,
      //   url: myCloud.secure_url,
      // },
    };
    const activationToken = createActivationToken(user);
    // console.log("activationToken____For__CREATE__USER",activationToken)

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    console.log("resid");
    try {
      const { activation_token } = req.body;
      // console.log("activation_token",activation_token)
      console.log("activationToken____For__ACTIVATION", activation_token);

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      console.log("newUser", newUser);
      // console.log("resid 1")

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const {
        email,
        password,
        // , avatar
      } = newUser;
      //  console.log("resid 2")

      const user = await User.findOne({ email });
      // console.log("resid 3")
      // console.log(user)
      // console.log(newUser)

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }

      const user1 = await User.create({
        email,
        // avatar,
        password,
      });
      // console.log("resid 4")
      sendToken(user1, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    console.log("first");

    try {
      const user = await User.findById(req.user.id);
      console.log("first");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// reset user password
router.post(
  "/resetpasswordphn",
  catchAsyncErrors(async (req, res, next) => {
    console.log("resid");
    try {
      const { email } = req.body;
      console.log(email);
      if (email === null || email === undefined || email === "") {
        return next(new ErrorHandler("enter a vlid Email", 400));
      }
      const userEmail = await User.findOne({ email });
      console.log(userEmail, "userFounded");

      if (!userEmail) {
        return next(
          new ErrorHandler(
            "لطفا با ايميلي كه ثبت نام كرده ايد را وارد كنيد",
            400
          )
        );
      }

      const genCode = Math.floor(100000 + Math.random() * 900000);

      userEmail.resetPassword = genCode;
      console.log(userEmail, "this is");

      // const userWithResetPassword= await userEmail.save;

      userEmail.resetPassword = genCode;
      userEmail.verificationDate = new Date();
      console.log(genCode);

      await userEmail.save();

      const verificationDateExp = new Date(
        userEmail.verificationDate.getTime() + 120 * 1000
      );

      if (verificationDateExp < new Date()) {
        userEmail.verificationCode = "";
        userEmail.verificationDate = null;
        await userEmail.save();
        return next(new AppError("کد تایید منقضی شده است", 401));
      }

      try {
        await sendMail({
          email: userEmail.email,
          subject: "reset your account",
          message: `  Enter   ${genCode}   to reset your password  `,
        });
        res.status(201).json({
          success: true,
          message: `please check your email:- 
          ${userEmail.email} to reset your account!`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (err) {
      return next(new ErrorHandler(err, 500));
    }
  })
);

// reset user password part2
router.post(
  "/resetpasswordpsw",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { firstPassword, secondPassword, resetCode, resetPasswordPhone } =
        req.body;
      if (!firstPassword || !secondPassword || !resetCode) {
        return next(new ErrorHandler("ورودي ها چك شود", 400));
      }
      if (firstPassword !== secondPassword) {
        return next(new ErrorHandler("عدم تطابق گذرواژه ", 401));
      }
      if (firstPassword <= 6) {
        return next(new ErrorHandler("رمز كوتاه است ", 401));
      }
      const user = await User.find({ email: resetPasswordPhone })
        .where("resetPassword")
        .equals(resetCode);

      // .select("-resetPassword")
      // console.log(user.password,"099")
      if (!user || user.length <= 0) {
        return next(new ErrorHandler("كد وارد شده صحيح نيست", 401));
      }
      console.log(user, "inja khatas");
      user[0].password = firstPassword;
      await user[0].save();

      res.status(200).json({
        message: "عمليات نوسازي رمز عبور با موفقيت انجام شد",
      });
      console.log(req.body, "dd");
    } catch (error) {
      console.log(error.message);
      return next(new ErrorHandler("خطا ورودي ها چك شود", 401));
    }
  })
);
// log out user
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/getalluser",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.find();

      res.status(201).json({
        success: true,
        message:"fetching data successfullky",
        users:users
      })
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


router.post(
  "/createsidebar",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {row,floor,caption}=req.body
      console.log(req.body)
  if(!row || !floor || !caption){
    return res.status(400).json({
      "message":"please inter inputs"
    }) 
  }
  const findLike =await Sidebar.findOne({row});

  if(findLike){
    console.log("are")



    const side = await Sidebar.find({}).select(['-caption',"-childred","-_id","-__v"]).where("row")
    .gt(req.body.row-1).where("floor").equals(req.body.floor).sort({ row: 1 })

      console.log(side,"355")
      // side.updateMany(row,{side});
      
      // .where("floor").equals(req.body.floor)
    console.log(side,"357")
    // console.log(side.length)

      let b=0;
    for(b;b<side.length;b++){
      console.log(side[b].row)
      console.log(typeof(side[b].row.toString()))
      const ioio=side[b].row;
      const ss = await Sidebar.findOneAndUpdate( {row : ioio},{
            row: parseInt(side[b].row)+1,
           
         });

    }
    





  }
  if(findLike){
    console.log("na")
  }





      
   const sidebody={
     row,floor,caption
    }
    const sidebar = await Sidebar.create({
      row,
      floor,
      caption,
    });
   
   return res.status(201).json({
      "message":"successfuly"
    })    
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// UPDATE NAV CHILD



router.post(
  "/updatenavchild",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // const {}= req.body;
   const{caption,subnavrow,parent,parentrow }=req.body
// const captionbody= req.body.caption;
console.log(parentrow,"sii")

    const founded = await Sidebar.findOne({ "caption":parent});

    if(founded){
      // console.log(founded,"sii")
    }
  // const sideupdate=await Sidebar.findOneAndUpdate({'caption':req.body.parent},{ $set: {'childred.$.caption': req.body.subnav}})
  const sideupdate= await Sidebar.updateOne(
    {
      $and :[{"caption": parent} ,{"row":parentrow}]
    },
    { $set: { "children": {"caption": req.body.caption,"row":subnavrow,"floor":"2","_id" :new mongoose.Types.ObjectId(),"parentId":founded._id
    // "row":req.body.subnavrow,"floor":"2" , "_id" :new mongoose.Types.ObjectId(),"parentId":"Sidebar.caption"
  } 
  } }
  );

   return res.status(201).json({
    "message":"successfuly",
    "data":sideupdate,
    "successfully process":sideupdate.modifiedCount
  })  
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//CREATE NAV CHILD 




router.post(
  "/createnavchild",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // const {}= req.body;
   const{caption,subnavrow,parent,parentrow }=req.body
// const captionbody= req.body.caption;
console.log(parentrow,"sii")

    const founded = await Sidebar.findOne({ "caption":parent});

    if(founded){
      // console.log(founded,"sii")
    }
  // const sideupdate=await Sidebar.findOneAndUpdate({'caption':req.body.parent},{ $set: {'childred.$.caption': req.body.subnav}})
  const sideupdate= await Sidebar.updateOne(
    {
      $and :[{"caption": parent} ,{"row":parentrow}]
    },
    { $push: { "children": {"caption": req.body.caption,"row":subnavrow,"floor":"2","_id" :new mongoose.Types.ObjectId(),"parentId":founded._id
    // "row":req.body.subnavrow,"floor":"2" , "_id" :new mongoose.Types.ObjectId(),"parentId":"Sidebar.caption"
  } 
  } }
  );

   return res.status(201).json({
    "message":"successfuly",
    "data":sideupdate,
    "successfully process":sideupdate.modifiedCount
  })  
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);



// DELETE NAV CHILD 


router.post(
  "/deletenavchild",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // const {}= req.body;
   const{caption,subnavrow,parent,parentrow }=req.body
// const captionbody= req.body.caption;
console.log(parentrow,"sii")

    const founded = await Sidebar.findOne({ "caption":parent});

    if(founded){
      // console.log(founded,"sii")
    }
  // const sideupdate=await Sidebar.findOneAndUpdate({'caption':req.body.parent},{ $set: {'childred.$.caption': req.body.subnav}})
  const sideupdate= await Sidebar.updateOne(
    {
      $and :[{"caption": parent} ,{"row":parentrow}]
    },
    { $remove: { "children": {"caption": req.body.caption,"row":subnavrow,"floor":"2"
    // "row":req.body.subnavrow,"floor":"2" , "_id" :new mongoose.Types.ObjectId(),"parentId":"Sidebar.caption"
  } 
  } }
  );

   return res.status(201).json({
    "message":"successfuly",
    "data":sideupdate,
    "successfully process":sideupdate.modifiedCount
  })  
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);



// router.get(
//   "/getsidebar",
//   catchAsyncErrors(async (req, res, next) => {
   
//     try {
//     const sidebar =await Sidebar.find({});
//       console.log("this is sidebar iiiiiii" ,sidebar)
   
//    return res.status(201).json({
//       "message":"successfuly",
//       sidebar:sidebar
//     })    
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );
router.get(
  "/getsidebar",
  catchAsyncErrors(async (req, res, next) => {
   
    try {
    const sidebar =await Sidebar.find({}).sort({ row: 1 });
      console.log("this is sidebar iiiiiii" ,sidebar)
   
   return res.status(201).json({
      "message":"successfuly",
      sidebar:sidebar
    })    
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
router.post(
  "/getsinglesidebar",
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("req.body" ,req.body)
      const caption = req.body.data

    const sidebar =await Sidebar.findOne({caption});
    //   console.log("this is sidebar iiiiiii" ,sidebar)
   
   return res.status(201).json({
      "message":"successfuly",
      sidebar:sidebar
    })    
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// Device.find(function(err, devices) {
//   devices.forEach(function(device) {
//     device.cid = '';
//     device.save();
//   });
// });

router.get(
  "/getsidebaroo",
  catchAsyncErrors(async (req, res, next) => {
   
    try {
      let oo= 4;

      const side = await Sidebar.find({}).select(['-caption',"-childred","-floor","-_id","-__v"]).where("row").gt(4).sort({ row: 1 })
      
      let b=0;
      for(b;b<side.length;b++){
        console.log(side[b].row)
        console.log(typeof(side[b].row.toString()))
        const ioio=side[b].row;
        const ss = await Sidebar.findOneAndUpdate( {row : ioio},{
              row: parseInt(side[b].row)+1,
           });
           }
           return res.status(201).json({
            "message":"successfuly",
            sidebar:side,
            // sideba2r:side2
      
          })    
          } catch (error) {
            return next(new ErrorHandler(error.message, 500));
          }
        })
      );
// let oo= 4;

//       let side = await Sidebar.findByIdAndUpdate({}).select(['-caption',"-childred","-floor","-_id","-__v"]).where("row").gt(4).sort({ row: 1 }).then((res)=>{
//         res.map((i)=>{
//           const p  =  parseInt(i.row)
//         let w= p+1;
//         console.log("this is "+i.row)
//         console.log(w)
//           // console.log(p)
//           // return  p
//         })
//         // side.updateMany(row,{side});

//       })
//       console.log(side)

      // let side = await Sidebar.find() .select(['-caption',"-childred","-floor","-_id","-__v"]).sort({ row: 1 })
      // console.log(side)
      // let side2 = await Sidebar.find() .select(['-caption',"-childred","-floor","-row","-__v"]).sort({ row: 1 })
      // let numberInput=4;
      // side.map((e)=>{
      // if(numberInput<e.row){
      //   console.log(e.row)
      //   // const user = await User.find({ row: e.row })
      //   // .where("_id")
      //   // .equals(resetCode);      }


      // }})

    //  const an= await Sidebar.find()
    //   .then((result)=>{
    //     (result.map((e)=>{
    //       // console.log("start",e.row)
    //       const dd= parseInt(e.row) + 1;
    //       const id = e._id;
    //       e.row=+1

          // console.log(id)
          // Sidebar.findByIdAndUpdate("6509342cee427043a7c120ad",{row:'12'})
        // console.log(dd)
   
          // const finds= Sidebar.findById(myid)
        //  console.log(finds)
        //  const ii= Sidebar.findByIdAndUpdate("6509342cee427043a7c120ad",{row:11})
        //  console.log(ii)
      //   }))

      // })
    
    //   .catch((error)=>{
    //     console.log(error)
    // })

    
    
    // console.log(object)
      // side.updateMany(row,{side});
      
    
    // console.log(side)
    // console.log(side.length)

         
  //   const user = await User.findByIdAndUpdate( id ,{
  //     name: search,
  //      exprience: exprience,
  //      genre: selecetedHobby,
  //      age: age,
  //  });




// // update user info
// router.put(
//   "/update-user-info",
//   isAuthenticated,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { email, password, phoneNumber, name } = req.body;

//       const user = await User.findOne({ email }).select("+password");

//       if (!user) {
//         return next(new ErrorHandler("User not found", 400));
//       }

//       const isPasswordValid = await user.comparePassword(password);

//       if (!isPasswordValid) {
//         return next(
//           new ErrorHandler("Please provide the correct information", 400)
//         );
//       }

//       user.name = name;
//       user.email = email;
//       user.phoneNumber = phoneNumber;

//       await user.save();

//       res.status(201).json({
//         success: true,
//         user,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // update user avatar
// router.put(
//   "/update-avatar",
//   isAuthenticated,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       let existsUser = await User.findById(req.user.id);
//       if (req.body.avatar !== "") {
//         const imageId = existsUser.avatar.public_id;

//         await cloudinary.v2.uploader.destroy(imageId);

//         const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
//           folder: "avatars",
//           width: 150,
//         });

//         existsUser.avatar = {
//           public_id: myCloud.public_id,
//           url: myCloud.secure_url,
//         };
//       }

//       await existsUser.save();

//       res.status(200).json({
//         success: true,
//         user: existsUser,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // update user addresses
// router.put(
//   "/update-user-addresses",
//   isAuthenticated,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const user = await User.findById(req.user.id);

//       const sameTypeAddress = user.addresses.find(
//         (address) => address.addressType === req.body.addressType
//       );
//       if (sameTypeAddress) {
//         return next(
//           new ErrorHandler(`${req.body.addressType} address already exists`)
//         );
//       }

//       const existsAddress = user.addresses.find(
//         (address) => address._id === req.body._id
//       );

//       if (existsAddress) {
//         Object.assign(existsAddress, req.body);
//       } else {
//         // add the new address to the array
//         user.addresses.push(req.body);
//       }

//       await user.save();

//       res.status(200).json({
//         success: true,
//         user,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // delete user address
// router.delete(
//   "/delete-user-address/:id",
//   isAuthenticated,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const userId = req.user._id;
//       const addressId = req.params.id;

//       await User.updateOne(
//         {
//           _id: userId,
//         },
//         { $pull: { addresses: { _id: addressId } } }
//       );

//       const user = await User.findById(userId);

//       res.status(200).json({ success: true, user });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// update user password
// router.put(
//   "/update-user-password",
//   isAuthenticated,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const user = await User.findById(req.user.id).select("+password");

//       const isPasswordMatched = await user.comparePassword(
//         req.body.oldPassword
//       );

//       if (!isPasswordMatched) {
//         return next(new ErrorHandler("Old password is incorrect!", 400));
//       }

//       if (req.body.newPassword !== req.body.confirmPassword) {
//         return next(
//           new ErrorHandler("Password doesn't matched with each other!", 400)
//         );
//       }
//       user.password = req.body.newPassword;

//       await user.save();

//       res.status(200).json({
//         success: true,
//         message: "Password updated successfully!",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // find user infoormation with the userId
// router.get(
//   "/user-info/:id",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const user = await User.findById(req.params.id);

//       res.status(201).json({
//         success: true,
//         user,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // all users --- for admin
// router.get(
//   "/admin-all-users",
//   isAuthenticated,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const users = await User.find().sort({
//         createdAt: -1,
//       });
//       res.status(201).json({
//         success: true,
//         users,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // delete users --- admin
// router.delete(
//   "/delete-user/:id",
//   isAuthenticated,

//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const user = await User.findById(req.params.id);

//       if (!user) {
//         return next(
//           new ErrorHandler("User is not available with this id", 400)
//         );
//       }

//       const imageId = user.avatar.public_id;

//       await cloudinary.v2.uploader.destroy(imageId);

//       await User.findByIdAndDelete(req.params.id);

//       res.status(201).json({
//         success: true,
//         message: "User deleted successfully!",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

module.exports = router;
