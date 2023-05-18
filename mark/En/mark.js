var chatBox = document.getElementById('chaBox');
var chatIn = document.getElementById('chaIn');
var chatButton = document.getElementById('chaBut');
var langButton = document.getElementById('langButton');

// Variable para realizar el seguimiento del idioma actual
var currentLanguage = 'en';

// Función para cambiar el idioma del botón y la respuesta del bot
function changeLanguage() {
    if (currentLanguage === 'es') {
        currentLanguage = 'en';
        langButton.textContent = 'Es';
    } else {
        currentLanguage = 'es';
        langButton.textContent = 'En';
    }
}

// Evento click al botón de cambio de idioma
langButton.addEventListener('click', function () {
    changeLanguage();
    conversation = []; // Reiniciar la conversación
    context = {}; // Reiniciar el contexto
    chatBox.innerHTML = ''; // Limpiar el chat
});

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

    // Respuestas en español
    var responsesES = {
        'Hello': 'Hola',
        'hello': 'Hola',
        'Hi': 'Hola',
        'hi': 'Hola',
        'How are you?': 'Vivo y tu?',
        'How are you?': 'Vivo y tu?',
        'Thanks': '...'
    };

    // Respuestas en inglés
    var responsesEN = {
        'Hello': 'Hello',
        'hello': 'Hello',
        'Hi': 'Hello',
        'hi': 'Hello',
        'How are you?': 'Alive, and you?',
        'how are you?': 'Alive, and you?',
        'How are you': 'Alive, and you?',
        'how are you': 'Alive, and you?',
        'Thanks': '...'
    };

    // Seleccionar las respuestas según el idioma actual
    var responses = currentLanguage === 'es' ? responsesES : responsesEN;

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
        var botMessage = "(No te estoy entendiendo)";
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