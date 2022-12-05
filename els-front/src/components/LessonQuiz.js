import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import useQuizWords from "../hooks/useQuizWords";
import { loadingScreenShow } from "../plugins/loader";
import api from '../plugins/axios'
import Results from "./Results";

const LessonQuiz = () => {
    const { id } = useParams();
    const { quizWords,quizName } = useQuizWords(id)
    const [wordIndex, setWordIndex] = useState(0);
    const [isDone, setIsDone] = useState(false);
    const [results, setResults] = useState(null);
    
    useEffect(() => {
        console.log(results)
    }, [results]);

    const submitAnswers = async() => {
        const response = await api.post(`user/quiz-check-results/${id}`,{
            quiz_answers : quizWords
        })
        setResults(response.data);         
    }

    const setAnswer = (choice_id) => {
        quizWords[wordIndex].choice_id = choice_id;
        if(wordIndex !== quizWords.length-1){
            setWordIndex(wordIndex+1);
        }
        else {
            setIsDone(true)
        }
    }

    const renderPreviousButton = () => {
        if(wordIndex > 0){
            return <button onClick={() => setWordIndex(wordIndex-1)} type="button" className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
                Previous
            </button>
        }
    }

    const renderDoneButton = () => {
        if(isDone){
            return <button 
                onClick={() => submitAnswers()}
                type="button" 
                className="text-white bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-green-500 dark:hover:bg-green-700 mr-2 mb-2">
                Done
            </button> 
        }
    }

    const renderChoices = (choices) => {
        return choices.map(({ choice,id }) => {
            return (
                <button 
                    key={id}
                    onClick={() => setAnswer(id)}
                    type="button" 
                    className={`text-white w-full ${quizWords[wordIndex].choice_id === id ? 'bg-blue-700':'bg-blue-400'} hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-[#1da1f2]/55 mr-2 mb-2`}
                >
                    {choice}
                </button>
            )
        })
    }

    const renderQuiz = () => {
        if(results)
            return <Results results={results} quizName={quizName}/>
        else {
            return (<>
                <div className="flex justify-between ">
                    <div className="text-2xl text-bold">{quizName}</div>
                    <div className="text-xl">{wordIndex+1} of {quizWords.length}</div>
                </div>
                <div className="flex w-full mt-10">
                    <div className="w-1/2 text-6xl text-center my-auto">
                        {quizWords[wordIndex].word}
                    </div>
                    <div className="w-1/2">
                        {renderChoices(quizWords[wordIndex].choices)}
                    </div>
                </div>
                <div className="mt-10 float-right">
                    {renderPreviousButton()}
                    {renderDoneButton()}
                </div>
            </>)
        }
    }

    if(!quizWords) 
        return loadingScreenShow()
    else if(quizWords.length === 0) 
        return <div className="text-center mt-20">No quiz items found</div>
    
    return (
        <div className="w-full mt-10 px-20">
            {renderQuiz()}
        </div>
    )
}

export default LessonQuiz;
