import React from "react";

const Button = ({onClick, isDisabled = false, type = 'button', btnClass = '', usage="form",children}) => {

    const getClass = () => {
        if(usage === 'form') {
            return `transform bg-blue-600 py-2 hover:bg-blue-800`
        }
        else if(usage === "quiz_choosing") {
            return "w-full hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 dark:focus:ring-[#1da1f2]/55";
        }
        else if(usage === "quiz_done" || usage === "set_correct") {
            return "bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 text-center inline-flex items-center dark:focus:ring-green-500 dark:hover:bg-green-700"
        }
        else if(usage === "quiz_previous") {
            return "bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 "
        }
        else if(usage === "quiz_previous") {
            return "bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
        }
        else if(usage === "cancel_modal") {
            return "text-gray-500 bg-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        }
        else if(usage === "modal_confirm") {
            return "text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
        }
        else if(usage === "close_modal") {
            return "absolute top-3 right-2.5 bg-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
        }
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

