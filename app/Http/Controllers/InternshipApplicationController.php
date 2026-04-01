<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInternshipApplicationRequest;
use App\Models\InternshipApplication;
use Illuminate\Http\RedirectResponse;

class InternshipApplicationController 
{
    // Proses submit form internship — simpan data & file ke storage
    public function store(StoreInternshipApplicationRequest $request): RedirectResponse
    {
        // Simpan file PDF resume ke storage/app/public/resumes
        $resumePath = $request->file('resume')->store('resumes', 'public');

        // Simpan data pendaftaran ke database
        InternshipApplication::create([
            'first_name'  => $request->string('first_name'),
            'last_name'   => $request->string('last_name'),
            'email'       => $request->string('email'),
            'phone'       => $request->string('phone'),
            'about'       => $request->string('about'),
            'resume_path' => $resumePath,
        ]);

        // Kirim flash message sukses ke frontend via Inertia
        return back()->with('success', 'Application submitted successfully!');
    }
}
