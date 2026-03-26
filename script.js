// 1. Conversation Data Structure (Kept exactly as requested)
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
    "ai_study": {
        message: "AI can help you brainstorm essay outlines or explain complex math problems step-by-step. Just remember: it's a co-pilot, not the pilot!",
        options: [{ text: "Back to Main Menu", next: "main_menu" }]
    },
    "responsible_use": {
        message: "AI can sometimes make mistakes (hallucinate). You should always double-check facts and never share private information.",
        options: [
            { text: "Why check answers?", next: "check_answers" },
            { text: "Back to Main Menu", next: "main_menu" }
        ]
    },
    "check_answers": {
        message: "AI doesn't 'know' facts; it knows patterns. Always use a textbook or a trusted website to verify dates, math, and names.",
        options: [{ text: "Back to Main Menu", next: "main_menu" }]
    }
};

// 2. Core Functions
function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
        // If entering chat, make sure it's initialized
        if (id === 'chat' && document.getElementById('chatDisplay').children.length === 0) {
            renderStep("main_menu");
        }
    }
}

function startLearning() {
    showSection('chat');
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

    // Clear Options and disable clicks momentarily to prevent double-triggering
    optionsArea.innerHTML = "";
    
    step.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "choice-btn";
        btn.textContent = opt.text;
        
        // Use an event listener for better reliability
        btn.addEventListener('click', function() {
            // Disable all buttons in the area once one is clicked
            optionsArea.querySelectorAll('button').forEach(b => b.disabled = true);
            
            addUserMessage(opt.text);
            
            // Short delay for a natural "thinking" feel
            setTimeout(() => {
                renderStep(opt.next);
            }, 500);
        });
        
        optionsArea.appendChild(btn);
    });

    // Precise Auto-scroll
    setTimeout(() => {
        display.scrollTo({
            top: display.scrollHeight,
            behavior: 'smooth'
        });
    }, 50);
}

function addUserMessage(text) {
    const display = document.getElementById('chatDisplay');
    const userMsg = document.createElement('div');
    userMsg.className = "msg user";
    userMsg.textContent = text;
    display.appendChild(userMsg);
}

function resetChat() {
    const display = document.getElementById('chatDisplay');
    display.innerHTML = "";
    renderStep("main_menu");
}

// 3. Initialize on Load
window.onload = () => {
    // This ensures that if the user refreshes on the Chat page, it still works.
    if (document.getElementById('chat').classList.contains('active')) {
        renderStep("main_menu");
    }
};
