<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Employee;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    public function index()
    {
        return Contract::with('employee')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'employee_id' => 'required|exists:employees,id', // Ensure the director exists
        ]);

        $contract = Contract::create($validated);

        return response()->json($contract, 201);
    }

    public function show($id)
    {
        return Contract::with('employee')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'required|string|max:255',
            'employee_id' => 'required|exists:employees,id', // Ensure the director exists
        ]);

        $contract = Contract::findOrFail($id);
        $contract->update($validated);

        return response()->json($contract);
    }

    public function destroy($id)
    {
        $contract = Contract::findOrFail($id);
        $contract->delete();

        return response()->json(null, 204);
    }
}
