const app = require('./app');
app.listen(app.get('port'), () => {
    console.log(`Servidor activo en el puerto: ${app.get('port')}`)
});