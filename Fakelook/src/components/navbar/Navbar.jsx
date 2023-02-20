import "./navbar.scss";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { Dropdown } from "../../UIkit";

export const Navbar = ({ toggle, darkMode }) => {

    const currentUser = {
        id: 1,
        name: "John Doe",
        img: "https://images.pexels.com/photos/2918094/pexels-photo-2918094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    };

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span>Fakelook</span>
                </Link>
                <HomeOutlinedIcon />
                {darkMode ? <WbSunnyOutlinedIcon onClick={toggle} /> : <DarkModeOutlinedIcon onClick={toggle} />}
                <GridViewOutlinedIcon />
                <div className="search">
                    <SearchIcon />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="right">
                <PersonOutlineOutlinedIcon />
                <MailOutlineOutlinedIcon />
                <NotificationsNoneOutlinedIcon />
                <Dropdown title={<div className="user">
                    <img src={currentUser.img} alt="" />
                    <span>{currentUser.name}</span>
                </div>}
                    items={[
                        <p>Logout</p>
                    ]} />
            </div>
        </div>
    );
};

