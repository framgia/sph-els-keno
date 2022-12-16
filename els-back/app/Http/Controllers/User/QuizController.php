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
        $quiz->already_taken = $request->user()->quizCheckIfTaken($quiz->id);
        
        return $quiz->load('words.choices');
    }

    public function quizResult(Request $request,$id)
    {
        $checked_result = Quiz::checkResult($request->quiz_answers);

        $result = $request->user()->results()->create([
            'quiz_id' => $id,
            'score' => $checked_result['score'],
        ]);

        $request->user()->addLearnedWords($checked_result['checked_answers'],$request->user(),$result->id);

        return $checked_result;
    }
}
