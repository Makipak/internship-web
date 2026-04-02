import type { InternshipApplication } from '@/types/internship';

interface ResumeModalProps {
    isOpen: boolean;
    selectedApp: InternshipApplication | null;
    onClose: () => void;
    onDownload: (id: number) => void;
}

export default function ResumeModal({ isOpen, selectedApp, onClose, onDownload }: ResumeModalProps) {
    if (!isOpen || !selectedApp) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="sticky top-0 bg-[#0a0a0a] border-b border-white/10 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold">Resume Preview</h2>
                        <p className="text-sm text-white/50">{selectedApp.first_name} {selectedApp.last_name}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/60 hover:text-white text-2xl leading-none"
                    >
                        ×
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                    {selectedApp.resume_path ? (
                        <div className="space-y-4">
                            <iframe
                                src={`/storage/${selectedApp.resume_path}`}
                                className="w-full h-[600px] border border-white/10 rounded-lg"
                                title="Resume PDF"
                            ></iframe>
                            <div className="flex gap-2 pt-4">
                                <button
                                    onClick={() => onDownload(selectedApp.id)}
                                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                                >
                                    Download Resume
                                </button>
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-white/50 text-center py-8">Resume not found</p>
                    )}
                </div>
            </div>
        </div>
    );
}
