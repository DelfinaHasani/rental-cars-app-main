<?php

namespace App\Http\Controllers;

use App\Models\Rent;
use Illuminate\Http\Request;
use PDF;
class RentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $allRents = Rent::all();
        $results = [];
        foreach ($allRents as $rent) {
            $obj  = [
                    'id' => $rent->id,
                    // car info
                    'car_id' => $rent->cars->id,
                    'brand' => $rent->cars->brand,
                    'price' => $rent->cars->price,
                    'photo' => $rent->cars->photo1,
                    'fuel_type' => $rent->cars->fuel_type,
                    // user info
                    'user_id' => $rent->user->id,
                    'firstname' => $rent->user->firstname,
                    'telephone' => $rent->user->telephone,
                    //rents info
                    'total' => $rent->price,
                    'rental_date' => $rent->rental_date,
                    'return_date' => $rent->return_date,
                ];

            $results[] = $obj;
        }

        return $results;

     
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
{
    // Validate incoming request
    $request->validate([
        'rental_date' => 'required|date',
        'return_date' => 'required|date|after_or_equal:rental_date',
        'price' => 'required|numeric',
        'user_id' => 'required|exists:users,id',
        'car_id' => 'required|exists:cars,id',
    ]);

    $car_id = $request->input('car_id');
    $rental_date = $request->input('rental_date');
    $return_date = $request->input('return_date');

    // Check if the car is already booked for the selected date range
    $existingRentals = Rent::where('car_id', $car_id)
        ->where(function ($query) use ($rental_date, $return_date) {
            $query->whereBetween('rental_date', [$rental_date, $return_date])
                  ->orWhereBetween('return_date', [$rental_date, $return_date])
                  ->orWhere(function ($query) use ($rental_date, $return_date) {
                      $query->where('rental_date', '<', $rental_date)
                            ->where('return_date', '>', $return_date);
                  });
        })
        ->exists();

    // If the car is already booked, return an error
    if ($existingRentals) {
        return response()->json(['error' => 'This car is not available for the selected dates.'], 400);
    }

    // If available, proceed with the booking
    $rental = new Rent();
    $rental->rental_date = $request->rental_date;
    $rental->return_date = $request->return_date;
    $rental->price = $request->price;
    $rental->user_id = $request->user_id;
    $rental->car_id = $request->car_id;
    $rental->save();

    return response()->json(['success' => 'Car booked successfully!', 'data' => $rental], 200);
}

    


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        return Rent::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $fields = $request->validate([
            'rental_date' => 'required|date',
            'return_date' => 'required|date',
            'price' => 'required|numeric',
            'user_id' => 'required|exists:users,id',
            'car_id' => 'required|exists:cars,id',
        ]);
        if(!$fields){
            return ['message' => 'not valid fields to update'];
        }

        $rent = Rent::find($id);
        $rent->update($fields);

        return $rent;
        

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $rent = Rent::find($id);
        if(!$rent) {
            return ['message' => 'rent dont exist'];
        }
        return $rent->delete();
    }

    /**
     * Show list of rents for a user
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function myRents($id)
    {
        // Assuming the $id parameter is the user ID
        $rents = Rent::where('user_id', $id)->orderBy('id', 'desc')->get();
        $results = [];
        foreach($rents as $rent){
            $obj  = [
                'id' => $rent->id,
                'car_id' => $rent->cars->id,
                'brand' => $rent->cars->brand,
                'model' => $rent->cars->model,
                'photo' => $rent->cars->photo1,
                'fuel_type' => $rent->cars->fuel_type,
                'price' => $rent->price,
                'rental_date' => $rent->rental_date,
                'return_date' => $rent->return_date,
            ];

            $results[] = $obj;
        }

        return $results;
    }


    /**
     * Show form to edit a rent 
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function editRent($id)
    {
        // Assuming the $id parameter is the user ID
        $rent = Rent::find($id);
  
        $obj  = [
            'id' => $rent->id,
            'brand' => $rent->cars->brand,
            'rental_date' => $rent->rental_date,
            'return_date' => $rent->return_date,
        ];
  
        return $obj;
    }




    // ...


    public function downloadRent($id)
    {
        $rent = Rent::findOrFail($id);

        // Prepare data for the PDF
        $obj = [
            'id' => $rent->id,
            'car_id' => $rent->cars->id,
            'brand' => $rent->cars->brand,
            'price' => $rent->cars->price,
            'photo' => $rent->cars->photo1,
            'fuel_type' => $rent->cars->fuel_type,
            'user_id' => $rent->user->id,
            'firstname' => $rent->user->firstname,
            'telephone' => $rent->user->telephone,
            'total' => $rent->price,
            'rental_date' => $rent->rental_date,
            'return_date' => $rent->return_date,
        ];

        // Generate the PDF using the view and data
        $pdf = PDF::loadView('pdfs.rent_pdf', compact('obj'))->setPaper('A4', 'portrait');

        // Generate the filename
        $filename = ''.$rent->user->firstname.'_rent_facture.pdf';

        // Download the PDF file
            return response($pdf->output(), 200)
        ->header('Content-Type', 'application/pdf')
        ->header('Content-Disposition', 'attachment; filename="'.$filename.'"');
    }

}
