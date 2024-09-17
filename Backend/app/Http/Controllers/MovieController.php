<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Director;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function index()
    {
        return Movie::with('director')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'release_year' => 'required|integer|min:1800|max:' . date('Y'),
            'director_id' => 'required|exists:directors,id', // Ensure the director exists
        ]);

        $movie = Movie::create($validated);

        return response()->json($movie, 201);
    }

    public function show($id)
    {
        return Movie::with('director')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'release_year' => 'sometimes|required|integer|min:1800|max:' . date('Y'),
            'director_id' => 'sometimes|required|exists:directors,id',
        ]);

        $movie = Movie::findOrFail($id);
        $movie->update($validated);

        return response()->json($movie);
    }

    public function destroy($id)
    {
        $movie = Movie::findOrFail($id);
        $movie->delete();

        return response()->json(null, 204);
    }
}
