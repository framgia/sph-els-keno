<?php

use App\Http\Controllers\Admin\AuthenticationController;
use App\Http\Controllers\Admin\CategoryController;
use Illuminate\Support\Facades\Route;


Route::post('/login',[AuthenticationController::class, 'login']);

Route::group( ['middleware' => ['auth:admin-api','scopes:admin'] ],function(){
    Route::controller(AuthenticationController::class)->group(function () {
        Route::get('/details','details');
        Route::post('/logout','logout');
    });

    Route::controller(CategoryController::class)->group(function () {
        Route::get('/categories','index');
        Route::get('/categories/{category}','show');
        Route::post('/categories','store');
        Route::put('/categories/{category}','update');
        Route::delete('/categories/{category}','delete');
    });
});