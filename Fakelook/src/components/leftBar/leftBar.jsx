import "./leftBar.scss";
import Friends from "../../assets/friends.png";
import Groups from "../../assets/groups.png";
import Market from "../../assets/market.png";
import Watch from "../../assets/watch.png";
import { AuthContext } from "../../services/context/authContext";
import { useContext } from "react";



export const LeftBar = () => {

    const currentUser = {
        id: 1,
        name: "John Doe",
        img: "https://images.pexels.com/photos/2918094/pexels-photo-2918094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    };

    return (
        <div className="leftbar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src={currentUser.profilePicture} alt="" />
                        <span>{currentUser.name}</span>
                    </div>
                    <div className="item">
                        <img src={Friends} alt="" />
                        <span>Friends</span>
                    </div>
                    <div className="item">
                        <img src={Groups} alt="" />
                        <span>Groups</span>
                    </div>
                    <div className="item">
                        <img src={Market} alt="" />
                        <span>Market</span>
                    </div>
                    <div className="item">
                        <img src={Watch} alt="" />
                        <span>Watch</span>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    );
}