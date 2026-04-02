<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    // Buat user admin dan test user
    public function run(): void
    {
        // User admin untuk akses dashboard
        User::factory()->create([
            'name' => 'Administrator',
            'username' => 'admin',
            'email' => 'admin@aissential.com',
            'password' => Hash::make('password123'),
        ]);

        // Test user untuk development
        User::factory()->create([
            'name' => 'Test User',
            'username' => 'testuser',
            'email' => 'test@aissential.com',
            'password' => Hash::make('password123'),
        ]);
    }
}