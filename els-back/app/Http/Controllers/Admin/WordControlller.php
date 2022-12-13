<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Word;
use Illuminate\Http\Request;

class WordControlller extends Controller
{
    public function index(Request $request)
    {
        $per_page = $request->query('per_page') ?? 10;

        return Word::paginate($per_page);
    }


    public function store(Request $request)
    {
        $request->validate([
            'quiz_id' => "required",
            'word' => "required",
        ]);

        $word = Word::create($request->toArray());

        return $word;
    }

    public function update(Request $request,Word $word)
    {
        $request->validate([
            'quiz_id' => "required",
            'word' => "required",
        ]);

        $word->update($request->toArray());

        return $word;
    }

    public function show(Request $request,Word $word)
    {
        return $word->load('choices');
    }

    public function delete(Word $word)
    {
        $word->choices()->delete();

        return $word->delete();
    }
}
