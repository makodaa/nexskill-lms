import React from 'react';
import { useNavigate } from 'react-router-dom';
import BrandLockup from '../components/brand/BrandLockup';
import GlassCard from '../components/ui/GlassCard';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#121212] overflow-x-hidden text-white font-sans selection:bg-brand-neon selection:text-black">
            {/* Ambient Background Glows - Expanded */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[120vw] h-[120vw] bg-brand-primary/10 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[120vw] h-[120vw] bg-brand-neon/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Navbar - Wide & Padded (Not Centered) */}
            <nav className="fixed top-0 w-full z-50 px-[5%] py-8 flex justify-between items-center pointer-events-none">
                <div className="pointer-events-auto scale-110 origin-left">
                    <BrandLockup orientation="horizontal" variant="dark" />
                </div>
                <div className="flex gap-6 pointer-events-auto">
                    <button
                        onClick={() => navigate('/login')}
                        className="px-8 py-3 rounded-full text-base font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all font-mono tracking-wide"
                    >
                        LOG IN
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-8 py-3 rounded-full text-base font-bold bg-white text-black hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105"
                    >
                        GET STARTED
                    </button>
                </div>
            </nav>

            {/* Hero Section - Bold & Wide */}
            <header className="relative w-screen min-h-screen flex items-center px-[5%] pt-32 pb-20 lg:pt-0 lg:pb-0 z-10">
                <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center max-w-[90%] 2xl:max-w-[85%] mx-auto">
                    {/* Left: Text Content - SCALED UP & BALANCED */}
                    <div className="space-y-12 relative z-20 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="inline-block px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-brand-neon text-sm font-bold tracking-widest uppercase mb-4 animate-fade-in shadow-[0_0_15px_rgba(57,255,20,0.15)]">
                            The Future of Learning
                        </div>
                        <h1 className="text-6xl lg:text-8xl xl:text-9xl font-black leading-[1.0] lg:leading-[0.9] tracking-tighter mix-blend-screen">
                            MASTER <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon via-white to-brand-electric animate-gradient-x">
                                THE FUTURE
                            </span>
                        </h1>
                        <p className="text-xl lg:text-3xl text-gray-400 leading-relaxed font-light lg:border-l-4 lg:border-brand-neon lg:pl-8 max-w-3xl">
                            Unlock your potential with NexSkill. <br className="hidden lg:block" />
                            A unified platform combining expert mentorship with cutting-edge AI tools.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 pt-8 w-full sm:w-auto">
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-14 py-7 rounded-full text-xl font-bold bg-gradient-to-r from-brand-neon to-brand-electric text-black shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:shadow-[0_0_50px_rgba(57,255,20,0.6)] hover:scale-105 transition-all transform active:scale-95 w-full sm:w-auto"
                            >
                                Start Learning
                            </button>
                            <button
                                onClick={() => navigate('/coach/apply')}
                                className="px-14 py-7 rounded-full text-xl font-bold bg-black/40 border border-white/20 text-white hover:bg-white/10 hover:border-brand-electric/50 transition-all backdrop-blur-md group w-full sm:w-auto"
                            >
                                Become a Coach <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                            </button>
                        </div>
                    </div>

                    {/* Right: Portals - SCALED UP & CONNECTED */}
                    <div className="relative w-full flex flex-col gap-10 lg:block lg:h-[700px] perspective-1000 mt-16 lg:mt-0 lg:scale-[1.15] xl:scale-[1.25] origin-center lg:origin-right">
                        {/* Card 1: Student */}
                        <div
                            className="relative w-full max-w-lg mx-auto lg:absolute lg:top-[12%] lg:right-[35%] lg:w-[480px] z-30 lg:hover:z-40 transition-all duration-500 hover:scale-[1.02] lg:hover:scale-110 cursor-pointer"
                            onClick={() => navigate('/login')}
                        >
                            <GlassCard variant="dark" className="border-t-4 border-t-brand-neon bg-[#121212]/80 backdrop-blur-2xl p-10 shadow-2xl shadow-black/50">
                                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-brand-neon to-green-600 mb-8 flex items-center justify-center text-black font-bold text-4xl shadow-lg shadow-brand-neon/20">🎓</div>
                                <h3 className="text-4xl font-bold mb-4">Student Portal</h3>
                                <p className="text-gray-400 text-xl leading-relaxed">Personalized learning paths adapted to your pace.</p>
                                <div className="mt-10 flex items-center text-brand-neon font-bold text-lg tracking-wide uppercase">
                                    Access Portal <span className="ml-2">→</span>
                                </div>
                            </GlassCard>
                        </div>

                        {/* Card 2: Coach */}
                        <div
                            className="relative w-full max-w-lg mx-auto lg:absolute lg:top-[38%] lg:right-[5%] lg:w-[480px] z-20 lg:hover:z-40 transition-all duration-500 hover:scale-[1.02] lg:hover:scale-110 cursor-pointer"
                            onClick={() => navigate('/coach/login')}
                        >
                            <GlassCard variant="dark" className="border-t-4 border-t-brand-electric bg-[#121212]/80 backdrop-blur-2xl p-10 shadow-2xl shadow-black/50">
                                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-brand-electric to-blue-600 mb-8 flex items-center justify-center text-white font-bold text-4xl shadow-lg shadow-brand-electric/20">👨‍🏫</div>
                                <h3 className="text-4xl font-bold mb-4">Coach Portal</h3>
                                <p className="text-gray-400 text-xl leading-relaxed">Tools to monetize your expertise globally.</p>
                                <div className="mt-10 flex items-center text-brand-electric font-bold text-lg tracking-wide uppercase">
                                    Access Portal <span className="ml-2">→</span>
                                </div>
                            </GlassCard>
                        </div>

                        {/* Card 3: Admin */}
                        <div
                            className="relative w-full max-w-lg mx-auto lg:absolute lg:bottom-[8%] lg:right-[40%] lg:w-[480px] z-10 lg:hover:z-40 transition-all duration-500 hover:scale-[1.02] lg:hover:scale-110 cursor-pointer"
                            onClick={() => navigate('/admin/login')}
                        >
                            <GlassCard variant="dark" className="border-t-4 border-t-purple-500 bg-[#121212]/80 backdrop-blur-2xl p-10 shadow-2xl shadow-black/50">
                                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 mb-8 flex items-center justify-center text-white font-bold text-4xl shadow-lg shadow-purple-500/20">🛡️</div>
                                <h3 className="text-4xl font-bold mb-4">Admin Access</h3>
                                <p className="text-gray-400 text-xl leading-relaxed">Platform management and analytics control.</p>
                                <div className="mt-10 flex items-center text-purple-400 font-bold text-lg tracking-wide uppercase">
                                    Secure Login <span className="ml-2">→</span>
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section - Full Width with Centered Container */}
            <section className="py-32 lg:py-48 px-6 relative z-10 bg-[#0F1115]">
                <div className="max-w-[1400px] mx-auto w-full">
                    <div className="mb-20 lg:mb-24 text-center">
                        <h2 className="text-5xl md:text-7xl font-bold mb-8">Why NexSkill?</h2>
                        <p className="text-2xl text-gray-400 max-w-4xl mx-auto">Experience the next evolution of educational technology.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
                        {[
                            { title: "Immersive Learning", desc: "Interactive 3D labs and real-time collaboration with fellow students.", icon: "🌌" },
                            { title: "AI Mentorship", desc: "24/7 guidance tailored to your specific learning style and pace.", icon: "🤖" },
                            { title: "Global Community", desc: "Connect with peers, mentors, and industry experts worldwide.", icon: "🌍" }
                        ].map((feature, idx) => (
                            <GlassCard key={idx} variant="dark" className="p-10 lg:p-14 hover:border-brand-neon/50 hover:-translate-y-2 group h-full">
                                <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-300 transform origin-left">{feature.icon}</div>
                                <h3 className="text-3xl font-bold mb-5 text-white group-hover:text-brand-neon transition-colors">{feature.title}</h3>
                                <p className="text-xl text-gray-400 leading-relaxed">{feature.desc}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black py-20 px-8 border-t border-white/10">
                <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
                    <BrandLockup orientation="horizontal" variant="dark" />
                    <p className="text-gray-500 text-base">© {new Date().getFullYear()} NexSkill. All rights reserved.</p>
                    <div className="flex gap-10 text-gray-500 font-medium text-lg">
                        <a href="#" className="hover:text-brand-neon transition-colors">Privacy</a>
                        <a href="#" className="hover:text-brand-neon transition-colors">Terms</a>
                        <a href="#" className="hover:text-brand-neon transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
