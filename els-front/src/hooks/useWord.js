import { useState, useEffect } from "react";
import api from '../plugins/axios'

const useWord = (id,lesson_id) => {
    const [word, setWord] = useState({
        word : '',
        quiz_id : lesson_id
    });

    useEffect(() => {
        if(id) {
            const checkWord = async () => {
                const response = await api.get(`admin/words/${id}`)
                setWord({
                    ...word,
                    word : response.data.word,
                })
            }
            checkWord()
        }
    },[id]);

    return { word };
}

export default useWord;