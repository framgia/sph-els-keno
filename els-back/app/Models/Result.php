<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'quiz_id',
        'score'
    ];

    protected $with = ['quiz'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function quiz() {
        return $this->belongsTo(Quiz::class);
    }

    public function learned_words() {
        return $this->hasMany(LearnedWord::class);
    }

    public function activities() {
        return $this->morphMany(Activity::class,'activityable');
    }
}
