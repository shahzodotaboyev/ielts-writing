const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessagebutton = document.querySelector("#send-message");

const API_KEY = "AIzaSyDFDS7hiEK87NT-GrE3CMarlDyq32otTtc";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const userData = { message: null };

// 📌 Xabar yaratish funksiyasi
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

// 📌 Chat oynasini pastga scroll qilish
const scrollToBottom = () => {
  chatBody.scrollTop = chatBody.scrollHeight;
};

// 📌 Klaviatura ochilganda sahifani moslash
const adjustForKeyboard = () => {
  document.body.style.height = `${window.visualViewport.height}px`;
};
window.visualViewport.addEventListener("resize", adjustForKeyboard);

// 📌 Bot javobini olish
const generateBotResponse = async () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: userData.message }] }],
    }),
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    const botMessageText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Kechirasiz, tushunmadim.";

    // 📌 Bot xabarini chatga qo‘shish
    const incomingMessageDiv = createMessageElement(
      `<img class="bot-avatar" width="45px" height="45px" src="./img/image (1).png" alt="" />
       <div class="message-text">${botMessageText}</div>`,
      "bot-message"
    );

    const thinkingMessage = document.querySelector(".thinking");
    if (thinkingMessage) thinkingMessage.replaceWith(incomingMessageDiv);

    scrollToBottom(); // 📌 Bot javobi kelsa, pastga scroll qilish
  } catch (error) {
    console.error(error);
  }
};

// 📌 Foydalanuvchi xabar yuborganda ishlaydigan funksiya
const handleOutgoingMessage = (e) => {
  e.preventDefault();
  userData.message = messageInput.value.trim();
  if (!userData.message) return;

  messageInput.value = "";
  messageInput.focus(); // 📌 Input fokusda qolishi uchun

  // 📌 Foydalanuvchi xabarini chatga qo‘shish
  const outgoingMessageDiv = createMessageElement(
    `<div class="message-text">${userData.message}</div>`,
    "user-message"
  );
  chatBody.appendChild(outgoingMessageDiv);
  scrollToBottom(); // 📌 Xabar yuborilganda pastga scroll qilish

  // 📌 Botning "o‘ylanyapti" animatsiyasini qo‘shish
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
    scrollToBottom(); // 📌 Bot javobi kelishidan oldin ham pastga scroll qilish

    generateBotResponse();
  }, 100);
};

// 📌 Eventlar qo‘shish
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && messageInput.value.trim()) {
    handleOutgoingMessage(e);
  }
});

sendMessagebutton.addEventListener("click", handleOutgoingMessage);
  