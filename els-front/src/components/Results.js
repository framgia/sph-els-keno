import React from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Results = ({ results,quizName }) => {
    const renderQuizResults = () => {
        return results.checked_answers.map((checked_answer,i) => {
            const iconResult = checked_answer.correct === 1 ? <AiOutlineCheckCircle className="text-green-400" /> : <AiOutlineCloseCircle className="text-red-400" />
            return (
                <div className="flex justify-between " key={i} >
                    <div className="text-2xl ">{iconResult}</div>
                    <div className="text-xl">{checked_answer.word.word}</div>
                    <div className="text-xl">{checked_answer.correct_choice}</div>
                </div>
            )
        })
    }

    return (<>
        <div className="flex justify-between ">
            <div className="text-2xl text-bold">{quizName}</div>
            <div className="text-xl">Result : {results.score} of {results.checked_answers.length}</div>
        </div>
        <div className="flex justify-between ">
            <div className="text-xl "></div>
            <div className="text-xl">Word</div>
            <div className="text-xl">Answer</div>
        </div>
        {renderQuizResults()}
        <div className="mt-10 float-right">
            <Link to="/categories" type="button" className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
                Go to Categories
            </Link>
        </div>
    </>)
}

export default Results;