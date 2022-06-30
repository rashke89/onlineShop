const Users = require("../models/userModel");
const nodemailer = require("nodemailer");

//LOGIN
const loginUser=(req,res)=>{
    const reqBody = req.body;

    Users.findOne(reqBody, (err, data) => {
        if (err) {
            const errorMsg = `Error on getting user from DB: ${err}`;
            console.log(errorMsg);
            res.send(errorMsg);
            return;
        }


        res.send(data || 'User not found.');

    });
}
//LOGIN END


//REGISTER
const registerUser=async (req, res) => {
    const reqBody = req.body;
    console.log('reg user data:', reqBody);

    Users.findOne(reqBody,  async (err, data) => {
        if (err) {
            const errorMsg = `Error on register user: ${err}`;
            console.log(errorMsg);
            res.send(errorMsg);
            return;
        }

        if (data)
            res.send(`User already exist: ${data.username}`);
        else {
            const newUser = new Users(reqBody);
            const saveNewUser = await newUser.save();


            //NODEMAILER
            let testAccount = await nodemailer.createTestAccount();
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <office@onlineShop.com>', // sender address
                to: reqBody.email,// list of receivers
                subject: "Activate Account OnlineShop", // Subject line
                text: '', // plain text body
                html:`<h1>Activate Account</h1>
                       <h4>Dear, ${reqBody.username}</h4>
                       <p>Please click on link bellow to activate your account</p>
                        <a href="http://localhost:3000/user-activate/${saveNewUser._id.toString()}">Activate link</a>"` // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

            //NODEMAILER END

            res.send(saveNewUser || 'User not registered.');
        }
    });

}

    //COMPLETE REGISTRATION

const completeUserRegistration=(req,res)=>{
    const userId=req.body.id;
    console.log("Frontend send ID",req.body);
    Users.updateOne({_id:userId}, {isActive:true}, (error, result)=>{
        if(error){
            console.log(error);
            res.send("User not activated")
        } else{
            res.send(result)
        }
    })}

    //REGISTER END

    //DELETE USER
const deleteUser=(req, res)=>{
    const params = req.params.email
    Users.deleteOne({email:params},null,(error)=>{
        if (error) throw error
        res.send("User deleted")
    })
}

//GET ALL USERS
const getAllUsers=(req, res)=>{
    Users.find((error, result)=>{
        if(error) throw error;
        res.send(result)
    })
}

//GET USER BY USERNAME
const getUserByUsername=(req, res)=>{
    const param = req.params.username
    Users.find({"username":param},(error, result)=>{
        if(error) throw error;
        res.send(result)
    })
}

//UPDATE USER BY USERNAME
const updateUserByUsername=(req, res)=>{
    const param = req.params.username
    const query = req.query

    Users.updateOne({"username":param},{email:query.email,isAdmin:query.admin},null,(error, result)=>{
        if(error) throw error
        res.send(result)
    })
}

module.exports={
    loginUser,
    registerUser,
    completeUserRegistration,
    deleteUser,
    getAllUsers,
    getUserByUsername,
    updateUserByUsername
}