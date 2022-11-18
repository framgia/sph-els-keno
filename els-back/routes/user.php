<?php

use App\Http\Controllers\User\AuthenticationController;
use Illuminate\Support\Facades\Route;


Route::post('/login',[AuthenticationController::class, 'login']);

Route::group( ['middleware' => ['auth:user-api','scopes:user'] ],function(){
    Route::controller(AuthenticationController::class)->group(function () {
        Route::get('/details','details');
        Route::post('/logout','logout');
    });
});