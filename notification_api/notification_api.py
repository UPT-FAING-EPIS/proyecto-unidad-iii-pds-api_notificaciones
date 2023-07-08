from flask import Flask, jsonify, request
from notifications.factories import NotificationFactory

app = Flask(__name__)

@app.route('/api/notificaciones/enviar', methods=['POST'])
def enviar_notificacion():
    datos_notificacion = request.get_json()
    notification_type = datos_notificacion.get('tipo')
    notification = NotificationFactory.create_notification(notification_type)
    notification.send_notification(datos_notificacion)
    return jsonify({'mensaje': 'Notificación enviada correctamente'})

if __name__ == '__main__':
    app.run()