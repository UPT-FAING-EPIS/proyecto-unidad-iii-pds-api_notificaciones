const mongoose = require('mongoose');

const uri = 'mongodb+srv://josue:123.456.789@clientes.vuzzx0v.mongodb.net/';


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

module.exports = mongoose;