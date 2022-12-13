<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function show(Request $request,Quiz $quiz)
    {
        return $quiz->load(['words' => function($query) {
            return $query->with(['choices' => function($choices){
                return $choices->select('id','word_id','choice');
            }]);
        }]);
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
