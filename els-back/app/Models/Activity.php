<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'activityable_id',
        'activityable_type',
        'action'
    ];

    protected $appends = ['type'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function activityable() {   
        return $this->morphTo();
    }

    public function getTypeAttribute() {
        if($this->activityable instanceof Following)
            return 'followings';
        else if ($this->activityable instanceof Result)
            return 'results';
    }

    public function scopeGetActivities($query, $user_ids) {
        return $query->whereIn('user_id',$user_ids)->with('activityable','user')->orderBy('created_at','desc');
    }
}
