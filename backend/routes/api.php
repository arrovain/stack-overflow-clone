<?php

use App\Http\Controllers\Api\AnswerController;
use App\Http\Controllers\Api\QuestionController;
use App\Http\Controllers\Api\UserController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('user', function (Request $request) {
        return UserResource::make($request->user());
    });
    Route::controller(UserController::class)->group(function() {
        Route::post('user/logout','logout');
        Route::put('update/profile','updateUserInfos');
        Route::put('update/password','updateUserPassword');
    });
    Route::controller(QuestionController::class)->group(function() {
        //get logged in user questions
        Route::get('user/questions','authUserQuestions');
        //store question
        Route::post('question/store','store');
        //updating questions
        Route::put('update/{question}/question','update');
        //deleting questions
        Route::delete('delete/{question}/question','destroy');
        //vote up questions
        Route::put('voteup/{question}/question','voteUp');
        //vote down questions
        Route::put('votedown/{question}/question','voteDown');
    });
    Route::controller(AnswerController::class)->group(function() {
        //show answer
        Route::get('answers/{answer}/show','show');
        //store answer
        Route::post('answer/{question}/store','store');
        //updating answers
        Route::put('update/{question}/{answer}/answer','update');
        //deleting answers
        Route::delete('delete/{question}/{answer}/answer','destroy');
        //vote up answers
        Route::put('voteup/{answer}/answer','voteUp');
        //vote down answers
        Route::put('votedown/{answer}/answer','voteDown');
        //mark answer as the best
        Route::put('mark/{answer}/best','markAsBest');
    });
});   
  

Route::controller(UserController::class)->group(function() {
    Route::post('user/login','auth');
    Route::post('user/register','store');
});
Route::controller(QuestionController::class)->group(function() {
    //get all the questions
    Route::get('questions','index');
    //show question
    Route::get('question/{question}/show','show');
    //get questions by tag
    Route::get('tag/{tag}/questions','questionsByTag');
    //get questions by user
    Route::post('user/questions','questionsByUser');
});

