<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;

class AuthenticationController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if(auth()->guard('admin')->attempt(['email' => request('email'), 'password' => request('password')])){

            config(['auth.guards.api.provider' => 'admin']);
            
            $admin = Admin::select('admins.*')->find(auth()->guard('admin')->user()->id);
            $success =  $admin;
            $success['token'] =  $admin->createToken('SelsApp',['admin'])->accessToken; 

            return response()->json($success, 200);
        }else{ 
            return response()->json(['error' => ['Username and Password are Wrong.']], 200);
        }
    }

    public function logout(Request $request)
    {
        auth()->guard('admin')->logout();

        $request->user()->token()->revoke();

        return "success";
    }


    public function details(Request $request)
    {
        return response()->json($request->user(), 200);
    }
}
