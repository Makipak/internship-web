<?php

namespace App\Jobs;

use App\Models\InternshipApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Smalot\PdfParser\Parser;
use Illuminate\Support\Facades\Storage;

class ExtractResumeText implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        protected InternshipApplication $application
    ) {}

    public function handle(): void
    {
        $path = Storage::disk('public')->path($this->application->resume_path);

        $parser = new Parser();
        $pdf = $parser->parseFile($path);
        $text = $pdf->getText();

        $this->application->update([
            'resume_text' => $text
        ]);
    }
}