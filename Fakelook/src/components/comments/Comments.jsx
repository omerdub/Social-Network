import { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../services/context/authContext";

export const Comments = () => {
    const { currentUser } = useContext(AuthContext);
    const comments = [
        {
            id: 1,
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed nisi lacus sed viverra tellus.",
            name: "John Doe",
            userId: 1,
            profilePicture: "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: 2,
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed nisi lacus sed viverra tellus.",
            name: "John Doe",
            userId: 2,
            profilePicture: "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
    ]
    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser.profilePicture} alt="" />
                <input type="text" placeholder="write a comment" />
                <button>Send</button>
            </div>
            {comments.map(comment => (
                <div className="comment">
                    <img src={comment.profilePicture} alt="" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className="date">1 hour ago</span>
                </div>
            ))
            }
        </div>
    );
};