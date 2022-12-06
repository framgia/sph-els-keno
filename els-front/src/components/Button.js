import React from "react";

const Button = ({onClick, isDisabled = false, type = 'button', btnClass = '', usage="form",children}) => {

    const getClass = () => {
        if(usage === 'form') {
            return `transform bg-blue-600 py-2 hover:bg-blue-800`
        }
        else if(usage === "quiz_choosing") {
            return "w-full hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 dark:focus:ring-[#1da1f2]/55";
        }
        else if(usage === "quiz_done") {
            return "bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 text-center inline-flex items-center dark:focus:ring-green-500 dark:hover:bg-green-700"
        }
        else if(usage === "quiz_previous") {
            return "bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 "
        }
        else if(usage === "quiz_previous") {
            return "bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
        }
        //some logic to identify button type here
        // transform duration-300 hover:bg-blue-800 bg-blue-600
        // transform duration-300 hover:bg-blue-800 bg-blue-600
        //  bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium  text-sm px-5  bg-blue-600
        //  bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium  text-sm px-5  text-center inline-flex items-center dark:focus:ring-green-500 dark:hover:bg-green-700 mr-2 mb-2
        // hover: focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium  text-sm px-5 py-2.5 dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 bg-blue-600
        //  w-1/2 mt-10 duration-300 hover:bg-blue-800
    }

    return (
        <button 
            onClick={onClick}
            disabled={isDisabled}
            type={type}
            className={`text-white font-bold py-2 rounded-lg ${getClass()} ${btnClass}`}
        >
            {children}
        </button>
    )
}

export default Button

