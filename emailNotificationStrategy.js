const nodemailer = require('nodemailer');

class EmailNotificationStrategy {
  sendNotification(destinatario, asunto, mensaje) {
    // Configura el transporte de nodemailer con tus credenciales y opciones
    const transporter = nodemailer.createTransport({
      service: 'Outlook',
      auth: {
        user: 'jualostaunaul@upt.pe',
        pass: 'dinoco/44/',
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: 'jualostaunaul@upt.pe',
      to: destinatario,
      subject: asunto,
      text: mensaje
    };

    // Envía el correo electrónico utilizando el transporte configurado
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo electrónico:', error);
      } else {
        console.log('Correo electrónico enviado exitosamente');
      }
    });
  }
}

module.exports = EmailNotificationStrategy;