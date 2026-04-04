import logo from '@/components/assets/LogoType/Aissential Logotype Assets_Logotype 2.svg';
import AnimatedBackground from './AnimatedBackground';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Props: callback untuk scroll ke section form saat tombol CTA diklik
interface HeroSectionProps {
    onScrollToForm: () => void;
}

export default function HeroSection({ onScrollToForm }: HeroSectionProps) {
    // Animasi fade+slide-up saat section pertama kali muncul
    const { ref: heroRef, animClass: heroAnimClass } = useScrollAnimation(0);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* background */}
            <AnimatedBackground />

            {/* Konten hero dengan animasi scroll */}
            { }
            <div
                ref={heroRef}

                className={`relative z-10 text-center px-6 max-w-4xl mx-auto ${heroAnimClass} mt-10`}
            >

                {/* Label brand */}
                <div className='mb-12 flex justify-center'>
                    <img
                        src={logo}
                        alt='aissentialLogo'
                        className='h-6 w-auto opacity-90'
                    />
                </div>

                {/* Heading utama */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-13">
                    Join Our Team
                    <br />
                    <span className="text-white/40">as an Intern</span>
                </h1>

                {/* Subtitle deskripsi */}
                <p className="text-base sm:text-lg text-white/55 max-w-lg mx-auto leading-relaxed mb-2">
                    Shape the future of AI with us. We're looking for curious minds ready to build, learn, and make a real impact.
                </p>

                {/* Badge status pendaftaran */}
                <div className='mb-10 flex justify-center'>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs tracking-[0.2em] uppercase text-white/60 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Now Accepting Applications
                    </div>
                </div>

                {/* Tombol CTA — trigger smooth scroll ke form */}
                <button
                    onClick={onScrollToForm}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0572FF] text-white font-semibold rounded-full hover:bg-[#0572FF]/90 active:scale-95 transition-all duration-300 hover:scale-105 text-sm tracking-wide shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                >
                    Apply Now
                    <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>

            {/* Indikator scroll dengan animasi bounce */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25">
                <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
                <svg
                    className="w-5 h-5 animate-bounce"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Gradient fade ke section berikutnya */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </section>
    );
}
