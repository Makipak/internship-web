<?php

namespace Database\Factories;

use App\Models\InternshipApplication;
use Illuminate\Database\Eloquent\Factories\Factory;

class InternshipApplicationFactory extends Factory
{
    protected $model = InternshipApplication::class;

    // Buat data dummy untuk testing
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->numerify('8###-####-####'),
            'about' => $this->faker->paragraph(),
            'resume_path' => 'resumes/' . $this->faker->uuid() . '.pdf',
        ];
    }
}
