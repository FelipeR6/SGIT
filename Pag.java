document.getElementById('loan-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const device = document.getElementById('device').value;
    const date = document.getElementById('date').value;

    const message = `Gracias, ${name}. Has solicitado un ${device}. Te contactaremos a ${email} para confirmar la disponibilidad para la fecha ${date}.`;
    document.getElementById('response-message').innerText = message;
});
