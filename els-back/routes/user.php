<?php

use App\Http\Controllers\User\AuthenticationController;
use App\Http\Controllers\User\CategoryController;
use App\Http\Controllers\User\QuizController;
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

    Route::controller(CategoryController::class)->group(function () {
        Route::get('/categories','index');
        Route::get('/categories/{category}','show');        
    });
    Route::controller(UserController::class)->group(function() {
        Route::get('users','index');
        Route::get('users/{user}','show');
        Route::post('follow-or-unfollow','followOrUnfollow');
    });
    Route::controller(QuizController::class)->group(function () {
        Route::get('/quizzes/{quiz}','show');
        Route::post('quiz-check-results/{id}','quizResult');
    });
});