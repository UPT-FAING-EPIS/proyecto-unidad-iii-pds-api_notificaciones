import pika

# Establece los parámetros de conexión a RabbitMQ
host = 'localhost'
port = 5672
username = 'guest'
password = 'guest'

# Establece la conexión a RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters(
    host=host,
    port=port,
    credentials=pika.PlainCredentials(username, password)
))

# Crea un canal de comunicación con RabbitMQ
channel = connection.channel()

# Declara una cola en RabbitMQ
queue_name = 'notificaciones'
channel.queue_declare(queue=queue_name)

# Cierra la conexión con RabbitMQ
connection.close()