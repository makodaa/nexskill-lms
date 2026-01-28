import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import BrandLockup from '../../components/brand/BrandLockup';

// Mock data for heatmap/markers
const coachLocations = [
    { coordinates: [-74.006, 40.7128], count: 15 }, // New York
    { coordinates: [-0.1278, 51.5074], count: 12 }, // London
    { coordinates: [139.6917, 35.6895], count: 8 },  // Tokyo
    { coordinates: [151.2093, -33.8688], count: 6 }, // Sydney
    { coordinates: [2.3522, 48.8566], count: 10 },   // Paris
    { coordinates: [-122.4194, 37.7749], count: 20 }, // San Francisco
    { coordinates: [77.5946, 12.9716], count: 18 },  // Bangalore
    { coordinates: [103.8198, 1.3521], count: 9 },   // Singapore
    { coordinates: [-46.6333, -23.5505], count: 7 }, // Sao Paulo
    { coordinates: [28.0473, -26.2041], count: 5 },  // Johannesburg
];

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const CoachApplicationPage: React.FC = () => {
    const navigate = useNavigate();
    const { signUp } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        nameExtension: '', // e.g. Jr, Sr
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        jobTitle: '',
        bio: '',
        experienceLevel: 'Beginner',
        linkedinUrl: '',
        portfolioUrl: '',
        contentAreas: [] as string[],
        tools: '' // comma separated
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const contentAreaOptions = [
        "Design", "Development", "Marketing", "Data Science",
        "Business", "Photography", "Music", "Health & Fitness"
    ];

    const experienceLevelOptions = ["Beginner", "Intermediate", "Expert"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (area: string) => {
        setFormData(prev => {
            if (prev.contentAreas.includes(area)) {
                return { ...prev, contentAreas: prev.contentAreas.filter(a => a !== area) };
            } else {
                return { ...prev, contentAreas: [...prev.contentAreas, area] };
            }
        });
    };

    // Helper to determine if a required field is invalid
    const isFieldInvalid = (fieldName: keyof typeof formData) => {
        if (!hasAttemptedSubmit) return false;

        // Optional Fields
        if (fieldName === 'nameExtension') return false;
        if (fieldName === 'linkedinUrl') return false;
        if (fieldName === 'portfolioUrl') return false;
        if (fieldName === 'tools') return false;

        const value = formData[fieldName];
        if (typeof value === 'string') {
            return value.trim() === '';
        }
        return false;
    };

    // Updated Glass Input styles - TALL & WIDE
    const getInputClass = (fieldName: keyof typeof formData) => {
        const baseClass = "w-full h-14 px-5 rounded-xl border bg-white/5 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:border-brand-neon transition-colors backdrop-blur-sm hover:bg-white/10";
        const defaultBorder = "border-white/10";
        const errorBorder = "border-red-500 bg-red-500/5";

        if (isFieldInvalid(fieldName)) {
            return `${baseClass} ${errorBorder}`;
        }
        return `${baseClass} ${defaultBorder}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setHasAttemptedSubmit(true);
        setError(null);

        // Strict Validation Check
        const requiredFields: (keyof typeof formData)[] = [
            'firstName', 'middleName', 'lastName', 'username', 'email',
            'password', 'confirmPassword', 'jobTitle', 'bio'
        ];
        // Note: contentAreas check needs separate logic or add to list if we track it properly

        const hasEmptyFields = requiredFields.some(field =>
            typeof formData[field] === 'string' && (formData[field] as string).trim() === ''
        );

        if (hasEmptyFields) {
            setError("Please fill in all required fields.");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsSubmitting(true);
        try {
            const { data, error: authError } = await signUp(
                formData.email,
                formData.password,
                formData.firstName,
                formData.lastName,
                formData.username,
                'unassigned',
                formData.middleName,
                formData.nameExtension
            );
            if (authError) throw authError;
            if (!data?.user) throw new Error("Failed to create account");
            const userId = data.user.id;
            const { error: profileError } = await supabase.from('profiles').update({
                role: 'unassigned',
                username: formData.username,
                middle_name: formData.middleName,
                first_name: formData.firstName,
                last_name: formData.lastName,
                name_extension: formData.nameExtension
            }).eq('id', userId);
            if (profileError) console.error("Profile update error:", profileError);
            const toolsArray = formData.tools.split(',').map(t => t.trim()).filter(t => t.length > 0);
            const { error: coachError } = await supabase.from('coach_profiles').insert({
                id: userId,
                job_title: formData.jobTitle,
                bio: formData.bio,
                experience_level: formData.experienceLevel,
                content_areas: formData.contentAreas,
                tools: toolsArray,
                linkedin_url: formData.linkedinUrl,
                portfolio_url: formData.portfolioUrl,
                verification_status: 'pending'
            });
            if (coachError) throw coachError;
            navigate('/verification-pending');
        } catch (err: any) {
            console.error("Application error:", err);
            setError(err.message || "An error occurred during application");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen w-screen bg-[#121212] overflow-hidden text-white font-sans flex flex-col lg:flex-row">

            {/* LEFT COLUMN (Balanced Visuals) */}
            <div className="w-full lg:w-1/2 h-[350px] lg:h-screen relative bg-[#0B0F19] overflow-hidden border-r border-white/5 shrink-0 flex flex-col items-center justify-center p-8">
                {/* Overlay Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-10"></div>

                {/* Header (Top Left) */}
                <div className="absolute top-0 left-0 w-full p-8 z-30 flex justify-between items-start pointer-events-none">
                    <div className="pointer-events-auto origin-top-left scale-110">
                        <BrandLockup orientation="horizontal" variant="dark" />
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors pointer-events-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Centered Map Container - "Featured" Look */}
                <div className="relative w-full max-w-2xl aspect-video bg-[#121212]/50 rounded-3xl border border-white/5 overflow-hidden shadow-2xl z-20 hidden lg:block mb-12 transform hover:scale-105 transition-transform duration-700">
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{ scale: 140 }}
                        className="w-full h-full opacity-80"
                    >
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill="#1F2937"
                                        stroke="#111827"
                                        strokeWidth={0.5}
                                        style={{
                                            default: { fill: "#1F2937", outline: "none" },
                                            hover: { fill: "#374151", outline: "none" },
                                            pressed: { fill: "#111827", outline: "none" },
                                        }}
                                    />
                                ))
                            }
                        </Geographies>
                        {coachLocations.map(({ coordinates }, i) => (
                            <Marker key={i} coordinates={coordinates as [number, number]}>
                                <circle r={4} fill="#39FF14" fillOpacity={0.6} className="animate-ping" />
                                <circle r={4} fill="#39FF14" />
                            </Marker>
                        ))}
                    </ComposableMap>

                    {/* Floating Status Label */}
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse"></span>
                        <span className="text-xs font-mono text-brand-neon uppercase tracking-widest">Global Network Live</span>
                    </div>
                </div>

                {/* Text Content - CENTERED & BOLD */}
                <div className="relative z-20 text-center max-w-lg mx-auto">
                    <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-4">
                        Share your knowledge.<br />
                        <span className="text-gray-500">Inspire the world.</span>
                    </h1>
                    <p className="text-gray-400 text-lg lg:text-xl">Join the elite network of mentors shaping the future.</p>
                </div>
            </div>

            {/* RIGHT COLUMN (The Application) - WIDE & SPACIOUS */}
            <div className="w-full lg:w-1/2 h-full overflow-y-auto bg-[#121212] relative">
                <div className="w-full max-w-[650px] mx-auto px-8 py-16 lg:py-24">
                    <div className="mb-12 text-center lg:text-left">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">Coach Application</h2>
                        <p className="text-gray-400 text-xl">Join 1,000+ mentors transforming careers through NexSkill.</p>
                    </div>

                    {error && (
                        <div className="mb-8 p-6 bg-red-500/10 text-red-400 rounded-2xl text-base border border-red-500/20 font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-10" noValidate>
                        {/* Personal Details */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-brand-neon uppercase tracking-widest border-b border-white/10 pb-3">Identity</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">First Name</label>
                                    <input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className={getInputClass('firstName')} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Middle Name</label>
                                    <input name="middleName" value={formData.middleName} onChange={handleInputChange} placeholder="Middle Name" className={getInputClass('middleName')} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Last Name</label>
                                    <input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className={getInputClass('lastName')} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Extension (Optional)</label>
                                    <input name="nameExtension" value={formData.nameExtension} onChange={handleInputChange} placeholder="Extension" className={getInputClass('nameExtension')} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Username</label>
                                <input name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" className={getInputClass('username')} />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Email Address</label>
                                <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" className={getInputClass('email')} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Password</label>
                                    <input name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Password" className={getInputClass('password')} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Confirm</label>
                                    <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm" className={getInputClass('confirmPassword')} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-brand-neon uppercase tracking-widest border-b border-white/10 pb-3">Expertise</h3>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Job Title</label>
                                <input name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="Current Job Title" className={getInputClass('jobTitle')} />
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Experience Level</label>
                                    <select name="experienceLevel" value={formData.experienceLevel} onChange={handleInputChange}
                                        className="w-full h-14 px-5 rounded-xl border border-white/10 bg-white/5 text-lg text-gray-300 focus:outline-none focus:border-brand-neon hover:bg-white/10 cursor-pointer">
                                        {experienceLevelOptions.map(level => <option key={level} value={level} className="bg-[#121212]">{level}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Bio</label>
                                <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={5} placeholder="Your Professional Bio" className="w-full p-5 rounded-xl border border-white/10 bg-white/5 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:border-brand-neon transition-colors backdrop-blur-sm hover:bg-white/10" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">LinkedIn (Optional)</label>
                                    <input name="linkedinUrl" value={formData.linkedinUrl} onChange={handleInputChange} placeholder="LinkedIn URL" className={getInputClass('linkedinUrl')} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Portfolio (Optional)</label>
                                    <input name="portfolioUrl" value={formData.portfolioUrl} onChange={handleInputChange} placeholder="Portfolio URL" className={getInputClass('portfolioUrl')} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Tools (Optional)</label>
                                <input name="tools" value={formData.tools} onChange={handleInputChange} placeholder="Tools (e.g. Figma, React)" className={getInputClass('tools')} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-500 uppercase mb-4 tracking-widest">Content Areas</label>
                            <div className="flex flex-wrap gap-3">
                                {contentAreaOptions.map(area => (
                                    <button
                                        key={area}
                                        type="button"
                                        onClick={() => handleCheckboxChange(area)}
                                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all border ${formData.contentAreas.includes(area)
                                            ? 'bg-brand-neon text-black border-brand-neon scale-105'
                                            : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:bg-white/5'
                                            }`}
                                    >
                                        {area}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-10 pb-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-16 bg-gradient-to-r from-brand-neon to-brand-electric text-black font-extrabold text-xl tracking-wide uppercase rounded-2xl shadow-[0_0_25px_rgba(57,255,20,0.3)] hover:shadow-[0_0_50px_rgba(57,255,20,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting Application...' : 'Submit Coach Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CoachApplicationPage;