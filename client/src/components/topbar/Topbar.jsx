import ChooseButtonAccount from "../layout/ChooseButtonAccount";
import Tooltip from "../layout/Tooltip";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { authContext } from "../../context/auth/AuthContext";

export default function Topbar() {
  const { authState: { user } } = authContext();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">

      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Phây búc</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">

            <Notifications />
            <span className="topbarIconBadge">1</span>

          </div>
        </div>
        <div className="df aic">
          <Tooltip title={<div>
            <div>{user?.username}</div>
            <div>Test</div>
          </div>} >

            <Link to={`/profile/${user?.username}`} className="df aic">
              <img
                src={
                  user?.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="topbarImg"
              />
            </Link>
          </Tooltip>
          <ChooseButtonAccount />
        </div>
      </div>
    </div>
  );
}
