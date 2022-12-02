<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use League\OAuth2\Server\RequestEvent;

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

        if(User::where('email',$request->email)->exists()) return response()->json(['message' => 'Credentials not valid.'], 422);

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
        
        $user->activities = Activity::getActivities($user->mineAndFollowingIds())->get();

        return response()->json($user, 200);
    }

    public function uploadAvatar($avatar,$user_name,$path = 'avatar') 
    {
        if(!$avatar){
            return null;
        }
        list(, $avatar) = explode(',', $avatar);
        $data = base64_decode($avatar);
        $name =  $user_name.date("YmdHis").'.png';

        if(!file_exists(public_path($path))){
            mkdir(public_path($path), 0777, true);
        }

        file_put_contents(public_path() . '/' . $path . '/' . $name, $data);
        return '/'.$path . '/' . $name;
    }

    public function updateCredentials(Request $request)
    {
        return $request->user()->update([
            "name" => $request->name,
            "email" => $request->email,
            "avatar" => $this->uploadAvatar($request->avatar,$request->name),
        ]);
    }

    public function updatePassword(Request $request){
        $request->validate([
            'new_password' => 'required|confirmed',
            'password' => 'required',

        ]);

        if(!Hash::check($request->password,$request->user()->password)){
            return response()->json(['message' => 'Wrong Password.'], 422); 
        }

        $request->user()->update([
            'password' => $request->new_password,
        ]);
    }
}
