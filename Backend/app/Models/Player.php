<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $fillable = ['name', 'number', 'birth_year' ,'team_id'];
   //kur ta krijojme entity me foreign key shtohet edhe qekjo metoda team=director qe e percakton
   //lidhjen ni me shume ose shume me ni edhe veq masi te krijojet tabela dyt dmmth tek te dy modelet
   // i shtojme kto metoda shiko ne vazhdim
    public function team()
    {
        return $this->belongsTo(Team::class);
    }
    use HasFactory;
}