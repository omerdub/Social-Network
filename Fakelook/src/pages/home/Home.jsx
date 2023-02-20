import { Posts, Stories } from "../../components";

import "./home.scss";

export const Home = () => {
    return (
        <div className="home">
            <Stories />
            <Posts />
        </div>
    );
}