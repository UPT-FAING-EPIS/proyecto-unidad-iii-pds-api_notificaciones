import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // Servidor SMTP de Outlook
  port: 587, // Puerto SMTP de Outlook
  secure: false, // Usar conexión segura (TLS)
  auth: {
    user: email, // Tu dirección de correo electrónico de Outlook
    pass: pass, // Tu contraseña de correo electrónico de Outlook
  },
});

// Función para enviar el correo
export const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: email, // Tu dirección de correo electrónico de Outlook
    to: to, // Dirección de correo electrónico del destinatario ingresada por el usuario
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      // Aquí puedes manejar el error de envío del correo
    } else {
      console.log("Correo enviado:", info.response);
      // Aquí puedes manejar el éxito del envío del correo
    }
  });
};