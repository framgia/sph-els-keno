<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    use HasFactory;

    protected $fillable = ['quiz_id','word'];

    public function quiz() {
        return $this->belongsTo(Quiz::class);
    }

    public function choices() {
        return $this->hasMany(Choice::class);
    }
    
    public function learned_words() {
        return $this->hasMany(LearnedWord::class);
    }

}
