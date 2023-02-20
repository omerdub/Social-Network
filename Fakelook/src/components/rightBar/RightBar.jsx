import "./rightBar.scss"
import DefaultProfile from "../../assets/default-profile-picture.jpg";

export const RightBar = () => {
    return (
        <div className="rightbar">
            <div className="container">
                <div className="item">
                    <span>Suggestions For You</span>
                    <div className="user">
                        <div className="userinfo">
                            <img src={DefaultProfile} alt="" />
                            <span>Jane Doe</span>
                        </div>
                        <div className="buttons">
                            <button>follow</button>
                            <button>dismiss</button>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userinfo">
                            <img src={DefaultProfile} alt="" />
                            <span>Jane Doe</span>
                        </div>
                        <div className="buttons">
                            <button>follow</button>
                            <button>dismiss</button>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <span>Latest Activities</span>
                    <div className="user">
                        <div className="userinfo">
                            <img src={DefaultProfile} alt="" />
                            <p>
                                <span>Jane Doe </span>change their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userinfo">
                            <img src={DefaultProfile} alt="" />
                            <p>
                                <span>Jane Doe </span>change their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userinfo">
                            <img src={DefaultProfile} alt="" />
                            <p>
                                <span>Jane Doe </span>change their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userinfo">
                            <img src={DefaultProfile} alt="" />
                            <p>
                                <span>Jane Doe </span>change their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userinfo">
                            <img src={DefaultProfile} alt="" />
                            <p>
                                <span>Jane Doe </span>change their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="item">
                    <span>Online Friends</span>
                    <div className="user">
                        <div className="userinfo">
                            <img src={DefaultProfile} alt="" />
                            <div className="online" />
                            <span>Jane Doe </span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userinfo">
                            <img src={DefaultProfile} alt="" />
                            <div className="online" />
                            <span>Jane Doe </span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userinfo">
                            <img src={DefaultProfile} alt="" />
                            <div className="online" />
                            <span>Jane Doe </span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userinfo">
                            <img src={DefaultProfile} alt="" />
                            <div className="online" />
                            <span>Jane Doe </span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userinfo">
                            <img src={DefaultProfile} alt="" />
                            <div className="online" />
                            <span>Jane Doe </span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userinfo">
                            <img src={DefaultProfile} alt="" />
                            <div className="online" />
                            <span>Jane Doe </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}