import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast("Successfully Created New Environment", {
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
      icon: "✨",
      iconTheme: {
        primary: "#fff",
        secondary: "#000",
      },
    });
  };

  const joinRoom = () => {
    if (!roomId) {
      toast("Please Enter Custom Environment ID", {
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
        className: "EnvironmentToast",
        icon: "👀",
        iconTheme: {
          primary: "#fff",
          secondary: "#000",
        },
      });
      return;
    }

    if (!username) {
      toast("UserName is Required", {
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
        icon: "😑",
        iconTheme: {
          primary: "#fff",
          secondary: "#000",
        },
      });

      return;
    }

    // Redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };
  return (
    <div className="homePageWrapper">
      <div className="container">
        <div className="circle1"></div>
        <div className="circle2"></div>
      </div>
      <div className="formWrapper">
        <div className="titleHeader">
          <img className="homePageLogo" src="/Globe.png" alt="code-sync-logo" />
          <span className="title">
            <div className="innerTitle">
              <b className="Btitle">Global Discussion Room</b>
            </div>
          </span>
          <img className="homePageLogo" src="/Globe.png" alt="code-sync-logo" />
        </div>
        <p className="message">
          Enhance The Ability of Your CODE 💻 Coherence by Argumenting Globally
          .
        </p>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="Paste Environment ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
            spellCheck="false"
          />
          <input
            type="text"
            className="inputBox user"
            placeholder="UserName To Join As"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleInputEnter}
            spellCheck="false"
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            Join
          </button>
          <span className="createInfo">
            {/* If you don't have an invite then create &nbsp; */}
            <span className="createinfo2">
              Wanna Create New Environment &nbsp;
            </span>
            <a onClick={createNewRoom} href="" className="createNewBtn">
              Click Here !
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4 className="footerMessage">
          Built with 💖&nbsp;by &nbsp;
          <a
            className="Link"
            //href="https://www.youtube.com/watch?v=bsi8_9EoYyg&pp=ygUGa3Nia3Nq"
            href="http://www.kthmcollege.ac.in/"
          >
            Nazar Ansari
          </a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
