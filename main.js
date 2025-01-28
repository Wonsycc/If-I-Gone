const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;

// Configuración de nodemailer para enviar correos
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

let timeoutId;

// Función para enviar el correo
function enviarCorreo() {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECIPIENT,
        subject: process.env.EMAIL_SUBJECT,
        text: process.env.EMAIL_MESSAGE
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado:', info.response);
            
        }
    });
    reiniciarTemporizador();
}

// Función para reiniciar el temporizador
function reiniciarTemporizador() {
    if (timeoutId) {
        clearTimeout(timeoutId); // Limpia el temporizador anterior si existe
    }
    const intervalo = parseInt(process.env.INTERVALO_MS, 10)
    timeoutId = setTimeout(enviarCorreo, intervalo);
    console.log(`Temporizador reiniciado`);
}

// Iniciar el temporizador por primera vez
reiniciarTemporizador();

// Ruta para recibir la petición
app.get('/ok', (req, res) => {
    reiniciarTemporizador(); 
    res.send('Petición recibida. El contador ha sido reiniciado.');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});