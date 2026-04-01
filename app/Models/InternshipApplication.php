<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InternshipApplication extends Model
{
    use HasFactory;

    // Field yang boleh diisi via mass assignment
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'about',
        'resume_path',
    ];
}
