<?php

use App\Models\InternshipApplication;
use App\Models\User;

test('admin dashboard requires authentication', function () {
    $response = $this->get(route('admin.dashboard'));
    $response->assertRedirectToRoute('login');
});

test('authenticated user can view admin dashboard', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('admin.dashboard'));
    $response->assertOk();
});

test('can fetch paginated internship applications', function () {
    $user = User::factory()->create();
    InternshipApplication::factory(15)->create();

    $response = $this->actingAs($user)->getJson('/api/admin/internships');
    $response->assertOk();
    $response->assertJsonStructure([
        'data' => ['*' => ['id', 'first_name', 'last_name', 'email', 'phone', 'about', 'resume_path']],
        'meta' => ['current_page', 'last_page', 'per_page', 'total']
    ]);
    $this->assertEquals(10, count($response->json('data')));
});

test('can delete internship application', function () {
    $user = User::factory()->create();
    $app = InternshipApplication::factory()->create();

    $response = $this->actingAs($user)->deleteJson("/api/admin/internships/{$app->id}");
    $response->assertOk();
    $this->assertDatabaseMissing('internship_applications', ['id' => $app->id]);
});

test('can export internship applications', function () {
    $user = User::factory()->create();
    InternshipApplication::factory(5)->create();

    $response = $this->actingAs($user)->getJson('/api/admin/internships/export');
    $response->assertOk();
    $response->assertJsonStructure(['csv', 'fileName']);
    $this->assertStringContainsString('first_name', $response->json('csv'));
});
