const express = require("express");
const router = express.Router();
const Admin = require("../models/adminModel");
const Property =require("../models/propertyModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");

router.post("/login", async (req, res) => {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhh",req.body);
  try {
    const user = await Admin.findOne({ email: req.body.email });
    console.log(user,"ppppppppppppppppppppppppppppppp");
    if (!user) {
      return res.status(200).json({
        message: "unauthorized credentials",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log("jjjjjjjjjjjjjjjjj",isMatch);
    if (!isMatch) {
      return res.status(200).json({
        message: "password is incorrect",
        success: false,
      });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{ 
        expiresIn: "1d",
      });
      res.status(200).send({
        message: "login successful ",
        Success: true,
        data: token,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }
});


router.post("/applyproperty",upload.single("image"),async(req,res)=>{

  console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkk");

  
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("lllllllllllllllllllllllllllllllllllllllllllll",result);
        const newproperty=new Property({
            name:req.body.name,
            location:req.body.location,
            price:req.body.price,
            image:result.url,
        })
        await newproperty.save()
            res.status(200).json({
                newproperty,
                success: true,
                message: "property added successfully",
        })
  } catch (error) {
    console.log(error);
    res.status(403).json({
              success:false,
              message:"error",
              error,
          
          })
  }
})

router.get("/get-all-properties",async(req,res)=>{
  try {
    const property = await Property.find({})
    res.status(200).send({
      message:"successfully fetched details",
      success:true,
      data:property,
    })
  } catch (error) {
    return res.status(401).send({
      message: "error in fetching",
      success: false,
    });
  }
})



router.delete("/delete-properties/:id",async(req,res)=>{
  try {
    const deleteData= await Property.findByIdAndDelete(req.params.id)
    res.status(200).json({
      success:true,
      message:'delete'
    })
  } catch (error) {
    console.log(error);
  }
})

router.get("/get-property-by-id/:id",async(req,res)=>{
  try {
    const updatedData= await Property.findById(req.params.id)
    res.status(200).json({
      success:true,
      message:'edit fetched',
      data:updatedData,
    })
  } catch (error) {
    console.log(error);
  }
})

router.post("/update-property/:id",async(req,res)=>{
  console.log(req.body,"999999999999999999999999999999");
  const obj=req.body;
  try {
    const updateData= await Property.findByIdAndUpdate({_id:req.params.id},{...obj})
    res.status(200).json({
      success:true,
      message:'updated'

    })
  } catch (error) {
    console.log(error);
  }
})
module.exports=router
