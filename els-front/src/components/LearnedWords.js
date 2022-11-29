import React from "react";

const LearnedWords = ({ user }) => {

    const renderLearnedWords = () => {
        return user.learned_words.map(learned_word => {
            return (
                <div className="flex justify-around">
                    <p className="font-medium text-gray-900 truncate dark:text-white">
                        {learned_word.word.word}
                    </p>
                    <p>
                        {learned_word.answer}
                    </p>
                </div>
            )
        })
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-around mt-2">
                <p className="font-medium text-gray-900 truncate dark:text-white">
                    Words
                </p>
                <p className="font-medium text-gray-900 truncate dark:text-white">
                    Answers
                </p>
            </div>
        );
    }
    return (
        <div className="w-full h-full mt-16 ml-2 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="text-2xl mb-2">Learned Words</div>
            <hr />
            <div className="grid grid-cols-2 gap-4">
                {renderHeader()}
                {renderHeader()}
                {renderLearnedWords()}
            </div>
        </div>
    )
}

export default LearnedWords;
