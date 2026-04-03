<?php

use App\Http\Controllers\InternshipApplicationController;
use App\Http\Controllers\AdminInternshipController;
use Illuminate\Support\Facades\Route;

// Render halaman utama via Inertia shorthand (tanpa perlu method index di controller)
Route::inertia('/', 'home')->name('home');

// Handle internship form submission — butuh controller untuk proses & simpan data
Route::post('/apply', [InternshipApplicationController::class, 'store'])->name('apply');

// Admin routes — require auth middleware
Route::middleware(['auth', 'web'])->group(function () {
    // Admin dashboard
    Route::get('/admin', [AdminInternshipController::class, 'dashboard'])->name('admin.index');

    // API routes untuk admin
    Route::prefix('api/admin')->middleware('web')->group(function () {
        // Specific routes harus didefinisikan terlebih dahulu
        Route::get('/internships/export', [AdminInternshipController::class, 'export']);

        // General routes
        Route::get('/internships', [AdminInternshipController::class, 'index']);
        Route::delete('/internships/{id}', [AdminInternshipController::class, 'destroy']);
        Route::get('/internships/{id}/resume', [AdminInternshipController::class, 'downloadResume']);
    });
});

require __DIR__.'/settings.php';


