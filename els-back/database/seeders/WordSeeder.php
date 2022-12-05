<?php

namespace Database\Seeders;

use App\Models\Quiz;
use Illuminate\Database\Seeder;

class WordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $quizzes = Quiz::all();

        foreach($quizzes as $quiz) {
            for($i=1;$i<=20;$i++){

                $quiz->words()->create([
                    "word" => "Word $i",
                ]);
            }
        }
    }
}
