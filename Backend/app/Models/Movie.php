<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{

    protected $fillable = ['title', 'release_year', 'director_id'];
   
    public function director()
    {
        return $this->belongsTo(Director::class);
    }
    
    use HasFactory;

}
