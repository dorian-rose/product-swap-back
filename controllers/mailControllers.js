const nodemailer = require('nodemailer');

const sendMail = async (req, res) => {
    console.log(req.body)
    const { sellerEmail, title, userEmail, includeSender, message } = req.body
    let senderCopy;
    if (includeSender) {
        senderCopy = userEmail
    } else {
        senderCopy = ""
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, //true para el puerto 465, false para otros puertos
        auth: {
            user: 'doriantestaz23@gmail.com',//change 
            pass: 'shemytqdbpcthptf' //password generado con password application de Google
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    var mailOptions = {
        from: 'Product Swap <doriantestaz23@gmail.com>',
        to: [sellerEmail, senderCopy],
        subject: title,
        text: `${sellerEmail}, a user is interested in your productp, ${title}`,

        html: `<div><br /><p>Gumtree</p><p>Exchange your pre-loved goods</p><p>contact@gumtree.com</p><br/><hr size="10" width="300%" align="left" color="grey"></hr>  <br/>  </div><div><div><p align="justify">Dear ${sellerEmail}</p><br /><p align="justify">You have received the following message from user ${userEmail}, who is interested in your listing '${title}'. You can contact them at the details provided to organise the exchange.</p><br /><br /> <p>"${message}"</p><br /><br /> <p>Thank you for trusting our product exchange service! You are helping keep our planet sustainable! </p><br/><p>Kind regards</p><br/><p>the team at Gumtree</p></div></div>`,
    };
    await transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email enviado.");
            res.status(200).json({
                ok: true,
                msg: "Message successfully sent"
            });
        }
    })

}

module.exports = { sendMail };