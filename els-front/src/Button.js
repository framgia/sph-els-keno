import React from "react";

const Button = (props) => {
    return (
        <button 
            onClick={props.onClick}
            disabled={props.submitting}
            type={props.type || "button"}
            className={props.btnClass || "rounded-xl text-white w-1/2 mt-10 bg-blue-600 py-2 font-bold duration-300 hover:bg-blue-800"}
        >
            {props.children}
        </button>
    )
}

export default Button

