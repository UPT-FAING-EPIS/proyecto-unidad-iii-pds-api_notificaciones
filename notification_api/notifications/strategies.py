import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class NotificationStrategy:
    def send_notification(self, destinatario, asunto, mensaje):
        pass

class EmailNotificationStrategy(NotificationStrategy):
    def send_notification(self, destinatario, asunto, mensaje):
        # Configura los detalles de conexión SMTP
        smtp_host = 'tu_smtp_host'
        smtp_port = 587
        smtp_username = 'tu_usuario'
        smtp_password = 'tu_contraseña'

        # Crea el objeto de mensaje MIME
        message = MIMEMultipart()
        message['From'] = smtp_username
        message['To'] = destinatario
        message['Subject'] = asunto

        # Agrega el cuerpo del mensaje
        message.attach(MIMEText(mensaje, 'plain'))

        # Establece la conexión SMTP y envía el correo electrónico
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.send_message(message)

        print('Notificación enviada por correo electrónico')