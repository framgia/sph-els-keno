import React from "react";
import { Link } from "react-router-dom";
import { dateHumanize } from "../plugins/moment";

const Activities = ({ user }) => {

    const redirectPathActivity = ({ type, activityable}) => {
        if(type = 'followings') 
            return `/profile/${activityable.followed.id}`
        else if (type = 'results')
            return `/lessons/${activityable.quiz.id}`
    }

    const renderActivityable = ({ type, activityable }) => {
        if(type = 'followings') 
            return activityable.followed.name
        else if (type = 'results')
            return activityable.quiz.name 
    }

    const renderActivities = () => {
        return user.activities.map(activity => {
            return (
                <li className="py-3 sm:py-4" key={activity.id}>
                    <div className="flex space-x-4">
                        <img className="w-12 h-12 rounded-full" src="https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/952/cached.offlinehbpl.hbpl.co.uk/news/ORP/B4034D5B-B9CD-0FDA-A4A4B94A79E70949.jpg" alt="Neil image" />
                        <div>
                            <div className="flex space-x-4">
                                <p className="font-medium text-gray-900 truncate dark:text-white">
                                    {activity.user.name}
                                </p>
                                <p>
                                    {activity.action}
                                </p>
                                <Link className="text-blue-500 font-medium hover:underline" to={redirectPathActivity(activity)}>
                                    {renderActivityable(activity)}
                                </Link>
                            </div>
                            <p className="text-m text-gray-400 truncate dark:text-gray-400">
                                {dateHumanize(activity.created_at)}
                            </p>
                        </div>
                    </div>
                </li>
            )
        })
    }
    
    if(!user) return null;

    return (
        <div className="w-full h-full mt-16 ml-2 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="text-2xl mb-2">Activities</div>
            <hr />
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                {renderActivities()}
            </ul>
        </div>
    )
}

export default Activities;