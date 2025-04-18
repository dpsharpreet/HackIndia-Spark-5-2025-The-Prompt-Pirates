// Mock data for demonstration purposes
const MOCK_RESPONSES = {
    "When is the next tech fest happening?":
        "The HackIndia tech fest is currently happening at Chitkara University (Himachal Pradesh) form October 17-18 april, 2025. It will feature coding competitions, and Hackathon. Registration are closed as of now!",

    "Where is the library located?":
        "The main library is located in Gandhi Block 2nd floor, In front of Engineering block. It's open from 9 AM to 9 PM on weekdays and 9 AM to 6 PM on weekends. You can also access the Reader's Room above the Library.",
    // added
    "What are the cafeteria hours?":
        "The main cafeteria is open from 7:30 AM to 9:30 PM daily. The food court in Block 3 operates from 9 AM to 8 PM. The coffee shop near the library is open from 8 AM to 11 PM for late-night study sessions.",
    
        "What are the Mess hours?":
        "The Mars Mess is open in Morning for Breakfast from 7:30 AM to 8:50 AM (08:00 AM to 09:30 AM on Weekends), In Afternoon for lunch from 11:45 AM to 2:00 PM (12:00 PM to 02:00 PM on Weekends), For Snacks from 04:15 PM to 05:00 PM and For Dinner 07:30 PM to 08:00 PM daily.",

    "How do I join the coding club?": // edit //
        "To join the coding club, you can register through the student portal under 'Clubs & Activities'. The coding club meets every Wednesday at 5 PM in Lab 204, Block 5. They also have a Discord server for online discussions and collaboration.",

    "When is the End-semester exam for second Semester?":
        "The end-semester exams for the second semester are scheduled from  19 may to 2 june 2025. The detailed schedule by course is available on the university portal or ChalkpadPad Pro. Make sure to check your specific program's exam timetable.",
        
    "How can I apply for hostel accommodation?":
    "You can apply for hostel accommodation through the student portal under 'Hostel Services'. Applications for the new semester open two months before classes begin.",
    
"What is the Wi-Fi password on campus?":
    "The campus Wi-Fi password is provided during orientation. You can also reset or retrieve it from the IT Helpdesk in Block 1.",

"Who do I contact for ID card replacement?":
    "For a lost or damaged ID card, visit the admin office in Block 4, Room 102. There's a small fee for replacement.",

    // New questions and responses
    "What are the sports facilities available?":
        "Chitkara University has excellent sports facilities including a cricket ground, football field, basketball courts, tennis courts, and a well-equipped gymnasium. The sports complex is located near Block 6 and is open from 6 AM to 9 PM.",

    "How do I access the university portal?":
        "You can access the university portal at portal.chitkara.edu.in. Use your student ID and password to log in. If you've forgotten your password, you can reset it through the 'Forgot Password' link on the login page.",

    "What are the medical facilities on campus?":
        "The university has a medical center located in Block 1, open 24/7 with a doctor on call. Basic first aid and medical consultation are available free of charge for all students.",

    "How do I get a bus pass?":
        "Bus passes can be obtained from the transport office in Block 1. You'll need your student ID card and a passport-sized photograph. The office is open from 9 AM to 5 PM on weekdays.",

    "What are the computer lab timings?":
        "The computer labs are open from 8 AM to 8 PM on weekdays and 9 AM to 5 PM on weekends. Special permission can be obtained for extended hours during project work.",

    "How do I report a maintenance issue?":
        "You can report maintenance issues through the university portal under 'Maintenance Request' or visit the maintenance office in Block 1. For urgent issues, call the maintenance hotline at extension 1234.",

    "What is U Campus app?":
        "U Campus is the official food ordering app for Chitkara University students. You can download it from the Play Store: https://play.google.com/store/apps/details?id=com.app.uengage.ufood. The app allows you to order food from university restaurants and cafes. For food ordering, simply open the app, go to the 'Food' section, and you can browse menus, place orders, and track your delivery status. The app is developed by uEngage and has over 50K+ downloads.",
};

// DOM elements
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const exampleContainer = document.getElementById('example-container');

// Initialize chat with welcome message
document.addEventListener('DOMContentLoaded', () => {
    addMessage(
        "Hi there! I'm CampusCopilot, your AI assistant for Chitkara University. How can I help you today?",
        'assistant'
    );

    userInput.addEventListener('input', () => {
        sendButton.disabled = !userInput.value.trim();
    });

    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});

function addMessage(text, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;

    const avatar = document.createElement('div');
    avatar.className = `message-avatar ${role}-avatar`;

    const icon = document.createElement('i');
    icon.className = role === 'user' ? 'fas fa-user' : 'fas fa-robot';
    avatar.appendChild(icon);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const textP = document.createElement('p');
    textP.className = 'message-text';
    textP.textContent = text;

    const timeP = document.createElement('p');
    timeP.className = 'message-time';
    timeP.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    contentDiv.appendChild(textP);
    contentDiv.appendChild(timeP);

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant-message';
    messageDiv.id = 'typing-indicator';

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar assistant-avatar';
    const icon = document.createElement('i');
    icon.className = 'fas fa-robot';
    avatar.appendChild(icon);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        typingDiv.appendChild(dot);
    }

    contentDiv.appendChild(typingDiv);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    userInput.value = '';
    sendButton.disabled = true;

    addTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator();
        addMessage(getMockResponse(message), 'assistant');
    }, 1000);
}

function getMockResponse(question) {
    // Convert question to lowercase for case-insensitive matching
    const lowerQuestion = question.toLowerCase();
    
    // Define keyword mappings for better matching
    const keywordMappings = {
        'tech': 'When is the next tech fest happening?',
        'fest': 'When is the next tech fest happening?',
        'hackathon': 'When is the next tech fest happening?',
        'library': 'Where is the library located?',
        'book': 'Where is the library located?',
        'study': 'Where is the library located?',
        'sport': 'What are the sports facilities available?',
        'gym': 'What are the sports facilities available?',
        'playground': 'What are the sports facilities available?',
        'portal': 'How do I access the university portal?',
        'login': 'How do I access the university portal?',
        'password': 'How do I access the university portal?',
        'medical': 'What are the medical facilities on campus?',
        'doctor': 'What are the medical facilities on campus?',
        'health': 'What are the medical facilities on campus?',
        'bus': 'How do I get a bus pass?',
        'transport': 'How do I get a bus pass?',
        'computer': 'What are the computer lab timings?',
        'lab': 'What are the computer lab timings?',
        'maintenance': 'How do I report a maintenance issue?',
        'repair': 'How do I report a maintenance issue?',
        'fix': 'How do I report a maintenance issue?',
        'cafeteria': 'What are the cafeteria hours?',
        'food': 'What are the cafeteria hours?',
        'eat': 'What are the cafeteria hours?',
        'mess': 'What are the Mess hours?',
        'dining': 'What are the Mess hours?',
        'ucampus': 'What is U Campus app?',
        'food app': 'What is U Campus app?',
        'order food': 'What is U Campus app?',
        'restaurant app': 'What is U Campus app?',
        'meal': 'What are the Mess hours?'
    };

    // Check for exact matches first
    for (const [key, value] of Object.entries(MOCK_RESPONSES)) {
        if (lowerQuestion.includes(key.toLowerCase())) {
            return value;
        }
    }

    // Check for keyword matches
    for (const [keyword, questionKey] of Object.entries(keywordMappings)) {
        if (lowerQuestion.includes(keyword)) {
            return MOCK_RESPONSES[questionKey];
        }
    }

    // If no match found, provide a helpful default response
    return "I'm still learning about Chitkara University. Here are some topics I can help you with:\n" +
           "- Tech fest and events\n" +
           "- Library and study spaces\n" +
           "- Sports facilities\n" +
           "- University portal access\n" +
           "- Medical facilities\n" +
           "- Bus pass and transportation\n" +
           "- Computer lab timings\n" +
           "- Maintenance issues\n" +
           "- Cafeteria and mess hours\n\n" +
           "Try asking about any of these topics!";
}

function setExampleQuestion(question) {
    userInput.value = question;
    sendButton.disabled = false;
    userInput.focus();
}
