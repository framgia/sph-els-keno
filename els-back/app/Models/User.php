<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function results(){
        return $this->hasMany(Result::class);
    }

    public function learned_words() {
        return $this->hasMany(LearnedWord::class);
    }

    public function follows() {
        return $this->hasMany(Following::class,'follower_id');
    }

    public function followers() {
        return $this->hasMany(Following::class,'followed_id');
    }

    public function activities() {
        return $this->hasMany(Activity::class);
    }

    public function scopeMineAndFollowingIds() {
        $followed_ids = $this->follows()->pluck('id')->toArray();
        $followed_ids[] = $this->id;

        return $followed_ids;
    }

    public function addLearnedWords($checked_answers,$result_id)
    {
        foreach($checked_answers as $checked_answer){
            if($checked_answer['correct'] === 1) {
                $this->learned_words()->create([
                    'word_id' => $checked_answer['word']['id'],
                    'result_id' => $result_id
                ]);
            }
        }
    }

    public function getQuizzesTaken() 
    {
        return $this->results()->pluck('quiz_id');
    }

    public function quizCheckIfTaken($quiz_id)
    {
        return $this->results()->where('quiz_id',$quiz_id)->exists();
    }
}
