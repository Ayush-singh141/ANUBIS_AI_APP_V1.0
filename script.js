const submitButton=document.getElementById('submit');
const outputElement=document.getElementById('output');
const inputElement=document.querySelector('.userInput');
const buttonElement=document.querySelector('button');
const historyElement=document.querySelector('.history');
const Title=document.createElement('h1');
Title.textContent="ANUBIS";
function appendh1(){
    document.getElementById('output').append(Title);
}
appendh1();
function changeInput(value){
    const inputElement=document.querySelector('.userInput');
    inputElement.value=value;
}
    import { GoogleGenerativeAI } from "@google/generative-ai";
    const genAI = new GoogleGenerativeAI("API_KEY");
    async function run(){
        // Make sure to include these imports:
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = inputElement.value;
        const result = await model.generateContent(prompt);
        const userQuery=document.createElement('p');
        userQuery.setAttribute("class","user-message");
        userQuery.textContent=inputElement.value;
        outputElement.append(userQuery);
        const messageElement=document.createElement('p');
        messageElement.setAttribute("class","chat-bot-message");
        messageElement.innerHTML=result.response.text().replaceAll("\n","<br>").replaceAll("*","").replaceAll("#","").trim();
        outputElement.append(messageElement);
        Title.remove();
        outputElement.scrollTop = outputElement.scrollHeight;
        if(result.response.text()){
            const pElement=document.createElement('p');
            pElement.textContent=inputElement.value;
            pElement.addEventListener('click',()=>changeInput(pElement.textContent))
            historyElement.append(pElement);
            historyElement.scrollTop = historyElement.scrollHeight;
            inputElement.value='';
        }
        console.log(result.response.text());
        
    }
submitButton.addEventListener("click", run);
function clearInput(){
    inputElement.value='';
    outputElement.textContent='';
    document.getElementById('output').append(Title);
}
buttonElement.addEventListener("click", clearInput);



function toggle_sidebar(){
    const sideBar=document.querySelector(".side-bar");
    sideBar.classList.toggle("hidden");
    sideBar.classList.toggle("show");
    
    const newchatBtn=document.querySelector(".new-chat");
    newchatBtn.classList.toggle("hide-btn");
    newchatBtn.classList.toggle("show-btn");
    
    const navElement=document.querySelector(".nav");
    navElement.classList.toggle("hide-nav");
    navElement.classList.toggle("show-nav");
    const historyElement=document.querySelector(".history");
    historyElement.classList.toggle("hide-history");
    historyElement.classList.toggle("show-history");
}
const togglebtn=document.querySelector(".hamburger");
togglebtn.addEventListener("click",toggle_sidebar);
