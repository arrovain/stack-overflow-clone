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
  

Route::controller(UserController::class)->group(function() {
    Route::post('user/login','auth');
    Route::post('user/register','store');
});
});