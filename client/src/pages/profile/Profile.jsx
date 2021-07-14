import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightBar/RightBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import uploadCloudinary from '../../utils/uploadCloudinary'

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [profilePicture, setProfilePicture] = useState(PF + "person/noAvatar.png")
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      console.log("res",res);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <div className="profileUserImg oh">
                <div className="pr">
                  <img className="w1 bra50"
                    // className="profileUserImg"
                    src={
                      user.profilePicture
                        ? PF + user.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                  />
                  <div className="pa b0 l0 w1 bgCam tac ptb5"><PhotoCameraIcon onClick={() => {
                    uploadCloudinary((ok, url, detail) => {
                      if (ok) {
                        console.log(url)
                      }
                    })
                  }} className="cf cl1h cp" /></div>
                </div>
              </div>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
