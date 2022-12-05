<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Choice extends Model
{
    use HasFactory;

    protected $fillable = [
        'word_id',
        'choice',
        'correct_answer',
    ];

    protected $hidden = [
        'correct_answer',
    ];

    public function word(){
        return $this->belongsTo(Word::class);
    }
}
