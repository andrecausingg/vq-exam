<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CountryModel extends Model
{
    use HasFactory;
    protected $table = 'countries_tbl';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'url_flag',
        'population',
        'area',
        'description'
    ];       
}
