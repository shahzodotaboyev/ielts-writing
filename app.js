const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessagebutton = document.querySelector("#send-message");

const userData = {
  message: null,
};
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

const handleOutgoingMessage = (e) => {
  e.preventDefault();
  userData.message = messageInput.value.trim();
  messageInput.value = "";
  const messageContent = `  <div class="message-text"></div>`;
  const outgoingMessagediv = createMessageElement(
    messageContent,
    "user-message"
  );
  outgoingMessagediv.querySelector(".message-text").textContent =
    userData.message;

  chatBody.appendChild(outgoingMessagediv);
  setTimeout(() => {
    const messageContent = ` <img
            class="bot-avatar"
            width="45px"
            height="45px"
            src="./img/image (1).png"
            alt=""
          />
          <div class="message-text">
            <div class="thinking-indicator">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>`;
    const incomingMessagediv = createMessageElement(
      messageContent,
      "bot-message","thinking"
    );
    
    

    chatBody.appendChild(incomingMessagediv);
  }, 600);
};

messageInput.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  if (e.key === "Enter" && userMessage) {
    handleOutgoingMessage(e);
  }
});

sendMessagebutton.addEventListener("click", (e) => {
  handleOutgoingMessage(e);
});
