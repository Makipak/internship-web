<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInternshipApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    // Aturan validasi untuk setiap field form
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:100'],
            'last_name'  => ['required', 'string', 'max:100'],
            'email'      => ['required', 'email', 'max:255'],
            'phone'      => ['required', 'string', 'max:20'],
            'about'      => ['required', 'string', 'max:2000'],
            'resume'     => ['required', 'file', 'mimes:pdf', 'max:5120'],
        ];
    }

    // Pesan error validasi yang lebih deskriptif
    public function messages(): array
    {
        return [
            'resume.mimes' => 'Resume harus berformat PDF.',
            'resume.max'   => 'Ukuran resume tidak boleh melebihi 5MB.',
            'email.email'  => 'Masukkan alamat email yang valid.',
        ];
    }
}
