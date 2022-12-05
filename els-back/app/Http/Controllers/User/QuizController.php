<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function show(Request $request,Quiz $quiz)
    {
        return $quiz->load('words.choices');
    }
}
