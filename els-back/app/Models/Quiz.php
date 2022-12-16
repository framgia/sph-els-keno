<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'description',
    ];

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function words(){
        return $this->hasMany(Word::class);
    }

    public function results(){
        return $this->hasMany(Result::class);
    }

    static function checkResult($answers)
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

    
    public function scopeNotTaken($query,$quizzes_taken_ids) 
    {
        return $query->whereNotIn('id',$quizzes_taken_ids);
    }

}
