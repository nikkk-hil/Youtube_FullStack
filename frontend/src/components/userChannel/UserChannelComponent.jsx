import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserChannelProfile } from "../../api/user.api";
import VideoCard from "../VideoCard";

function UserChannelComponent() {
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getUserChannelProfile(username);
        setUserProfile(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);

  if (loading) {
    return (
      <div className="h-screen text-white text-4xl text-center">Loading</div>
    );
  }

  return (
    <div className="pt-16">
      <div className="w-full">
        <img
          src={userProfile?.coverImage}
          alt="user-cover-img"
          className="w-full object-cover h-48"
        />
        <img
          src={userProfile?.avatar}
          alt="user-profile-picture"
          className="absolute z-50 top-50 left-5 w-35 h-45 object-cover rounded-lg"
        />
      </div>
      <div className="pl-45 pt-5 text-white">
        <div className="font-semibold text-5xl">{userProfile.fullName}</div>
        <div className="flex gap-6 mt-2">
          <div className="text-xl">@{userProfile.username}</div>
          <div className="text-xl text-gray-400">
            {userProfile.subscriberCount} Subscriber
          </div>
          <div className="text-xl text-gray-400">
            {userProfile.channelSubscribedToCount} Channel Subscribed
          </div>
        </div>
      </div>
      <div className="text-white pl-5 pt-10 text-xl">
        Total Videos : {userProfile.videos.length}
      </div>
      <div className="grid grid-cols-4">
        { userProfile.videos && userProfile.videos.map( (video) => {
        return(
            <div key={video._id} className="text-white">
                <VideoCard video={video} forChannel={true} />
            </div>
        )
      })}
      </div>
    </div>
  );
}

export default UserChannelComponent;
