<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LearnedWord extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'word_id',
        'result_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function word() {
        return $this->belongsTo(Word::class);
    }

    public function result() {
        return $this->belongsTo(Result::class);
    }
}