<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\Team;
use Illuminate\Http\Request;

//movie==player
//director==team
class PlayerController extends Controller
{
    public function index()
    {
        return Player::with('team')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            //e gjetem gabimi u kon te number, qeshtu u kon dmth se kom harru me ndryshu veq e kom bo copy paste
            //            'number' => 'required|integer|min:1800|max:' . date('Y'),
 
            'number' => 'required|integer|min:0',
            'birth_year' => 'required|integer|min:1900|max:' . date('Y'),
            'team_id' => 'required|exists:teams,id', // Ensure the director exists
        ]);

        $player = Player::create($validated);

        return response()->json($player, 201);
    }

    public function show($id)
    {
        return Player::with(relations: 'team')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'number' => 'required|integer|min:0',
            'birth_year' => 'required|integer|min:1900|max:' . date('Y'),
            'team_id' => 'required|exists:teams,id', // Ensure the director exists
        ]);

        $player = Player::findOrFail($id);
        $player->update($validated);

        return response()->json($player);
    }

    public function destroy($id)
    {
        $player = Player::findOrFail($id);
        $player->delete();

        return response()->json(null, 204);
    }
}
