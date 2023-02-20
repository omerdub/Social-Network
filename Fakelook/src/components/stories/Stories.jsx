import "./stories.scss";

export const Stories = () => {
    const currentUser = {
        id: 1,
        name: "John Doe",
        img: "https://images.pexels.com/photos/2918094/pexels-photo-2918094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    };
    const stories = [
        {
            id: 1,
            name: "John Doe",
            img: "https://images.pexels.com/photos/2918094/pexels-photo-2918094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: 2,
            name: "John Doe",
            img: "https://images.pexels.com/photos/2752783/pexels-photo-2752783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: 3,
            name: "John Doe",
            img: "https://images.pexels.com/photos/3889753/pexels-photo-3889753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: 4,
            name: "John Doe",
            img: "https://images.pexels.com/photos/1352245/pexels-photo-1352245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
    ];
    return (
        <div className="stories">
            <div className="story">
                <img src={currentUser.profilePicture} alt="" />
                <span>{currentUser.name}</span>
                <button>+</button>
            </div>
            {stories.map(story => (
                <div className="story" key={story.id}>
                    <img src={story.img} alt="" />
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    );
};
