import React from "react";
import { Link } from "react-router-dom";

const TopNav = () => {
    return (
        <div>
            <nav className="bg-gray-200">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between">

                        <div className="flex space-x-4">
                            <div>
                                <Link to="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                                    <span className="font-bold">E-learning-system</span>
                                </Link>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-1">
                            <Link to="/" className="py-5 px-3">Categories</Link>
                            <Link to="/" className="py-5 px-3">Users</Link>
                            <Link to="/" className="py-5 px-3">Logout</Link>
                        </div>

                    </div>
                </div>

            </nav>
        </div>
    );
}

export default TopNav
