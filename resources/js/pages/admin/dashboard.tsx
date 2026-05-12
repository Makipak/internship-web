import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import ApplicationsCard from '@/components/admin/ApplicationsCard';
import ApplicationsTable from '@/components/admin/ApplicationsTable';
import DeleteConfirmationDialog from '@/components/admin/DeleteConfirmationDialog';
import DetailModal from '@/components/admin/DetailModal';
import PaginationControls from '@/components/admin/PaginationControls';
import ResumeModal from '@/components/admin/ResumeModal';
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
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const { post } = useForm();
    const { props } = usePage<any>();




    // Get CSRF token dari Inertia props
    const csrfToken = (props as any)?.['csrf_token'] || '';

    // Logout handler
    const handleLogout = () => {
        post('/logout', {
            preserveScroll: true,
            onFinish: () => {
                window.location.href = '/login';
            }
        });
    };

    const fetchApplications = useCallback(async (page = 1, silent = false) => {
        try {
            if (!silent) setLoading(true);
            const response = await fetch(`/api/admin/internships?page=${page}&sort_by=${sortBy}&sort_dir=${sortDir}`);
            if (!response.ok) throw new Error('Failed to fetch applications');
            const data = await response.json();
            setApplications(data);
            setCurrentPage(page);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            if (!silent) setLoading(false);
        }
    }, [sortBy, sortDir]);

    useEffect(() => {
        fetchApplications(1);
    }, [fetchApplications]);

    // Listen untuk storage change event dari window
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'internship_app_submitted') {
                fetchApplications(1);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [fetchApplications]);

    // refetch resumetext (silent polling)
    useEffect(() => {
        if (!applications) return;

        const hasPending = applications.data.some(app => !app.resume_text);
        if (!hasPending) return;

        const interval = setInterval(() => {
            fetchApplications(currentPage, true);
        }, 3000);

        return () => clearInterval(interval);
    }, [applications, currentPage, fetchApplications]);

    // Handle column header click untuk sorting
    const handleSort = (field: string) => {
        if (sortBy === field) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDir('asc');
        }
    };

    // toggle select satu item
    const handleSelectOne = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    // toggle select semua item
    const handleSelectAll = () => {
        if (!applications) return;
        const currentIds = applications.data.map((app) => app.id);
        const allSelected = currentIds.every((id) => selectedIds.includes(id));
        if (allSelected) {
            // Unselect semua di halaman ini
            setSelectedIds((prev) => prev.filter((id) => !currentIds.includes(id)));
        } else {
            // Select semua di halaman ini, gabung dengan yang sudah ada
            setSelectedIds((prev) => [...new Set([...prev, ...currentIds])]);
        }
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
    const handleDownloadResume = (id: number) => {
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
        const idsToDelete = selectedIds.includes(deleteId) && selectedIds.length > 1
            ? selectedIds
            : [deleteId];
        try {
            const responses = await Promise.all(
                idsToDelete.map((id) =>
                    fetch(`/api/admin/internships/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                            'X-CSRF-TOKEN': csrfToken,
                        },
                    })
                )
            );
            for (const response of responses) {
                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message || 'Failed to delete');
                }
            }
            setSelectedIds((prev) => prev.filter((id) => !idsToDelete.includes(id)));
            await fetchApplications(currentPage);
            setShowDeleteDialog(false);
            setDeleteId(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Delete failed');
        }
    };

    // Export ke Excel
    const handleExport = async () => {
        if(selectedIds.length === 0) return;
        try {
            const ids = selectedIds.join(',');
            const response = await fetch(`/api/admin/internships/export?ids=${ids}`);
            if (!response.ok) throw new Error('Export failed');
            const { csv, fileName } = await response.json();

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            link.click();

            URL.revokeObjectURL(link.href);
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
                <AdminHeader onExport={handleExport} onLogout={handleLogout} selectedCount={selectedIds.length}/>

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
                            <p className="text-white/50">no participants found</p>
                        </div>
                    ) : (
                        <>
                            {/* Table for desktop */}
                            <ApplicationsTable
                                applications={applications.data}
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={handleSort}
                                onViewResume={handleViewResume}
                                onDelete={handleDeleteClick}
                                onRowClick={handleRowClick}
                                selectedIds={selectedIds}
                                onSelectOne={handleSelectOne}
                                onSelectAll={handleSelectAll}
                            />

                            {/* Card view for mobile */}
                            <ApplicationsCard
                                applications={applications.data}
                                onViewResume={handleViewResume}
                                onDelete={handleDeleteClick}
                                onRowClick={handleRowClick}
                                selectedIds={selectedIds}
                                onSelectOne={handleSelectOne}
                            />

                            {/* Pagination */}
                            <PaginationControls
                                meta={applications.meta}
                                onPrevious={handlePrevPage}
                                onNext={handleNextPage}
                            />
                        </>
                    )}
                </div>

                {/* Resume Modal */}
                <ResumeModal
                    isOpen={showResumeModal}
                    selectedApp={selectedApp}
                    onClose={() => setShowResumeModal(false)}
                    onDownload={handleDownloadResume}
                />

                {/* Detail Modal */}
                <DetailModal
                    isOpen={showDetailModal}
                    selectedApp={selectedApp}
                    onClose={() => setShowDetailModal(false)}
                    onViewResume={() => {
                        setShowDetailModal(false);
                        handleViewResume(selectedApp!);
                    }}
                    onDelete={() => {
                        setShowDetailModal(false);
                        handleDeleteClick(selectedApp!.id);
                    }}
                />

                {/* Delete Confirmation Dialog */}
                <DeleteConfirmationDialog
                    isOpen={showDeleteDialog}
                    onConfirm={confirmDelete}
                    onCancel={() => setShowDeleteDialog(false)}
                />
            </div>
        </>
    );
}
