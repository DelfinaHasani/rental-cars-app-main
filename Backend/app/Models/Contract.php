<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    protected $fillable = ['title', 'description', 'employee_id'];
   
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
    use HasFactory;
}
