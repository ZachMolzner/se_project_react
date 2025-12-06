// src/components/SideBar/SideBar.jsx
import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

const SideBar = () => {
  const userName = "Zach Molzner";

  return (
    <section className="sidebar">
      {/* LEFT: avatar */}
      <img src={avatar} className="sidebar__avatar" alt="User avatar" />

      {/* RIGHT: user info */}
      <div className="sidebar__info">
        <p className="sidebar__name">{userName}</p>

        {/* These links will be hidden on desktop, visible on mobile via CSS */}
        <p className="sidebar__link">Change profile data</p>
        <p className="sidebar__link">Log out</p>
      </div>
    </section>
  );
};

export default SideBar;
