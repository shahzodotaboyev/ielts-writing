const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessagebutton = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");

const API_KEY = "AIzaSyDFDS7hiEK87NT-GrE3CMarlDyq32otTtc";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const userData = {
  message: null,
  file: {
    data: null,
    mime_type: null,
  },
};

const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

const generateBotResponse = async () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: userData.message },
            ...(userData.file.data ? [{ inline_data: userData.file }] : []),
          ],
        },
      ],
    }),
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();

    if (!response.ok) throw new Error(data.error.message);

    const botMessageText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Kechirasiz, tushunmadim.";
    const messageContent = `${
      userData.file.data
        ? `<img src="data:${userData.file.mime_type}; base64,${userData.file}" class="attachment"/>`
        : ""
    }`;
    const incomingMessageDiv = createMessageElement(
      `<img class="bot-avatar" width="45px" height="45px" src="./img/image (1).png" alt="" />
       <div class="message-text">${botMessageText}</div>`,
      "bot-message"
    );

    const thinkingMessage = document.querySelector(".thinking");
    if (thinkingMessage) thinkingMessage.replaceWith(incomingMessageDiv);

    scrollToBottom(); // Scroll to bottom after bot responds
  } catch (error) {
    console.error(error);
  }
};

const handleOutgoingMessage = (e) => {
  e.preventDefault();

  userData.message = messageInput.value.trim();
  if (!userData.message) return;

  messageInput.value = "";
  messageInput.focus();

  const outgoingMessageDiv = createMessageElement(
    `<div class="message-text">${userData.message}</div>`,
    "user-message"
  );
  chatBody.appendChild(outgoingMessageDiv);

  scrollToBottom(); // 🔹 Foydalanuvchi xabar yozganda avtomatik skroll

  setTimeout(() => {
    const thinkingMessageDiv = createMessageElement(
      `<img class="bot-avatar" width="45px" height="45px" src="./img/image (1).png" alt="" />
       <div class="message-text">
         <div class="thinking-indicator">
           <div class="dot"></div>
           <div class="dot"></div>
           <div class="dot"></div>
         </div>
       </div>`,
      "bot-message",
      "thinking"
    );

    chatBody.appendChild(thinkingMessageDiv);
    scrollToBottom(); // 🔹 Bot javob berayotganda ham skroll pastga tushsin

    generateBotResponse();
  }, 100);
};

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && messageInput.value.trim()) {
    handleOutgoingMessage(e);
  }
});

sendMessagebutton.addEventListener("click", handleOutgoingMessage);

const scrollToBottom = () => {
  chatBody.scrollTop = chatBody.scrollHeight;
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 100);
};

const adjustForKeyboard = () => {
  setTimeout(() => {
    document.body.style.height = `${window.visualViewport.height}px`;
    scrollToBottom();
  }, 200);
};

window.visualViewport.addEventListener("resize", adjustForKeyboard);
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const base64String = e.target.result.split(",")[1];
    userData.file = {
      data: base64String,
      mime_type: file.type,
    };

    fileInput.value = "";
  };
  reader.readAsDataURL(file);
});

document
  .querySelector("#file-upload")
  .addEventListener("click", () => fileInput.click());

let chat = document.querySelector(".chat");
let tarjimon = document.querySelector(".tarjimon");
let lugat = document.querySelector(".lugat");
let grammer = document.querySelector(".grammer");
let statistika = document.querySelector(".statistika");
let chatbotPopur = document.querySelector(".chatbot-popur");
let tarjimonPage = document.querySelector(".tarjimon-page");
let lugatPage = document.querySelector(".lugat-page");
let grammerPage = document.querySelector(".grammer-page");
let statistikaPage = document.querySelector(".statistika-page");

chat.addEventListener("click", function () {
  chat.classList.add("add-bg");
  tarjimon.classList.remove("add-bg");
  lugat.classList.remove("add-bg");
  grammer.classList.remove("add-bg");
  statistika.classList.remove("add-bg");

  chatbotPopur.classList.remove("disiplay-none");
  tarjimonPage.classList.add("disiplay-none");
  lugatPage.classList.add("disiplay-none");
  grammerPage.classList.add("disiplay-none");
  statistikaPage.classList.add("disiplay-none");
});

tarjimon.addEventListener("click", function () {
  tarjimon.classList.add("add-bg");
  chat.classList.remove("add-bg");
  lugat.classList.remove("add-bg");
  grammer.classList.remove("add-bg");
  statistika.classList.remove("add-bg");

  tarjimonPage.classList.remove("disiplay-none");
  chatbotPopur.classList.add("disiplay-none");
  lugatPage.classList.add("disiplay-none");
  grammerPage.classList.add("disiplay-none");
  statistikaPage.classList.add("disiplay-none");
});

lugat.addEventListener("click", function () {
  lugat.classList.add("add-bg");
  chat.classList.remove("add-bg");
  grammer.classList.remove("add-bg");
  tarjimon.classList.remove("add-bg");
  statistika.classList.remove("add-bg");

  chatbotPopur.classList.add("disiplay-none");
  tarjimonPage.classList.add("disiplay-none");

  lugatPage.classList.remove("disiplay-none");
  grammerPage.classList.add("disiplay-none");
  statistikaPage.classList.add("disiplay-none");
});

grammer.addEventListener("click", function () {
  grammer.classList.add("add-bg");
  chat.classList.remove("add-bg");
  tarjimon.classList.remove("add-bg");
  lugat.classList.remove("add-bg");
  statistika.classList.remove("add-bg");

  chatbotPopur.classList.add("disiplay-none");
  tarjimonPage.classList.add("disiplay-none");
  lugatPage.classList.add("disiplay-none");
  grammerPage.classList.remove("disiplay-none");
  statistikaPage.classList.add("disiplay-none");
});

statistika.addEventListener("click", function () {
  statistika.classList.add("add-bg");
  chat.classList.remove("add-bg");
  lugat.classList.remove("add-bg");
  grammer.classList.remove("add-bg");

  chatbotPopur.classList.add("disiplay-none");
  tarjimonPage.classList.add("disiplay-none");
  lugatPage.classList.add("disiplay-none");
  grammerPage.classList.add("disiplay-none");
  statistikaPage.classList.remove("disiplay-none");
});

// ---------------------------
let bxMenu = document.querySelector(".bx-menu");
let header = document.querySelector(".header");
let chatFooter = document.querySelector(".chat-footer");
bxMenu.addEventListener("click", function () {
  header.classList.add("display-block");
  header.classList.add("absaliut");
  chatFooter.classList.add("disiplay-none");
});
