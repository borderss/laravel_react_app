<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
          'name' => 'required',
          'email' => 'required|email',
          'password' => 'required',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);
        return response()->json([
          'data' => $user
        ]);
    }

    public function login(Request $request)
    {
      $validated = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
      ]);

      if (!Auth::attempt($validated)) {
        return response()->json([
          'data' => 'Tu esi dalbajobs'
        ]);
      };

      /** @var \App\Models\MyUserModel $user **/
      $user = Auth::user();
      
      $token = $user->createToken('accessToken')->accessToken;
      return response()->json([
        'user' => new UserResource(auth()->user()),
        'access_token' => $token,
      ]);
    }

    public function logout() {
      /** @var \App\Models\MyUserModel $user **/
      $user = Auth::user();

      $user->token()->revoke();

      return response()->json([
          'message' => [
              'type' => 'success',
              'data' => 'Veiksmīga izrakstīšanās.'
          ]
      ]);
  }

  public function user() {
      return response()->json(new UserResource(auth()->user()));
  }
}
