<?php

namespace App\Http\Controllers;

use App\Models\CountryModel;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CountryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validate the request
            $request->validate([
                'name' => 'required|string|max:255',
                'url_flag' => 'required',
                'population' => 'required|integer',
                'area' => 'required|numeric',
                'description' => 'string',
            ]);


            // Save the relevant data to the database using Eloquent
            $data = CountryModel::create([
                'name' => $request->name,
                'url_flag' => $request->url_flag,
                'population' => $request->population,
                'area' => $request->area,
                'description' => $request->description ?? null,
            ]);

            if ($data) {
                return response()->json([
                    'message' => 'Data created successfully',
                    'id' => $data->id,
                ], Response::HTTP_CREATED);
            }

            // Handle the case when the country is not found
            return response()->json([
                'message' => 'Country not found',
            ], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            // Handle exceptions and return an error response with CORS headers
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();

            // Create a JSON error response
            $response = [
                'success' => false,
                'error' => [
                    'code' => $errorCode,
                    'message' => $errorMessage,
                ],
            ];

            // Add additional error details if available
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                $response['error']['details'] = $e->errors();
            }

            // Return the JSON error response with CORS headers and an appropriate HTTP status code
            return response()->json($response, Response::HTTP_INTERNAL_SERVER_ERROR)->header('Content-Type', 'application/json');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $data = CountryModel::find($id);
            if (!$data) {
                return response()->json([
                    'messages' => 'Data Not Found'
                ], Response::HTTP_UNAUTHORIZED);
            }

            return response()->json([
                'data' => $data
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            // Handle exceptions and return an error response with CORS headers
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();

            // Create a JSON error response
            $response = [
                'success' => false,
                'error' => [
                    'code' => $errorCode,
                    'message' => $errorMessage,
                ],
            ];

            // Add additional error details if available
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                $response['error']['details'] = $e->errors();
            }

            // Return the JSON error response with CORS headers and an appropriate HTTP status code
            return response()->json($response, Response::HTTP_INTERNAL_SERVER_ERROR)->header('Content-Type', 'application/json');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {
            $data = CountryModel::find($id);
            if (!$data) {
                return response()->json([
                    'messages' => 'Data Not Found'
                ], Response::HTTP_UNAUTHORIZED);
            }

            return response()->json([
                'data' => $data
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            // Handle exceptions and return an error response with CORS headers
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();

            // Create a JSON error response
            $response = [
                'success' => false,
                'error' => [
                    'code' => $errorCode,
                    'message' => $errorMessage,
                ],
            ];

            // Add additional error details if available
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                $response['error']['details'] = $e->errors();
            }

            // Return the JSON error response with CORS headers and an appropriate HTTP status code
            return response()->json($response, Response::HTTP_INTERNAL_SERVER_ERROR)->header('Content-Type', 'application/json');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $data = CountryModel::find($id);

            if (!$data) {
                return response()->json([
                    'messages' => 'Data Not Found'
                ], Response::HTTP_NOT_FOUND);
            }

            // Validate the request
            $request->validate([
                'name' => 'required',
                'url_flag' => 'required|url',
                'population' => 'required',
                'area' => 'required',
                'description' => 'nullable',
            ]);

            // Check for differences and update only if necessary
            if ($data->name !== $request->input('name')) {
                $data->name = $request->input('name');
            }

            if ($data->population !== $request->input('population')) {
                $data->population = $request->input('population');
            }

            if ($data->area !== $request->input('area')) {
                $data->area = $request->input('area');
            }

            // Check if the input description is empty, and set to null if it is
            if ($request->input('description') === '') {
                $data->description = null;
            } elseif ($data->description !== $request->input('description')) {
                $data->description = $request->input('description');
            }

            // Check if the input url_flag is a valid URL
            if ($data->url_flag !== $request->input('url_flag')) {
                $data->url_flag = $request->input('url_flag');
            }

            // Save only if there are differences
            if ($data->isDirty() && $data->save()) {
                return response()->json([
                    'message' => 'Data update successfully',
                    'data' => $data
                ], Response::HTTP_OK);
            }

            return response()->json([
                'message' => 'No changes to update',
                'data' => $data
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            // Handle exceptions and return an error response with CORS headers
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();

            // Create a JSON error response
            $response = [
                'success' => false,
                'error' => [
                    'code' => $errorCode,
                    'message' => $errorMessage,
                ],
            ];

            // Add additional error details if available
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                $response['error']['details'] = $e->errors();
            }

            // Return the JSON error response with CORS headers and an appropriate HTTP status code
            return response()->json($response, Response::HTTP_INTERNAL_SERVER_ERROR)->header('Content-Type', 'application/json');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $data = CountryModel::find($id);
            if (!$data) {
                return response()->json([
                    'messages' => 'Data Not Found'
                ], Response::HTTP_OK);
            }

            if ($data->delete()) {
                return response()->json([
                    'message' => 'Data delete successfully',
                ], Response::HTTP_OK);
            }
        } catch (\Exception $e) {
            // Handle exceptions and return an error response with CORS headers
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();

            // Create a JSON error response
            $response = [
                'success' => false,
                'error' => [
                    'code' => $errorCode,
                    'message' => $errorMessage,
                ],
            ];

            // Add additional error details if available
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                $response['error']['details'] = $e->errors();
            }

            // Return the JSON error response with CORS headers and an appropriate HTTP status code
            return response()->json($response, Response::HTTP_INTERNAL_SERVER_ERROR)->header('Content-Type', 'application/json');
        }
    }
}
