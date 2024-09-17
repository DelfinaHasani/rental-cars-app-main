<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = ['name', 'surname'];

    public function contracts()
{
    return $this->hasMany(Contract::class);
}
    use HasFactory;
}
