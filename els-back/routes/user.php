<?php

use App\Http\Controllers\User\AuthenticationController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;


Route::post('/login',[AuthenticationController::class, 'login']);
Route::post('/register',[AuthenticationController::class, 'register']);

Route::group( ['middleware' => ['auth:user-api','scopes:user'] ],function(){
    Route::controller(AuthenticationController::class)->group(function () {
        Route::get('/details','details');
        Route::post('/logout','logout');
        Route::post('/update-credentials','updateCredentials');
        Route::post('/update-password','updatePassword');
    });

    Route::controller(UserController::class)->group(function() {
        Route::get('users','index');
        Route::get('users/{user}','show');
        Route::post('follow-or-unfollow','followOrUnfollow');
    });
});