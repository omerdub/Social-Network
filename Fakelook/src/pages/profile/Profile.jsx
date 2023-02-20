import "./profile.scss";
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import { Posts } from "../../components";

export const Profile = () => {
    return (
        <div className="profile">
            <div className="images">
                <img src="https://images.pexels.com/photos/4101555/pexels-photo-4101555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="cover" />
                <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="profilepic" />
            </div>
            <div className="profilecontainer">
                <div className="user-profile-info">
                    <div className="left">
                        <a href="https://facebook.com">
                            <FacebookTwoToneIcon fontSize="large" />
                        </a>
                        <a href="https://instagram.com">
                            <InstagramIcon fontSize="large" />
                        </a>
                        <a href="https://linkedin.com">
                            <LinkedInIcon fontSize="large" />
                        </a>
                        <a href="https://pinterest.com">
                            <PinterestIcon fontSize="large" />
                        </a>
                    </div>
                    <div className="center">
                        <span>Jane Doe</span>
                        <div className="info">
                            <div className="item">
                                <PlaceIcon />
                                <span>USA</span>
                            </div>
                            <div className="item">
                                <LanguageIcon />
                                <span>fakelook.com</span>
                            </div>
                        </div>
                        <button>follow</button>
                    </div>
                    <div className="right">
                        <EmailOutlinedIcon />
                        <MoreVertOutlinedIcon />
                    </div>
                </div>
                <Posts />
            </div>
        </div>
    );
}