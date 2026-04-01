import { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { InternshipApplication, PaginatedResponse } from '@/types/internship';

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface ApplicationWithMeta extends PaginatedResponse {
    data: InternshipApplication[];
    meta: PaginationMeta;
}

export default function AdminDashboard() {
    const [applications, setApplications] = useState<ApplicationWithMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedApp, setSelectedApp] = useState<InternshipApplication | null>(null);
    const [showResumeModal, setShowResumeModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('first_name');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const { post } = useForm();
    const { props } = usePage<any>();

    // Get CSRF token dari Inertia props
    const csrfToken = (props as any)?.['csrf_token'] || '';

    // Logout handler
    const handleLogout = () => {
        post('/logout');
    };
    const fetchApplications = async (page = 1) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/admin/internships?page=${page}&sort_by=${sortBy}&sort_dir=${sortDir}`);
            if (!response.ok) throw new Error('Failed to fetch applications');
            const data = await response.json();
            setApplications(data);
            setCurrentPage(page);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications(currentPage);
    }, []);

    // Refetch ketika sort parameter berubah
    useEffect(() => {
        fetchApplications(1);
    }, [sortBy, sortDir]);

    // Listen untuk storage change event dari window
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'internship_app_submitted') {
                fetchApplications(1);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Handle column header click untuk sorting
    const handleSort = (field: string) => {
        if (sortBy === field) {
            // Toggle sort direction jika field sama
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            // Set field baru dengan asc sebagai default
            setSortBy(field);
            setSortDir('asc');
        }
    };

    // Helper untuk render sort indicator
    const renderSortIndicator = (field: string) => {
        if (sortBy !== field) return '';
        return sortDir === 'asc' ? ' ↑' : ' ↓';
    };

    // View resume dalam modal
    const handleViewResume = (app: InternshipApplication) => {
        setSelectedApp(app);
        setShowResumeModal(true);
    };

    // View detail dalam modal
    const handleRowClick = (app: InternshipApplication) => {
        setSelectedApp(app);
        setShowDetailModal(true);
    };

    // Download resume
    const handleDownloadResume = (id: number, firstName: string, lastName: string) => {
        window.location.href = `/api/admin/internships/${id}/resume`;
    };

    // Konfirmasi delete
    const handleDeleteClick = (id: number) => {
        setDeleteId(id);
        setShowDeleteDialog(true);
    };

    // Hapus aplikasi
    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            const response = await fetch(`/api/admin/internships/${deleteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to delete');
            await fetchApplications(currentPage);
            setShowDeleteDialog(false);
            setDeleteId(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Delete failed');
        }
    };

    // Export ke Excel
    const handleExport = async () => {
        try {
            const response = await fetch('/api/admin/internships/export');
            if (!response.ok) throw new Error('Export failed');
            const { csv, fileName } = await response.json();

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Export failed');
        }
    };

    // Pagination handler
    const handlePrevPage = () => {
        if (applications && currentPage > 1) fetchApplications(currentPage - 1);
    };

    const handleNextPage = () => {
        if (applications && currentPage < applications.meta.last_page) {
            fetchApplications(currentPage + 1);
        }
    };

    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="min-h-screen bg-[#0a0a0a] text-white">
                {/* Header */}
                <div className="border-b border-white/10 bg-white/[0.02]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                                <p className="text-white/50 text-sm mt-1">Manage internship applications</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleExport}
                                    className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-sm transition-colors"
                                >
                                    Export to Excel
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full sm:w-auto px-6 py-2.5 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 rounded-lg font-medium text-sm transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {error && (
                        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center py-16">
                            <div className="inline-block w-12 h-12 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
                            <p className="text-white/50 mt-4">Loading applications...</p>
                        </div>
                    ) : !applications || applications.data.length === 0 ? (
                        <div className="text-center py-16 border border-white/10 rounded-xl">
                            <p className="text-white/50">No applications found</p>
                        </div>
                    ) : (
                        <>
                            {/* Table for desktop */}
                            <div className="hidden md:block overflow-hidden border border-white/10 rounded-xl bg-white/[0.02]">
                                <table className="w-full">
                                    <thead className="bg-white/[0.05] border-b border-white/10">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">No</th>
                                            <th 
                                                onClick={() => handleSort('first_name')}
                                                className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider cursor-pointer hover:text-white/80 transition-colors"
                                            >
                                                Name{renderSortIndicator('first_name')}
                                            </th>
                                            <th 
                                                onClick={() => handleSort('email')}
                                                className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider cursor-pointer hover:text-white/80 transition-colors"
                                            >
                                                Email{renderSortIndicator('email')}
                                            </th>
                                            <th 
                                                onClick={() => handleSort('phone')}
                                                className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider cursor-pointer hover:text-white/80 transition-colors"
                                            >
                                                Phone{renderSortIndicator('phone')}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">About</th>
                                            <th 
                                                onClick={() => handleSort('created_at')}
                                                className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider cursor-pointer hover:text-white/80 transition-colors"
                                            >
                                                Submitted{renderSortIndicator('created_at')}
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-white/60 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10">
                                        {applications.data.map((app, index) => (
                                            <tr key={app.id} className="hover:bg-white/[0.03] transition-colors cursor-pointer" onClick={() => handleRowClick(app)}>
                                                <td className="px-6 py-4 text-sm text-white/70">{index + 1}</td>
                                                <td className="px-6 py-4 text-sm font-medium">{app.first_name} {app.last_name}</td>
                                                <td className="px-6 py-4 text-sm text-white/70">{app.email}</td>
                                                <td className="px-6 py-4 text-sm text-white/70">{app.phone}</td>
                                                <td className="px-6 py-4 text-sm text-white/70 max-w-xs truncate">{app.about}</td>
                                                <td className="px-6 py-4 text-sm text-white/70">
                                                    {new Date(app.created_at).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-center" onClick={(e) => e.stopPropagation()}>
                                                    <div className="flex gap-2 justify-center">
                                                        <button
                                                            onClick={() => handleViewResume(app)}
                                                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-xs font-medium transition-colors"
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteClick(app.id)}
                                                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded text-xs font-medium transition-colors"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Card view for mobile */}
                            <div className="md:hidden space-y-4">
                                {applications.data.map((app, index) => (
                                    <div key={app.id} className="bg-white/[0.02] border border-white/10 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <p className="font-medium text-sm">{app.first_name} {app.last_name}</p>
                                                <p className="text-xs text-white/50">No: {index + 1}</p>
                                            </div>
                                            <span className="text-xs text-white/50">
                                                {new Date(app.created_at).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                        <div className="space-y-2 mb-4 text-sm text-white/70">
                                            <p className="truncate">{app.email}</p>
                                            <p className="truncate">{app.phone}</p>
                                            <p className="line-clamp-2">{app.about}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleViewResume(app)}
                                                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-xs font-medium transition-colors"
                                            >
                                                View Resume
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(app.id)}
                                                className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-xs font-medium transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm text-white/50">
                                    Showing {applications.meta.current_page} of {applications.meta.last_page} pages
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === applications.meta.last_page}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Resume Modal */}
                {showResumeModal && selectedApp && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-[#0a0a0a] border-b border-white/10 px-6 py-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold">Resume Preview</h2>
                                    <p className="text-sm text-white/50">{selectedApp.first_name} {selectedApp.last_name}</p>
                                </div>
                                <button
                                    onClick={() => setShowResumeModal(false)}
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
                                                onClick={() => handleDownloadResume(selectedApp.id, selectedApp.first_name, selectedApp.last_name)}
                                                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                                            >
                                                Download Resume
                                            </button>
                                            <button
                                                onClick={() => setShowResumeModal(false)}
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
                )}

                {/* Detail Modal */}
                {showDetailModal && selectedApp && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-[#0a0a0a] border-b border-white/10 px-6 py-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold">Application Details</h2>
                                    <p className="text-sm text-white/50">{selectedApp.first_name} {selectedApp.last_name}</p>
                                </div>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="text-white/60 hover:text-white text-2xl leading-none"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-white/50">First Name</label>
                                        <p className="text-sm font-medium mt-1">{selectedApp.first_name}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-white/50">Last Name</label>
                                        <p className="text-sm font-medium mt-1">{selectedApp.last_name}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-white/50">Email</label>
                                        <p className="text-sm font-medium mt-1">{selectedApp.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-white/50">Phone</label>
                                        <p className="text-sm font-medium mt-1">{selectedApp.phone}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-white/50">Submitted</label>
                                        <p className="text-sm font-medium mt-1">{new Date(selectedApp.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                </div>

                                <div className="min-w-0">
                                    <label className="text-xs uppercase tracking-wider text-white/50">About</label>
                                    <p className="text-sm font-medium mt-2 whitespace-pre-wrap break-words leading-relaxed">{selectedApp.about}</p>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-white/10">
                                    <button
                                        onClick={() => {
                                            setShowDetailModal(false);
                                            handleViewResume(selectedApp);
                                        }}
                                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                                    >
                                        View Resume
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowDetailModal(false);
                                            handleDeleteClick(selectedApp.id);
                                        }}
                                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => setShowDetailModal(false)}
                                        className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Dialog */}
                {showDeleteDialog && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl max-w-sm w-full p-6">
                            <h3 className="text-lg font-bold mb-2">Delete Application</h3>
                            <p className="text-white/60 text-sm mb-6">Are you sure you want to delete this application? This action cannot be undone.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteDialog(false)}
                                    className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
