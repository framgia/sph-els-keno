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
}
