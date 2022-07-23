const express = require('express');
const routes = express.Router();
const Subscribe = require("../models/subscribeModel");
const Mailer = require("../services/mailService")

routes.put('/addToList', async (req, res) => {
    const reqBody = req.body
    Subscribe.findOne(reqBody, async (error, result) => {
        if (error) {
            const errMsg = "Error when subscribe, " + error
            res.send(errMsg)
            return
        }
        if (result) {
            res.send("You are already subscribed with this Е-mail: " + result.email)
        } else {
            let newSubscribe = new Subscribe(reqBody)
            let addSubscribe = await newSubscribe.save()
            let mailInfo = new Mailer({
                    recipient: reqBody.email,
                    subject: "Subscribe to E-shop",
                    htmlString: `
                        <h2>Thanks for subscribe</h2>
                        <p>If you like to remove from subscribe list click on next link:</p>
                        <a href="http://localhost:3000/unsubscribe/${addSubscribe._id.toString()}">Remove form subscribe list</a>
                        `
                }
            )
            mailInfo.sendMailToRecipient()
            res.send(addSubscribe ? "You are now subscribed!" : "You are not subscribed, something went wrong!")
        }
    })
})

routes.post('/unsubscribe', (req, res) => {
    const subscribeId = req.body.subscribeId
    Subscribe.deleteOne({_id: subscribeId}, (error) => {
        if (error) {
            res.send({isRemove: false, msg: error})
            return
        }
        res.send({isRemove: true, msg: "You are now remove from subscribe list and don`t receive news on your email."})
    })
})


routes.get("/getAll", (req, res) => {
    Subscribe.find((error, result) => {
        if (error) {
            res.send(error)
            return
        }
        res.send(result)
    })
})

module.exports = routes