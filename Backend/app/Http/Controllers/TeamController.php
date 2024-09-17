<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index()
    {
        return Team::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $team = Team::create($validated);

        return response()->json($team, 201);
    }

    public function show($id)
    {
        $team = Team::findOrFail($id);
        return response()->json($team);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
        ]);

        $team = Team::findOrFail($id);
        $team->update($validated);

        return response()->json($team);
    }

    public function destroy($id)
    {
        $team = Team::findOrFail($id);
        $team->delete();

        return response()->json(null, 204);
    }
}
