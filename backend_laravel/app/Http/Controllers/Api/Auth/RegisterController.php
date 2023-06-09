<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class RegisterController extends Controller
{
    /**
     * Handle the registration form submission.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:30',
            'email' => 'required|string|email|max:50|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'last_Name' => 'required|string|max:30',
            'second_Last_Name' => 'required|string|max:30',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'last_Name' => $request->input('last_Name'),
            'second_Last_Name' => $request->input('second_Last_Name'),
        ]);
        if($request->input('role') === null){
        $user->assignRole('User');
        }else{
            $user->assignRole($request->input('role'));
        }
        return response()->json([
            'user' => $user,
        ], 201);
    }
}