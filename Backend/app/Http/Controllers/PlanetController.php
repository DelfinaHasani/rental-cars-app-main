<?php

namespace App\Http\Controllers;

use App\Models\Planet;
use Illuminate\Http\Request;

class PlanetController extends Controller
{
    public function index()
    {
        return Planet::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
        ]);

        $planet = Planet::create($validated);

        return response()->json($planet, 201);
    }

    public function show($id)
    {
        $planet = Planet::findOrFail($id);
        return response()->json($planet);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
        ]);

        $planet = Planet::findOrFail($id);
        $planet->update($validated);

        return response()->json($planet);
    }

    public function destroy($id)
    {
        $planet = Planet::findOrFail($id);
        $planet->is_deleted = true; // Set is_deleted to true (1)
        $planet->save();

    return response()->json(['message' => 'Planet soft deleted successfully.'], 200);

    }
}
