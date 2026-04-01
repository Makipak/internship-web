<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('internship_applications', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 100);           // Nama depan pelamar
            $table->string('last_name', 100);            // Nama belakang pelamar
            $table->string('email', 255);                // Email pelamar
            $table->string('phone', 20);                 // Nomor telepon pelamar
            $table->text('about');                       // Deskripsi diri pelamar
            $table->string('resume_path');               // Path file PDF resume
            $table->timestamps();                        // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('internship_applications');
    }
};
