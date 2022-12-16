import React from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router";
import Button from "./Button";

const Results = ({ results,quizName }) => {
    const navigate = useNavigate()

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
            <Button onClick={() => navigate(-1)} usage="quiz_previous" btnClass="px-5 mr-2 mb-2 "> Go Back </Button>
        </div>
    </>)
}

export default Results;