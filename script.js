JavaScript

const paragraphs = [
    "Success does not come from motivation alone. It comes from consistency and discipline every single day.",
    "Typing faster is a skill that improves with focused practice and patience.",
    "Web development opens opportunities to build businesses, products, and creative digital experiences.",
    "The future belongs to people who learn valuable skills and apply them consistently.",
    "Every expert was once a beginner who decided not to quit."
];

const textDisplay=
document.getElementById("text-display");
const textInput=
document.getElementById("text-input");
const timerElement=
document.getElementById("time");
const wpmElement=
document.getElementById("wpm");
const accuracyElement=
document.getElementById("accuracy");
const restartBtn=
document.getElementById("restart-btn");

let timer=60;
let interval=null;
let started=false;
let mistakes=0;
let currentText="";

function loadParagraph() {
    const randomIndex=
    Math.floor(Math.random()*
paragraphs.length);
currentText=paragraphs[randomIndex];
textDisplay.innerHTML="";
currentText.split("").forEach(char =>
    {
        const span=
        document.createElement("span");
        span.innerText=char;
        textDisplay.appendChild(span);
        });
}

function startTimer() {
    interval=setInterval(() => {
        timer--;
        timerElement.innerText=timer;

        calculateResults();

        if (timer <=0) {
            clearInterval(interval);
            textInput.disabled=true;
        }
    }, 1000);
}

function calculateResults() {
    const typedText=textInput.value;

    const words=typedText.trim().split(/\s+/).length;
    const wpm=Math.round(words/(60/
        timerElement.innerText||1));

        wpmElement.innerText=isFinite(wpm)?wpm:0;

        const accuracy=Math.max(0,
            Math.round(((typedText.length-mistakes)/typedText.length)*100)
        );

        accuracyElement.innerText=typedText.length? accuracy+"%":"100%";
}

textInput.addEventListener("input",()=>{
    const characters=
    textDisplay.querySelectorsAll("span");
    const typedCharacters=
    textInput.value.split("");

    if(!started){
        started=true;
        startTimer();
    }
    mistakes=0;
    characters.forEach((charSpan,index)=>{
        const typedChar=
        typedCharacters[index];

        if (typedChar==null){
            charSpan.classList.remove("correct","incorrect","current");

            if (index===typedCharacters.lentgh){
                charSpan.classList.add("current");
            }
        }
        else if(typedChar === charSpan.innerText){
            charSpan.classList.add("correct");

            charSpan.classList.remove("incorrect","current");
        }
        else {
            charSpan.classList.add("incorrect");
            charSpan.classList.remove("correct","current");
            mistakes++;
        }
    });
    calculateResults();
});
restartBtn.addEventListener("click",resetTest);

function resetTest(){
    clearInterval(interval);

    timer=60;
    started=false;
    mistakes=0;

    timerElement.innerText=timer;
    wpmElement.innerText=0;
    accuracyElement.innerText="100%";

    textInput.value="";
    textInput.disabled=false;

    loadParagraph();
}
loadParagraph();
