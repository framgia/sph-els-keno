<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $per_page = $request->query('per_page') ?? 10;

        return User::paginate($per_page);
    }

    public function followOrUnfollow(Request $request) 
    {
        $user = $request->user();

        if($request->follow == 1) {
            $user->follows()->updateOrCreate(
                ["followed_id" => $request->followed_id],
            );
        } else if($request->follow == 0) {
            $user->follows()->where('followed_id',$request->followed_id)->delete();
        }

        return $user;
    }
}
