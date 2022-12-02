import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Activities from "./Activities";
import useProfile from "../hooks/useProfile";
import LearnedWords from "./LearnedWords";
import { loadingScreenShow } from "../plugins/loader";
import { successNotify } from "../plugins/toast";
import api from '../plugins/axios'

const Profile = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useProfile(id);
    const [activeTab, setActiveTab] = useState('learned_words');

    const renderFollowingText = () => user.is_followed_by_user ? "UNFOLLOW" : "FOLLOW";

    const followOrUnfollow = async () => {
        const following = {
            followed_id : user.id,
            is_followed_by_user : !user.is_followed_by_user
        }

        await api.post(`user/follow-or-unfollow`, following)
        navigate(0)
        successNotify(`You ${renderFollowingText().toLowerCase()}ed ${user.name} successfully`)
    }

    const renderActiveTab = () => {
        if(activeTab === 'learned_words')
            return <LearnedWords user={user}/>
        else if (activeTab === 'activities')
            return <Activities user={user}/>

        return null;
    }

    if(!user) return loadingScreenShow();

    return (
        <div className="flex flex-row">
            <div className="basis-1/4">
                <div className="text-2xl mt-2">Profile</div>
                <div className="w-full mt-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center pt-5 pb-5">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={ user.image || "https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/952/cached.offlinehbpl.hbpl.co.uk/news/ORP/B4034D5B-B9CD-0FDA-A4A4B94A79E70949.jpg"} alt="Bonnie image"/>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
                    </div>
                    <div className="mx-5">
                        <hr  />
                        <div className="flex justify-around">
                            <div className="text-l text-center">
                                <p>{user.followers.length} </p>
                                <p>followers</p>
                            </div>
                            <div className="text-l text-center">
                                <p>{user.follows.length} </p>
                                <p>followings</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center pt-5 pb-5">
                        <button className="rounded-full my-2 text-white w-52 bg-blue-300 hover:bg-blue-500" onClick={() => followOrUnfollow()}>{renderFollowingText()}</button>
                        <div> <Link className={`${activeTab === 'learned_words' ? 'text-gray-500' : 'text-blue-500'} font-medium pl-1  hover:underline`} onClick={() => setActiveTab('learned_words')}> Learned {user.learned_words.length} words </Link></div>
                        {/* <div><Link className="font-medium pl-1 text-blue-500 hover:underline"> Learned {user.results.length} lessons</Link></div> */}
                        <div><Link className={`${activeTab === 'activities' ? 'text-gray-500' : 'text-blue-500'} font-medium pl-1 hover:underline`} onClick={() => setActiveTab('activities')}> Activities</Link></div>
                    </div>
                </div>
            </div>
            <div className="basis-3/4">
                {renderActiveTab()}
            </div>
        </div>
    )
}

export default Profile;
