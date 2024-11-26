let btn = document.querySelector("#btn");
let content = document.querySelector("#clickbtn");
let voice = document.querySelector("#voice"); 

function Speek(text) {
    let text_Speek = new SpeechSynthesisUtterance(text);
    text_Speek.rate = 1;
    text_Speek.pitch = 1;
    text_Speek.volume = 1;
    text_Speek.lang = "en-GB"; // hi-GB
    window.speechSynthesis.speak(text_Speek);
}

let name = prompt("Type your name, please:") || "User";
function showAlertWithInstructions() {
    alert("You can ask me questions like:\n\n" +
        "1. 'Hello' or 'Hi'\n" +
        "2. 'What time is it?'\n" +
        "3. 'Tell me today's date'\n" +
        "4. 'Who are you?'\n" +
        "5. 'Open YouTube' or 'Open Instagram'\n" +
        "6. Math questions like '2+2' or '10*5'\n\n" +
        "Feel free to try other queries! 😊😊😊");
}
showAlertWithInstructions();


function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        Speek("Good Morning, " + name);
    } else if (hours >= 12 && hours < 17) {
        Speek("Good Afternoon, " + name);
    } else {
        Speek("Good Evening, " + name);
    }
}


let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    let Recognition = new SpeechRecognition();
    Recognition.lang = "en-GB";

    Recognition.onresult = (event) => {
        let curridx = event.resultIndex;
        let transcript = event.results[curridx][0].transcript;
        if (content) {
            content.innerHTML = transcript;
        }
        takeCommand(transcript.toLowerCase());
    };

    if (btn) {
        btn.addEventListener("click", () => {
            Recognition.start();
            btn.style.display = "none";
            voice.style.display = "block"; 
        });
    }
}

function takeCommand(message) {
    btn.style.display = "flex";
            voice.style.display = "none"; 
    if (message.includes("hello") || message.includes("hi")) {
        Speek("Hello, sir. How can I help you?");
    } else if (message.includes("who are you") || message.includes("zabu who are you") || message.includes("whats your name")) {
        Speek("My name is Zaabuu. I am your virtual assistant, created by Tabrez sir.");
    } else if (message.includes("who i am") || message.includes("about me") ) {
        Speek("You are " + name);
    } else if (message.includes("open youtube")) {
        Speek("Opening... YouTube");
        window.open("https://www.youtube.com/");
    }   else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        Speek(time);
    } else if(message.includes("date")){
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        Speek(date)
    }
    else if(message.includes("how are you")){
        Speek("i am fine what about you")
    }
    else if(message.includes("ok")){
        Speek("Thanks " + name)
    } else if(message.includes("who is created you") || message.includes("who is created" ) || message.includes("created")){
        Speek("tabrez is a 19-year-old computer science student, aspiring to become a Java Fullstack Developer. He has strong interests in programming, particularly in data structures and algorithms, frontend development, and IT consulting. Tabrez is also working on improving his English-speaking skills and learning JavaScript and React.js step by step. Besides coding, he enjoys video editing, filmmaking, and public speaking.")

    } else if(message.includes("open the instagram") || message.includes("instagram")){
        Speek("opening.... the instagram....")
        window.open('https://www.instagram.com/')
    }
    else if (message.match(/[\d+\-*/()]/)) {
        try {
            let result = eval(message.replace(/[^0-9+\-*/().]/g, "")); 
            Speek(`The result is ${result}`);
            if (content) {
                content.innerHTML = `Result: ${result}`;
            }
        } catch (error) {
            Speek("Sorry, I could not calculate that. Please try again.");
        }
    }
    else{
        Speek(`this is what i found on internet recardin ${message}`);
        window.open(`https://www.bing.com/search?pglt=299&q= ${message}`);
    }
}
wishMe();
