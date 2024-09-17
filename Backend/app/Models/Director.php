<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Director extends Model
{

    protected $fillable = ['name', 'birth_year'];

    public function movies()
{
    return $this->hasMany(Movie::class);
}
    use HasFactory;
}
