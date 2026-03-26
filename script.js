// 1. Updated Conversation Data Structure
const chatData = {
    "main_menu": {
        message: "Hello! I am TalkBot. I can help you learn how to use ChatGPT better. Please choose a topic below to begin.",
        options: [
            { text: "What is ChatGPT?", next: "what_is_ai" },
            { text: "How to ask better prompts?", next: "better_prompts" },
            { text: "Using AI for study", next: "ai_study" },
            { text: "Responsible AI use", next: "responsible_use" }
        ]
    },
    
    // Module 1: Intro
    "what_is_ai": {
        message: "ChatGPT is an AI tool that can understand and generate human-like text. It's like having a very well-read assistant!",
        options: [
            { text: "How does it work?", next: "how_it_works" },
            { text: "What can it help me do?", next: "what_can_it_do" },
            { text: "Back to Main Menu", next: "main_menu" }
        ]
    },
    "how_it_works": {
        message: "It works by predicting the next word in a sentence based on patterns it learned from millions of books and websites.",
        options: [{ text: "Back to Main Menu", next: "main_menu" }]
    },

    // Module 2: Prompts
    "better_prompts": {
        message: "To get better answers, be clear and specific. Instead of 'Tell me about science', try 'Explain photosynthesis for a 10th grade student'.",
        options: [
            { text: "Show me a good example", next: "good_example" },
            { text: "Show me a bad example", next: "bad_example" },
            { text: "Back to Main Menu", next: "main_menu" }
        ]
    },
    "good_example": {
        message: "Good: 'Write a 3-paragraph summary of the French Revolution focusing on its causes for a history project.'",
        options: [{ text: "Why is this good?", next: "why_good" }, { text: "Back", next: "better_prompts" }]
    },
    "why_good": {
        message: "It includes a Role (History project), a Task (Summary), and Constraints (3 paragraphs, focus on causes).",
        options: [{ text: "Back to Main Menu", next: "main_menu" }]
    },

    // *** ADDED: Module 3: AI for Study ***
    "ai_study": {
        message: "AI can be a great study partner! It can explain complex topics, help you practice languages, or brainstorm ideas for essays.",
        options: [
            { text: "How to explain difficult topics?", next: "explain_topics" },
            { text: "How to help with writing?", next: "help_writing" },
            { text: "Back to Main Menu", next: "main_menu" }
        ]
    },
    "explain_topics": {
        message: "Try asking: 'Explain the concept of supply and demand using a lemonade stand as an example.' This makes abstract ideas easier to visualize!",
        options: [{ text: "Back to Main Menu", next: "main_menu" }]
    },
    "help_writing": {
        message: "Don't ask AI to write it for you. Instead, ask: 'Can you give me an outline for an essay about climate change?' or 'Check my grammar in this paragraph.'",
        options: [{ text: "Back to Main Menu", next: "main_menu" }]
    },

    // Module 4: Responsibility
    "responsible_use": {
        message: "AI can sometimes make mistakes (hallucinate). You should always double-check facts and never share private information.",
        options: [
            { text: "Why check answers?", next: "check_answers" },
            { text: "Privacy tips", next: "privacy_tips" },
            { text: "Back to Main Menu", next: "main_menu" }
        ]
    },
    "check_answers": {
        message: "AI doesn't 'know' facts; it knows patterns. Always use a textbook or a trusted website to verify dates, math, and names.",
        options: [{ text: "Back to Main Menu", next: "main_menu" }]
    }
};

// 2. Navigation & Rendering Logic (No changes here)
function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function startLearning() {
    showSection('chat');
    renderStep("main_menu");
}

function renderStep(stepId) {
    const step = chatData[stepId];
    if (!step) return; // Safety check

    const display = document.getElementById('chatDisplay');
    const optionsArea = document.getElementById('optionsArea');

    // Add Bot Message
    const botMsg = document.createElement('div');
    botMsg.className = "msg bot";
    botMsg.textContent = step.message;
    display.appendChild(botMsg);

    // Clear and Add New Options
    optionsArea.innerHTML = "";
    step.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "choice-btn";
        btn.textContent = opt.text;
        btn.onclick = () => {
            addUserMessage(opt.text);
            setTimeout(() => renderStep(opt.next), 400);
        };
        optionsArea.appendChild(btn);
    });

    // Auto-scroll
    display.scrollTop = display.scrollHeight;
}

function addUserMessage(text) {
    const display = document.getElementById('chatDisplay');
    const userMsg = document.createElement('div');
    userMsg.className = "msg user";
    userMsg.textContent = text;
    display.appendChild(userMsg);
    display.scrollTop = display.scrollHeight;
}

function resetChat() {
    document.getElementById('chatDisplay').innerHTML = "";
    renderStep("main_menu");
}
