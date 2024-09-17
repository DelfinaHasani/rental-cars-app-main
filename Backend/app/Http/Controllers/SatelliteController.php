<?php

namespace App\Http\Controllers;

use App\Models\Satellite;
use App\Models\Planet;
use Illuminate\Http\Request;

class SatelliteController extends Controller
{
    //director=planet
    //movie=satellite
    public function index()
    {
        return Satellite::with('planet')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'planet_id' => 'required|exists:planets,id', // Ensure the director exists
        ]);

        $satellite = Satellite::create($validated);

        return response()->json($satellite, 201);
    }

    public function show($id)
    {
        return Satellite::with('planet')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'planet_id' => 'required|exists:planets,id', // Ensure the director exists
        ]);

        $satellite = Satellite::findOrFail($id);
        $satellite->update($validated);

        return response()->json($satellite);
    }

    public function destroy($id)
    {
        $satellite = Satellite::findOrFail($id);
        $satellite->is_deleted = true; // Set is_deleted to true (1)
        $satellite->save();

    return response()->json(['message' => 'Satellite soft deleted successfully.'], 200);
  }
}
