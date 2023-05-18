var chatBox = document.getElementById('chaBox');
var chatIn = document.getElementById('chaIn');
var chatButton = document.getElementById('chaBut');

var conversation = [];
var context = {};

var newMessage;
var botMessage;
var userMessage;

var coco = [];
var ar1 = 0;

var responses = {
    'Hola': 'Hola',
    'hola': 'Hola',
    '¿Como estas?': 'Vivo ,y tu?',
    'Como estas?': 'Vivo ,y tu?',
    'Bien': 'Muy bien',
    'Gracias': '...',
    coco
};

// Función para agregar mensajes al chat
function addMessage(message, sender) {
    newMessage = document.createElement('div');
    newMessage.textContent = message;

    // Agregar la clase del remitente al mensaje
    if (sender === 'user') {
        newMessage.className = 'chat-message user';
    } else if (sender === 'bot') {
        newMessage.className = 'chat-message bot';
    }

    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}


// El evento click en el botón de enviar
function mensajes() {
    userMessage = chatIn.value;
    if (userMessage.trim() !== '') {
        addMessage("Wail: " + userMessage, 'user'); // Mostrar el mensaje

        // Guardar el mensaje del usuario
        conversation.push({
            message: userMessage,
            sender: 'user'
        });

        botMessage = getBotResponse(userMessage); // Obtener la respuesta del bot
        addMessage("Mark: " + botMessage, 'bot'); // Mostrar la respuesta del bot en el chat

        // Guardar la respuesta del bot en la conversación
        conversation.push({
            message: botMessage,
            sender: 'bot'
        });

        chatIn.value = '';
    }
}

// Evento click al botón de enviar
chatButton.addEventListener('click', mensajes);

// Tecla Enter
chatIn.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        mensajes();
    }
});


// Función para la respuesta del bot
function getBotResponse(userMessage) {
    if (ar1 === 1) {

        // Ver si la pregunta está en respuestas predefinidas
        if (userMessage in responses) {
            botMessage = responses[userMessage]; // Obten respuesta predefinida
            conversationHistory.push({
                userMessage: userMessage,
                botMessage: botMessage
            });
            conversationContext[userMessage] = {}; // Reiniciar el contexto de la conversación
            return botMessage;
        } else {
            coco.push(userMessage);
            
            botMessage = '¿Que deberia de responder?';
            
            ar1++;
            return botMessage;
        }
    } else {

        // Ver si la pregunta está en respuestas predefinidas
        if (userMessage in responses) {

            botMessage = responses[userMessage]; // Obten respuesta predefinida
            conversationHistory.push({
                userMessage: userMessage,
                botMessage: botMessage
            });

            return botMessage;

        } else {

            coco.push(userMessage);
            
            botMessage = '¿Que deberia de responder?';

            return botMessage;

        }
        
        alert('algo');
    }
}
