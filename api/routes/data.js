import express from "express"
import Data from "../models/Data.js"
import Users  from "../models/Users.js"
import { verifyUser, verifyToken } from "../utils/verifyUser.js"
import { createError } from "../utils/createError.js"
const router = express.Router();

// get request for verified user to get data also with any query
router.get("/", verifyUser, async (req, res, next) => {
    try{
        let payload;
        if(!req.query.search){
            payload = await Data.find({})
        } else{
            let query = req.query.search;
            payload = await Data.find({$text: {$search: query}})
        }
        res.json(payload)
    }catch(err){
        next(err)
    }
})

//post request to create new Data for lost or found item.
router.post("/", verifyUser, verifyToken, async (req, res, next) => {
    try{
     const { name, location, desc = "", pictures = [""],
      found } = req.body
     if(!Array.isArray(pictures)){
        createError(404, "pictures value is not array")
     }
     const user = req.user.name
     const payload = await new Data({
            name, location, desc, pictures, found, user,
         })
    await payload.save()
     res.json(payload)
    } catch(err){
        next(err)
    }
})

//put request to update Data using id as 
router.put("/", verifyUser, async (req, res, next) => {
    try{
        const { _id, ...other } = req.body
        // here we are removing any empty values send for field.
        Object.keys(other).forEach(key => {
            if (other[key] === '') {
            delete other[key];
            }
});
        const payload = await Data.findByIdAndUpdate(_id, other, {new: true})
        res.json(payload)
    } catch(err){
        next(err)
    }
})

router.delete("/", verifyUser, verifyToken, async(req, res, next) => {
    try{
        const { _id } = req.body
        const data = await Data.findById(_id)
        if(data && data.user == req.user.name){
            await Data.findByIdAndDelete(_id)
            res.send("successfully deleted!") 
        }
        next(createError(404, "Not authorized to delete this!"))
    } catch(err){
        next(err)
    } 
})

export default router;