// Navigation System
function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Chatbot Logic
function sendMessage() {
    const input = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    
    if (input.value.trim() === "") return;

    // Append User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'user-msg';
    userDiv.textContent = input.value;
    chatBox.appendChild(userDiv);

    // Generate Bot Response
    const botDiv = document.createElement('div');
    botDiv.className = 'bot-msg';
    botDiv.textContent = getBotResponse(input.value.toLowerCase());
    
    setTimeout(() => {
        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 600);

    input.value = "";
}

function getBotResponse(text) {
    if (text.includes("prompt")) {
        return "A good prompt usually includes a Role, a Task, and Constraints. Try: 'Act as a science teacher and explain gravity to a 5-year-old.'";
    } else if (text.includes("hello") || text.includes("hi")) {
        return "Hello! I'm TalkBot. Ready to learn how to communicate with AI better?";
    } else if (text.includes("responsible") || text.includes("ethic")) {
        return "Responsibility means checking facts! AI can 'hallucinate' (make things up), so always verify important information.";
    } else if (text.includes("better") || text.includes("accurate")) {
        return "To get accurate answers, give the AI examples of what you want. This is called 'Few-shot prompting'.";
    } else if (text.includes("who are you")) {
        return "I am TalkBot, an educational tool designed to help you master AI interaction.";
    } else {
        return "That's an interesting question! To get a better answer from an AI like ChatGPT, try adding more context or specific details to your request.";
    }
}

// Practice Section Feedback
function checkPractice() {
    const input = document.getElementById('practiceInput').value.toLowerCase();
    const feedback = document.getElementById('feedback');

    if (input.length > 20 && (input.includes("write") || input.includes("story"))) {
        feedback.textContent = "Great job! You added more detail. Specificity is key to AI mastery.";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "Try to be more specific. Tell the AI what kind of story, the genre, or who the characters are!";
        feedback.style.color = "red";
    }
}

// Allow "Enter" key to send message
document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});
