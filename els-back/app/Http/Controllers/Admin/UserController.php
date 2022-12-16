<?php

namespace App\Http\Controllers\Admin;

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
        $user->load('learned_words.word','follows','followers','results');
    
        return response()->json($user, 200);
    }
}
