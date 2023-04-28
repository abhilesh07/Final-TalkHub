import React from "react";
import Avatar, { ConfigProvider } from "react-avatar";

const Client = ({ username, ImageNo }) => {
  const imageInsert = {
    1: "/Desk.avif",
    2: "/Grade.avif",
    3: "/Echo.avif",
    4: "/Smile.avif",
    5: "/Matrix.avif",
    6: "/User.avif",
    7: "/Computer.avif",
    8: "/Silent.avif",
    9: "/Lamp.avif",
    10: "/Mouse.avif",
    11: "/Up.avif",
  };

  return (
    <ConfigProvider
      colors={["gold", "yellowgreen", "turquoise", "darkviolet", "red"]}
    >
      <div className="client">
        <div className="avatarMove">
          <Avatar
            name={username}
            size={60}
            round="12px"
            src={imageInsert[ImageNo]}
          />
        </div>
        <span className="userName">{username}</span>
      </div>
    </ConfigProvider>
  );
};

// <div className="client">
//   <Avatar name={username} size={50} round="15px" />
//   <span className="userName">{username}</span>
// </div>

export default Client;
