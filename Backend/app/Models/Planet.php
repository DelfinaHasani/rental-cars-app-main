<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planet extends Model
{
    protected $fillable = ['name', 'type','is_deleted'];

    public function satellites()
{
    return $this->hasMany(Satellite::class);
}
    use HasFactory;
}
