import React, { useEffect } from "react";

const Chat = ({ name, socketRef, roomID /*onChatChange*/ }) => {
  useEffect(() => {
    let textArea = document.querySelector("#textarea");
    let messageArea = document.querySelector(".messageArea");
    let sendIcon = document.querySelector(".sendIcon");

    function sendMessage(message) {
      let msgBlock = {
        name: name,
        msg: message.trim(),
      };
      appendMessage(msgBlock, "outgoing");
      messageArea.scrollTop = messageArea.scrollHeight;
      textArea.value = "";
      socketRef.current.emit("message", msgBlock, roomID);
    }
    function SendMessage() {
      sendMessage(textArea.value.trim());
    }
    function appendMessage(messages, type) {
      let mainDiv = document.createElement("div");
      let className = type;
      mainDiv.classList.add(className, "Comessage");
      // <h4 class="messageName">${messages.name}</h4>
      let markUp = `
    <p class="messagePart">${messages.msg}</p>
    `;
      mainDiv.innerHTML = markUp;
      if (messages.msg !== "") {
        messageArea.appendChild(mainDiv);
      }
    }
    textArea?.addEventListener("keyup", (e) => {
      console.log(e.target.value);
      // event.preventDefault();
      if (e.key === "Enter") {
        let messageStored = e.target.value;
        sendMessage(messageStored);
      }
    });

    sendIcon?.addEventListener("click", () => {
      sendMessage(textArea.value.trim());
    });
    // return () => {
    //   socketRef.current.off("Rmessage");
    // };
  }, []);
  useEffect(() => {
    let textArea = document.querySelector("#textarea");
    let messageArea = document.querySelector(".messageArea");

    function appendMessage(messages, type) {
      let mainDiv = document.createElement("div");
      let className = type;
      mainDiv.classList.add(className, "Comessage");
      let markUp = `
    <h4 class="messageName">${messages.name}</h4>
    <p class="messagePart">${messages.msg}</p>
    `;
      mainDiv.innerHTML = markUp;
      if (messages.msg !== "") {
        messageArea.appendChild(mainDiv);
      }
    }

    socketRef.current?.on("message", (msgBlock) => {
      console.log(msgBlock);
      appendMessage(msgBlock, "incoming");
      messageArea.scrollTop = messageArea.scrollHeight;
      // onChatChange(messageArea.children);
    });
    return () => {
      socketRef.current.off("message");
    };
  }, [socketRef.current]);

  return (
    <section className="chat_section">
      <div className="brand">
        <img className="MonkeyImage" src="/monkey-avatar.png" alt="Chat Logo" />
        <h1>Controversial Splasher</h1>
      </div>
      <div className="messageArea"></div>
      <div className="messageSend">
        <textarea
          id="textarea"
          cols={25}
          rows={1}
          placeholder="Describe your message . . ."
          spellCheck="false"
        ></textarea>
        <img className="sendIcon" src="/logout.png" alt="send"></img>
      </div>
    </section>
  );
};

export default Chat;
