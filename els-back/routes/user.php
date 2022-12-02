<?php

use App\Http\Controllers\User\AuthenticationController;
use App\Http\Controllers\User\CategoryController;
use Illuminate\Support\Facades\Route;


Route::post('/login',[AuthenticationController::class, 'login']);
Route::post('/register',[AuthenticationController::class, 'register']);

Route::group( ['middleware' => ['auth:user-api','scopes:user'] ],function(){
    Route::controller(AuthenticationController::class)->group(function () {
        Route::get('/details','details');
        Route::post('/logout','logout');
    });

    Route::controller(CategoryController::class)->group(function () {
        Route::get('/categories','index');
        Route::post('/categories/{category}','logout');
    });
});