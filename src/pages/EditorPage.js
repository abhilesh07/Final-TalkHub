import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import ACTIONS from "../Actions";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import Chat from "../components/Chat";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const chatRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([
    // { socketId: 1, username: "Azhar" },
    // { socketId: 1, username: "Mazhar" },
    // { socketId: 1, username: "Prathamesh" },
    // { socketId: 1, username: "Fatema" },
    // { socketId: 1, username: "Nazar" },
    // { socketId: 1, username: "Anwar" },
  ]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast("Server Connection Failed ! Try Again", {
          duration: 2000,
          position: "top-center",
          style: {
            height: "25px",
            fontWeight: "700",
            backgroundImage:
              "linear-gradient(45deg,rgb(250, 247, 247),rgb(250,246,245),rgb(252,248,248))",
            color: "rgb(254,3,3)",
            textShadow: "0px 2px 3px rgb(205,50,125)",
            fontFamily: ' "Lora" , serif',
            boxShadow: "1px 1px 5px rgb(3,3,3)",
          },
          className: "SuccessToast",
          icon: "⚠️",
          iconTheme: {
            primary: "#fff",
            secondary: "#000",
          },
        });
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast(`${username} Just Joined This Environment`, {
              duration: 2000,
              position: "top-center",
              style: {
                height: "25px",
                fontWeight: "700",
                backgroundImage:
                  "linear-gradient(45deg,rgb(29, 28, 28),rgb(49, 49, 57) 50%,rgb(29,28,28))",
                color: "whitesmoke",
                textShadow: "0px 2px 3px rgb(195,205,50)",
                fontFamily: ' "Lora" , serif',
                boxShadow: "1px 1px 5px whitesmoke",
              },
              className: "SuccessToast",
              icon: "🆕",
              iconTheme: {
                primary: "#fff",
                secondary: "#000",
              },
            });
            console.log(`${username} joined`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
          // socketRef.codeRef.emit("syncChat", {
          //   chat: chatRef.current,
          //   socketId,
          // });
        }
      );

      // Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast(`${username} Left This Environment`, {
          duration: 2000,
          position: "top-center",
          style: {
            height: "25px",
            fontWeight: "700",
            backgroundImage:
              "linear-gradient(45deg,rgb(29, 28, 28),rgb(49, 49, 57) 50%,rgb(29,28,28))",
            color: "whitesmoke",
            textShadow: "0px 2px 3px rgb(195,205,50)",
            fontFamily: ' "Lora" , serif',
            boxShadow: "1px 1px 5px whitesmoke",
          },
          className: "SuccessToast",
          icon: "🛑",
          iconTheme: {
            primary: "#fff",
            secondary: "#000",
          },
        });
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast("Environment ID Copied To ClipBoard", {
        duration: 2000,
        position: "top-center",
        style: {
          height: "25px",
          fontWeight: "700",
          backgroundImage:
            "linear-gradient(45deg,rgb(29, 28, 28),rgb(49, 49, 57) 50%,rgb(29,28,28))",
          color: "whitesmoke",
          textShadow: "0px 2px 3px rgb(195,205,50)",
          fontFamily: ' "Lora" , serif',
          boxShadow: "1px 1px 5px whitesmoke",
        },
        className: "SuccessToast",
        icon: "🫧",
        iconTheme: {
          primary: "#fff",
          secondary: "#000",
        },
      });
    } catch (err) {
      toast("Could Not Able to Copy Environment ID ", {
        duration: 2000,
        position: "top-center",
        style: {
          height: "25px",
          fontWeight: "700",
          backgroundImage:
            "linear-gradient(45deg,rgb(250, 247, 247),rgb(250,246,245),rgb(252,248,248))",
          color: "rgb(254,3,3)",
          textShadow: "0px 2px 3px rgb(205,50,125)",
          fontFamily: ' "Lora" , serif',
          boxShadow: "1px 1px 5px rgb(3,3,3)",
        },
        className: "SuccessToast",
        icon: "⚠️",
        iconTheme: {
          primary: "#fff",
          secondary: "#000",
        },
      });
      console.error(err);
    }
  }

  function leaveRoom() {
    reactNavigator("/");
  }

  if (!location.state) {
    return <Navigate to="/" />;
  }

  // const RandomNumber = Math.floor(Math.random() * 6) + 1;
  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            {/* <img className="logoImage" src="/social.png" alt="logo" /> */}
            <span className="dashboard">Dash Board</span>
          </div>
          <div className="connectedDev">
            Connected Developer<span className="apos">'</span>s :
          </div>
          <div className="clientsList">
            {clients.map((client) => (
              <Client
                key={client.socketId}
                username={client.username}
                ImageNo={client.ImageNo}
              />
            ))}
          </div>
        </div>
        <button className="btn copyBtn" onClick={copyRoomId}>
          Invite
        </button>
        <button className="btn leaveBtn" onClick={leaveRoom}>
          Leave
        </button>
      </div>
      <div className="editorWrap">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
      <div className="chatWrap">
        {/* <Chat /> */}
        <Chat
          name={location.state?.username}
          socketRef={socketRef}
          roomID={roomId}
          /*onChatChange={(childElement) => {
            chatRef.current = childElement;
          }}*/
        />
      </div>
    </div>
  );
};

export default EditorPage;
