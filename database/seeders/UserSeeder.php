<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Seed the admin user for the application.
     * 
     * Default credentials (CHANGE IMMEDIATELY IN PRODUCTION):
     * - Username: admin
     * - Password: password
     */
    public function run(): void
    {
        // Create admin user for dashboard access
        User::factory()->create([
            'name' => 'Administrator',
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
    }
}