<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Satellite extends Model
{
    protected $fillable = ['name', 'is_deleted', 'planet_id'];
   
    public function planet()
    {
        return $this->belongsTo(Planet::class);
    }
    use HasFactory;
}
