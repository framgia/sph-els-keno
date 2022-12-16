<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Choice;
use App\Models\Word;
use Illuminate\Http\Request;

class ChoiceController extends Controller
{
    public function index(Request $request)
    {
        $per_page = $request->query('per_page') ?? 10;

        return Choice::paginate($per_page);
    }


    public function store(Request $request)
    {
        $request->validate([
            'word_id' => "required",
            'choice' => "required",
        ]);

        $word = Word::find($request->word_id);

        $choice = Choice::create([
            'word_id' => $word->id,
            'choice' => $request->choice,
            'correct_answer' => $word->checkIfFirstChoice($request->word_id),
        ]);

        return $choice;
    }

    public function setChoiceToCorrectAnswer(Choice $choice) 
    {
        $choice->word->setChoicesToIncorrect();

        return $choice->update(['correct_answer' => 1]);
    }
    
    public function update(Request $request,Choice $choice)
    {
        $request->validate([
            'word_id' => "required",
            'choice' => "required",
        ]);

        $choice->update($request->toArray());

        return $choice;
    }

    public function show(Request $request,Choice $choice)
    {
        return $choice;
    }

    public function delete(Choice $choice)
    {
        $word = $choice->word;

        if($choice->correct_answer === 1)
            $word->setChoicesToIncorrect();

        $choice->delete();

        $word->setFirstChoiceAsCorrect();
    }
}
