// script.js
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// The Knowledge Base
const knowledge = {
    "hello": "Hi there! Ready to learn about AI today?",
    "ai": "Artificial Intelligence (AI) is the simulation of human intelligence by machines, especially computer systems.",
    "how do you work": "I use Natural Language Processing (NLP) to scan your text for keywords and match them to my database!",
    "nlp": "NLP stands for Natural Language Processing. It helps computers understand, interpret, and generate human language.",
    "chemistry": "Chemistry is the study of matter and the changes it undergoes. It's often called the central science!",
    "atom": "An atom is the basic unit of a chemical element. It consists of protons, neutrons, and electrons.",
    "html": "HTML (HyperText Markup Language) is the standard language for creating web pages.",
    "javascript": "JavaScript is a programming language that allows you to implement complex features on web pages, like this chat!",
    "future": "The future of AI is about collaboration between humans and machines to solve complex problems.",
    "help": "You can ask me about AI definitions, Chemistry basics, or how this website was built."
};

function getResponse(input) {
    const text = input.toLowerCase();
    
    // Check for keyword matches
    for (let key in knowledge) {
        if (text.includes(key)) {
            return knowledge[key];
        }
    }
    
    // If no keyword matches, provide an "educational fallback"
    return "That's an interesting point. While I don't have a specific answer for that yet, remember that AI works by processing data patterns. Try asking me about 'NLP' or 'Chemistry'!";
}

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}

function handleSend() {
    const message = userInput.value.trim();
    if (message === "") return;

    appendMessage(message, 'user');
    userInput.value = '';

    // Simulate "thinking" delay
    setTimeout(() => {
        const response = getResponse(message);
        appendMessage(response, 'bot');
    }, 600);
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});
