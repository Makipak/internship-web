import { useEffect, useRef, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import HeroSection from '@/components/HeroSection';
import FormSection from '@/components/FormSection';
import PopupModal  from '@/components/PopupModal';
import type { PageProps } from '@/types/internship';

export default function Home() {
    // Ambil flash message dari Laravel via Inertia shared props
    const { flash } = usePage<PageProps>().props;

    // State untuk mengontrol popup dan tipenya
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState<'success' | 'error'>('success');

    // Ref untuk smooth scroll ke section form
    const formSectionRef = useRef<HTMLElement>(null);

    // Pantau flash message dari Laravel, tampilkan popup saat ada response
    useEffect(() => {
        if (flash?.success) {
            setPopupType('success');
            setShowPopup(true);
        } else if (flash?.error) {
            setPopupType('error');
            setShowPopup(true);
        }
    }, [flash]);

    // Scroll halus ke section form
    const scrollToForm = () => {
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Tampilkan popup sukses setelah submit berhasil
    const handleSuccess = () => {
        setPopupType('success');
        setShowPopup(true);
    };

    // Tampilkan popup error saat submit gagal
    const handleError = () => {
        setPopupType('error');
        setShowPopup(true);
    };

    return (
        <>
            <Head title="AISSENTIAL | Internship Application" />

            {/* Layout utama — dark theme */}
            <div className="min-h-screen bg-[#0a0a0a] text-white font-sans scroll-smooth">

                {/* Section 1: Welcome / Hero */}
                <HeroSection onScrollToForm={scrollToForm} />

                {/* Section 2: Form pendaftaran internship */}
                <FormSection
                    ref={formSectionRef}
                    onSuccess={handleSuccess}
                    onError={handleError}
                />

                {/* Footer */}
                <footer className="border-t border-white/[0.07] py-8 text-center">
                    <p className="text-white/25 text-sm tracking-wide">
                        © 2026 aissential · Transforming Ideas into Impact
                    </p>
                </footer>
            </div>

            {/* Popup modal — dirender di luar layout utama */}
            {showPopup && (
                <PopupModal
                    type={popupType}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </>
    );
}