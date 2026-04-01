import { useState } from 'react';

// Props: nama file terpilih, pesan error validasi, dan callback saat file dipilih
interface ResumeUploadProps {
    fileName: string;
    error?:   string;
    onChange: (file: File) => void;
}

export default function ResumeUpload({ fileName, error, onChange }: ResumeUploadProps) {
    const [isDragOver, setIsDragOver] = useState(false);

    // Handle file yang di-drop — hanya terima PDF
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type === 'application/pdf') onChange(file);
    };

    // Handle file yang dipilih via dialog browser
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onChange(file);
    };

    return (
        <div>
            {/* Area drag & drop */}
            <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onClick={() => document.getElementById('resume-input')?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                    isDragOver
                        ? 'border-white/40 bg-white/[0.06]'
                        : 'border-white/15 hover:border-white/25 hover:bg-white/[0.04]'
                }`}
            >
                {/* Input file tersembunyi — hanya menerima PDF */}
                <input
                    id="resume-input"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {/* Tampilkan nama file jika sudah dipilih, atau placeholder */}
                {fileName ? (
                    <div className="flex items-center justify-center gap-3 text-white/70">
                        <span className="text-2xl">📄</span>
                        <span className="text-sm font-medium truncate max-w-xs">{fileName}</span>
                    </div>
                ) : (
                    <>
                        <span className="text-3xl mb-3 block">📄</span>
                        <p className="text-white/55 text-sm mb-1">Drop your resume here or click to upload</p>
                        <p className="text-white/25 text-xs">PDF only · Max 5MB</p>
                    </>
                )}
            </div>

            {/* Pesan error validasi dari Inertia */}
            {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
        </div>
    );
}