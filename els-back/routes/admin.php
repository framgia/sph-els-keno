<?php

use App\Http\Controllers\Admin\AuthenticationController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ChoiceController;
use App\Http\Controllers\Admin\QuizController;
use App\Http\Controllers\Admin\WordControlller;
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

    Route::controller(QuizController::class)->group(function () {
        Route::get('/quizzes','index');
        Route::get('/quizzes/{quiz}','show');
        Route::post('/quizzes','store');
        Route::put('/quizzes/{quiz}','update');
        Route::delete('/quizzes/{quiz}','delete');
    });
    
    Route::controller(WordControlller::class)->group(function () {
        Route::get('/words','index');
        Route::get('/words/{word}','show');
        Route::post('/words','store');
        Route::put('/words/{word}','update');
        Route::delete('/words/{word}','delete');
    });

    Route::controller(ChoiceController::class)->group(function () {
        Route::get('/choices','index');
        Route::get('/choices/{choice}','show');
        Route::post('/choices','store');
        Route::post('/choices/set-to-correct/{choice}','setChoiceToCorrectAnswer');
        Route::put('/choices/{choice}','update');
        Route::delete('/choices/{choice}','delete');
    });
});