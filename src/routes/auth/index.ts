import { Router } from "express"
import passport from 'passport'
const router = Router()

router.get("/discord", passport.authenticate('discord'), (req, res) => {
    console.log(req)
    res.status(200)
})


router.get("/discord/redirect", passport.authenticate('discord'), (req, res) => {
    console.log(req)
    const URL = "https://pochi-dashboard.vercel.app/"
    res.redirect(URL)
})


router.get("/status", (req, res) => {
    if(req.user) {
        res.send({user: req.user})
    }else {
        res.send({msg: 'Unauthorized'}).status(401)
    }
})

export default router;