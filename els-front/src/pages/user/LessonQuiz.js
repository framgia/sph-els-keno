import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import useQuizWords from "../../hooks/useQuizWords";
import { loadingScreenShow } from "../../plugins/loader";
import api from '../../plugins/axios'
import Results from "../../components/Results";
import Button from "../../components/Button";

const LessonQuiz = () => {
    const { id } = useParams();
    const { quizWords,quizName } = useQuizWords(id)
    const [wordIndex, setWordIndex] = useState(0);
    const [isDone, setIsDone] = useState(false);
    const [results, setResults] = useState(null);

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
            return <Button 
                btnClass="px-5 mr-2 mb-2"
                usage="quiz_previous"
                onClick={() => setWordIndex(wordIndex-1)}>
                Previous
            </Button>
        }
    }

    const renderDoneButton = () => {    
        if(isDone){
            return <Button 
                usage="quiz_done"
                onClick={() => submitAnswers()}
                btnClass="px-5 mr-2 mb-2">
                Done
            </Button> 
        }
    }

    const renderChoices = (choices) => {
        return choices.map(({ choice,id }) => {
            return (
                <Button 
                    key={id}
                    onClick={() => setAnswer(id)}
                    usage="quiz_choosing"
                    btnClass={`px-5 mr-2 mb-2 ${quizWords[wordIndex].choice_id === id ? 'bg-blue-700':'bg-blue-400'}`}
                >
                    {choice}
                </Button>
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
