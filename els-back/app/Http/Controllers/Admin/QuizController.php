<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function index(Request $request)
    {
        $per_page = $request->query('per_page') ?? 10;

        return Quiz::paginate($per_page);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => "required",
            'name' => "required",
            'description' => "required",
        ]);

        return Quiz::create($request->toArray());
    }

    public function update(Request $request,Quiz $quiz)
    {
        $request->validate([
            'category_id' => "required",
            'name' => "required",
            'description' => "required",
        ]);

        return $quiz->update($request->toArray());
    }

    public function show(Request $request,Quiz $quiz)
    {
        return $quiz->load('words');
    }

    public function delete(Quiz $quiz)
    {
        if($quiz->words()->exists())
            return response()->json(['message' => 'Quiz has words.'], 422); 

        return $quiz->delete();
    }
}
