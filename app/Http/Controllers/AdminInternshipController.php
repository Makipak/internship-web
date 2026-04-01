<?php

namespace App\Http\Controllers;

use App\Models\InternshipApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class AdminInternshipController
{
    // Tampilkan halaman admin dashboard
    public function dashboard(): Response
    {
        return Inertia::render('admin/dashboard');
    }

    // Dapatkan daftar aplikasi dengan pagination dan sorting
    public function index(Request $request): JsonResponse
    {
        $sortBy = $request->query('sort_by', 'first_name');
        $sortDir = $request->query('sort_dir', 'asc');

        // Validasi sort parameter untuk security
        $allowedSortFields = ['first_name', 'last_name', 'email', 'phone', 'created_at'];
        if (!in_array($sortBy, $allowedSortFields)) {
            $sortBy = 'first_name';
        }
        if (!in_array($sortDir, ['asc', 'desc'])) {
            $sortDir = 'asc';
        }

        $paginated = InternshipApplication::orderBy($sortBy, $sortDir)
            ->paginate(10);

        return response()->json([
            'data' => $paginated->items(),
            'meta' => [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
            ],
            'sort' => [
                'by' => $sortBy,
                'direction' => $sortDir,
            ]
        ]);
    }

    // Hapus aplikasi berdasarkan ID
    public function destroy($id): JsonResponse
    {
        try {
            $application = InternshipApplication::findOrFail($id);
            
            // Hapus file resume jika ada
            if ($application->resume_path && file_exists(storage_path('app/public/' . $application->resume_path))) {
                unlink(storage_path('app/public/' . $application->resume_path));
            }

            // Delete dari database
            $application->forceDelete();

            return response()->json(['message' => 'Application deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    // Download resume PDF
    public function downloadResume($id): \Symfony\Component\HttpFoundation\BinaryFileResponse
    {
        $application = InternshipApplication::findOrFail($id);

        if (!$application->resume_path || !file_exists(storage_path('app/public/' . $application->resume_path))) {
            abort(404, 'Resume not found');
        }

        return response()->download(
            storage_path('app/public/' . $application->resume_path),
            $application->first_name . '_' . $application->last_name . '_resume.pdf'
        );
    }

    // Export semua data ke CSV
    public function export(): JsonResponse
    {
        $applications = InternshipApplication::orderBy('created_at', 'desc')->get();

        $csv = "first_name,last_name,email,phone,about,created_at\n";
        
        foreach ($applications as $app) {
            $csv .= '"' . addslashes($app->first_name) . '",';
            $csv .= '"' . addslashes($app->last_name) . '",';
            $csv .= '"' . $app->email . '",';
            $csv .= "\"'" . $app->phone . "\",";
            $csv .= '"' . addslashes($app->about) . '",';
            $csv .= '"' . $app->created_at->format('Y-m-d H:i:s') . '"' . "\n";
        }

        $fileName = 'internship_applications_' . now()->format('Y-m-d_H-i-s') . '.csv';

        return response()->json([
            'csv' => $csv,
            'fileName' => $fileName
        ]);
    }
}
