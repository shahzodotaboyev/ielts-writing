const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessagebutton = document.querySelector("#send-message");

const API_KEY = "AIzaSyDFDS7hiEK87NT-GrE3CMarlDyq32otTtc";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const userData = {
  message: null,
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
          parts: [{ text: userData.message }],
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
  // chatBody ni pastga siljish
  chatBody.scrollTop = chatBody.scrollHeight;

  // Ekran pastga siljish
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 100); // kechikish vaqtini o'zgartiring
};

window.visualViewport.addEventListener("resize", adjustForKeyboard);

const adjustForKeyboard = () => {
  setTimeout(() => {
    // Klaviatura ochilganda faqatgina chat body ni ko'rsatish
    document.body.style.height = `${window.visualViewport.height}px`;
    scrollToBottom();
  }, 200); // Klaviatura ochilganidan so'ng
};

window.visualViewport.addEventListener("resize", adjustForKeyboard);

window.visualViewport.addEventListener("resize", () => {
  document.body.style.height = `${window.visualViewport.height}px`;
  scrollToBottom();
});

sendMessagebutton.addEventListener("touchend", (e) => {
  e.preventDefault();
  handleOutgoingMessage(e);
  messageInput.focus();
});
