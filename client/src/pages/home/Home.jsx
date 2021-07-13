import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightBar/RightBar";
import ImageUploader from "../../components/ImageUploader";
import "./home.css"
import { authContext } from "../../context/auth/AuthContext";
export default function Home() {
  const { authState: { user } } = authContext();
  return (
    <>
    <ImageUploader/>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <RightBar user={user} />
      </div>
    </>
  );
}
