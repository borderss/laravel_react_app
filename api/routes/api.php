<?php

use App\Http\Controllers\Api\PostCommentController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::get('/tasks', [TaskController::class, 'index']);
// Route::post('/tasks', [TaskController::class, 'store']);
// Route::get('/tasks/{id}', [TaskController::class, 'show']);
// Route::put('/tasks/{id}', [TaskController::class, 'update']);
// Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);
// ↓
// Route::apiResource('/tasks', TaskController::class);

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:api')->group(function() {
  Route::get('/user', [UserController::class, 'user']);
  Route::get('/logout', [UserController::class, 'logout']);
  Route::apiResource('/tasks', TaskController::class);
  Route::apiResource('/products', ProductController::class);
  Route::apiResource('/posts', PostController::class);
  Route::apiResource('/postComments', PostCommentController::class);
});