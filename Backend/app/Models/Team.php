<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = ['name'];
//te tabela e pare e shtojme ket metode- kujdes nuk jon te njejta
//un e kom msu si permendsh gjithmone tabelen e pare e konsideroj si director se osht pa foreign key
//tabelen e dyt si movie me foreign key edhe tani e di cila osht cila
    public function players()
    {
        return $this->hasMany(Player::class);
    }
    use HasFactory;
}
