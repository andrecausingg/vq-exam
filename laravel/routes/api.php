<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CountryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('store', [CountryController::class, 'store']);
Route::get('show/{id}', [CountryController::class, 'show']);
Route::get('edit/{id}', [CountryController::class, 'edit']);
Route::post('update/{id}', [CountryController::class, 'update']);
Route::delete('destroy/{id}', [CountryController::class, 'destroy']);

