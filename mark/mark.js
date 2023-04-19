var chatBox = document.getElementById('chaBox');
var chatIn = document.getElementById('chaIn');
var chatButton = document.getElementById('chaBut');

// Variables para el seguimiento de la conversación
var conversation = [];
var context = {};

// Función para agregar mensajes al chat
function addMessage(message, sender) {
    var newMessage = document.createElement('div');
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

// Función para obtener la respuesta del bot
function getBotResponse(userMessage) {
    // Convertir el mensaje del usuario a minúsculas antes de compararlo
    userMessage = userMessage.toLowerCase();

    // Resto del código del bot para obtener la respuesta
    // ...
}

// El evento click en el botón de enviar
function handleButtonClick() {
    var userMessage = chatIn.value;
    if (userMessage.trim() !== '') {
        addMessage("Wail: " + userMessage, 'user'); // Mostrar el mensaje

        // Guardar el mensaje del usuario
        conversation.push({
            message: userMessage,
            sender: 'user'
        });

        var botMessage = getBotResponse(userMessage); // Obtener la respuesta del bot
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
chatButton.addEventListener('click', handleButtonClick);

// Tecla Enter
chatIn.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        handleButtonClick();
    }
});



// almacenar la información
var conversationHistory = [];
var conversationContext = {};

// Función para obtener la respuesta del bot
function getBotResponse(userMessage) {
    // Obtener el contexto de la conversación actual
    var context = conversationContext[userMessage] || {};

    // Respuestas
    var responses = {
        'Hola': 'Hola',
        '¿Cómo estas?': 'Vivo y tu?',
        'Gracias': '...'
    };

    // Verificar si la pregunta del usuario está en las respuestas predefinidas
    if (userMessage in responses) {
        var botMessage = responses[userMessage]; // Obtener la respuesta predefinida del bot
        conversationHistory.push({
            userMessage: userMessage,
            botMessage: botMessage
        }); // Almacenar la conversación 
        conversationContext[userMessage] = {}; // Reiniciar el contexto de la conversación
        return botMessage;
    } else {
        // Implementar aprendizaje continuo 
        var botMessage = '(No te esta haciendo caso)';
        conversationHistory.push({
            userMessage: userMessage,
            botMessage: botMessage
        }); // Almacenar la conversación 
        conversationContext[userMessage] = {
            awaitingUserResponse: true
        }; // Almacenar el contexto 
        return botMessage;
    }
}

