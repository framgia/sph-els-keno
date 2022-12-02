<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $per_page = $request->query('per_page') ?? 10;

        return User::paginate($per_page);
    }

    public function show(Request $request, User $user)  
    {
        $authenticated_user = $request->user();
        $user->load('learned_words.word','follows','followers','results');
    
        $user->activities = Activity::whereIn('user_id',$user->scopeMineAndFollowingIds())->with('activityable','user')->orderBy('created_at','desc')->get();
        $user->is_followed_by_user = $authenticated_user->follows()->where('followed_id',$user->id)->exists();

        return response()->json($user, 200);
    }

    public function followOrUnfollow(Request $request) 
    {
        $user = $request->user();

        if($request->is_followed_by_user == 1) {
            $user->follows()->updateOrCreate(
                ["followed_id" => $request->followed_id],
            );
        } else if($request->is_followed_by_user == 0) {
            $user->follows()->where('followed_id',$request->followed_id)->delete();
        }

        return $user;
    }
}
