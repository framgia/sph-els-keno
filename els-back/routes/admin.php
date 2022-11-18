<?php

use App\Http\Controllers\Admin\AuthenticationController;
use Illuminate\Support\Facades\Route;


Route::post('/login',[AuthenticationController::class, 'login']);

Route::group( ['middleware' => ['auth:admin-api','scopes:admin'] ],function(){
    Route::controller(AuthenticationController::class)->group(function () {
        Route::get('/details','details');
        Route::post('/logout','logout');
    });
});