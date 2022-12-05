<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\Word;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function show(Request $request,Quiz $quiz)
    {
        return $quiz->load('words.choices');
    }

    public function checkResult($answers)
    {
        $checked_answers = [];
        $score = 0;

        foreach($answers as $answer) {
            $word = Word::find($answer['id']);
            $correct_choice = $word->choices()->correct()->first();

            $answer_result = [
                "word" => $word,
                "correct_choice" => $correct_choice->choice,
                "correct" => 0
            ];

            if($correct_choice->id === $answer['choice_id']){
                $score++;
                $answer_result['correct'] = 1;
            }
             
           $checked_answers[] = $answer_result;
        }

        return [
            'checked_answers' =>$checked_answers,
            'score' =>$score,
        ];
    }

    public function addLearnedWords($checked_answers,$user,$result_id)
    {
        foreach($checked_answers as $checked_answer){
            if($checked_answer['correct'] === 1) {
                $user->learned_words()->create([
                    'word_id' => $checked_answer['word']['id'],
                    'result_id' => $result_id
                ]);
            }
        }
    }

    public function quizResult(Request $request,$id)
    {
        $checked_result = $this->checkResult($request->quiz_answers);

        $result = $request->user()->results()->create([
            'quiz_id' => $id,
            'score' => $checked_result['score'],
        ]);

        $this->addLearnedWords($checked_result['checked_answers'],$request->user(),$result->id);

        return $checked_result;
    }
}
