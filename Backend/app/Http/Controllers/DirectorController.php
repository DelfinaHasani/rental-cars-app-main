<?php

namespace App\Http\Controllers;

use App\Models\Director;
use Illuminate\Http\Request;

class DirectorController extends Controller
{
    public function index()
    {
        return Director::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'birth_year' => 'required|integer|min:1800|max:' . date('Y'),
        ]);

        $director = Director::create($validated);

        return response()->json($director, 201);
    }

    public function show($id)
    {
        $director = Director::findOrFail($id);
        return response()->json($director);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'birth_year' => 'sometimes|required|integer|min:1800|max:' . date('Y'),
        ]);

        $director = Director::findOrFail($id);
        $director->update($validated);

        return response()->json($director);
    }

    public function destroy($id)
    {
        $director = Director::findOrFail($id);
        $director->delete();

        return response()->json(null, 204);
    }
}
