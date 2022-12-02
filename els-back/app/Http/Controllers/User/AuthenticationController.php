<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\User;
use Illuminate\Http\Request;

class AuthenticationController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if(auth()->guard('user')->attempt(['email' => request('email'), 'password' => request('password')])){

            config(['auth.guards.api.provider' => 'user']);
            
            $user = User::select('users.*')->find(auth()->guard('user')->user()->id);
            $success =  $user;
            $success['token'] =  $user->createToken('SelsApp',['user'])->accessToken; 

            return response()->json($success, 200);
        }else{ 
            return response()->json(['error' => ['Username and Password are Wrong.']], 200);
        }
    }

    public function register(Request $request) 
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed',
        ]);

        if(User::where('email',$request->email)->exists()) return response()->json(['error' => ['Credentials not valid.']], 422);

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => bcrypt($request->password)
        ]);

        return $user;
    }

    public function logout(Request $request)
    {
        auth()->guard('user')->logout();

        $request->user()->token()->revoke();

        return "success";
    }


    public function details(Request $request)
    {
        $user = $request->user()->load('learned_words.word','follows','followers','results');

        $user->activities = Activity::whereIn('user_id',$user->scopeMineAndFollowingIds())->with('activityable','user')->orderBy('created_at','desc')->get();

        return response()->json($user, 200);
    }
}
