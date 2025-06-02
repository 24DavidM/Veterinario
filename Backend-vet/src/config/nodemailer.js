import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // porque es puerto 465 (SSL)
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const sendMailToRegister = (userMail, token) => {
    let mailOptions = {
        from: process.env.MAIL_USER,
        to: userMail,
        subject: "SmartVET - 🐶 😺",
        html: `
            <p>Hola, haz clic 
            <a href="${process.env.URL_FRONTEND}confirm/${token}">aquí</a> 
            para confirmar tu cuenta.</p>
            <p>El equipo de SmartVET te da la más cordial bienvenida.</p>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("❌ Error al enviar el correo:", error);
        } else {
            console.log("📨 Correo enviado satisfactoriamente:", info.messageId);
        }
    });
};

export default sendMailToRegister;
