<?php

namespace Database\Seeders;

use App\Models\Word;
use Illuminate\Database\Seeder;

class ChoiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $words = Word::all();

        foreach($words as $word) {
            $word->choices()->create([
                "choice" => "Choice #1",
            ]);

            $word->choices()->create([
                "choice" => "Choice #2",
            ]);

            $word->choices()->create([
                "choice" => "Choice #3",
                "correct_answer" => 1,
            ]);

            $word->choices()->create([
                "choice" => "Choice #4",
            ]);
        }
    }
}
