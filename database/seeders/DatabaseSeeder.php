<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    // Jalankan semua seeder
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
        ]);
    }
}

