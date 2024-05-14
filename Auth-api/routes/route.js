import express from 'express'
import {signup, signin, verifyOTP} from '../controllers/auth.js'
const router = express.Router()


router.post("/signup", signup)
router.post("/signin", signin)
router.post("/verifyOTP", verifyOTP)


router.get("/", (req, res) => {
    res.json({
        message: "HELLO WORLD"
    })
})

export default router