interface AdminHeaderProps {
    onExport: () => void;
    onLogout: () => void;
}

export default function AdminHeader({ onExport, onLogout }: AdminHeaderProps) {
    return (
        <div className="border-b border-white/10 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-white/50 text-sm mt-1">Manage internship applications</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={onExport}
                            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-sm transition-colors"
                        >
                            Export to Excel
                        </button>
                        <button
                            onClick={onLogout}
                            className="w-full sm:w-auto px-6 py-2.5 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 rounded-lg font-medium text-sm transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
