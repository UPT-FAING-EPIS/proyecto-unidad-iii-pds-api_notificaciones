from notifications.strategies import EmailNotificationStrategy

class NotificationFactory:
    @staticmethod
    def create_notification(notification_type):
        if notification_type == 'email':
            return EmailNotificationStrategy()
        else:
            raise ValueError("Tipo de estrategia de notificación inválido")