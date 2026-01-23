
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useAuth } from '../../context/AuthContext';
import StudentAuthLayout from '../../layouts/StudentAuthLayout';
import { supabase } from '../../lib/supabaseClient';
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
        const value = formData[fieldName];
        if (typeof value === 'string') {
            return value.trim() === '';
        }
        return false;
    };
    
    // Only apply error class if invalid
    const getInputClass = (fieldName: keyof typeof formData, isRequired: boolean) => {
        const baseClass = "w-full px-4 py-3 rounded-xl border-none focus:ring-2 transition-colors";
        const normalClass = "bg-gray-50 dark:bg-slate-700 focus:ring-brand-primary/20";
        const errorClass = "bg-red-50 dark:bg-red-900/10 ring-2 ring-red-500/50 focus:ring-red-500";
        
        if (isRequired && isFieldInvalid(fieldName)) {
            return `${baseClass} ${errorClass}`;
        }
        return `${baseClass} ${normalClass}`;
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setHasAttemptedSubmit(true);
        setError(null);
        // Required field validation check manually
        const requiredFields: (keyof typeof formData)[] = [
            'firstName', 'lastName', 'username', 'email', 
            'password', 'confirmPassword', 'jobTitle', 'bio'
        ];
        
        const hasEmptyFields = requiredFields.some(field => 
            typeof formData[field] === 'string' && (formData[field] as string).trim() === ''
        );
        if (hasEmptyFields) {
            setError("Please fill in all required fields.");
            // We do not return here if we rely on HTML5 required attribute, but user asked for visual feedback 'red when submitted empty'.
            // If using HTML5 required, submit won't fire. 
            // To support the visual requirement as described ("turn red when user hit submit"), we should probably disable 'required' attribute on inputs 
            // OR accept that 'submit' event fires only if HTML validation passes. 
            // However, usually "turn red on submit" implies custom validation handling where HTML5 validation is prevented or not used.
            // Let's assume we keep "required" attribute for accessibility/standard behavior, but the user explicitly asked for the visual change.
            // For the visual change to be visible, the form submission must logically "fail" or "attempt".
            // If we keep `required` on inputs, the browser will focus the first invalid element and not fire `onSubmit`.
            // To achieve the specific "turn red" effect requested, we often remove `required` from inputs and handle it here.
            
            // Let's REMOVE 'required' from inputs in the JSX to fully control the visual state as requested.
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setIsSubmitting(true);
        try {
            // 1. Sign up the user with 'unassigned' role initially provided to metadata
            // We pass the explicit username here
            const { data, error: authError } = await signUp(
                formData.email,
                formData.password,
                formData.firstName,
                formData.lastName,
                formData.username,
                'unassigned'
            );
            if (authError) throw authError;
            if (!data?.user) throw new Error("Failed to create account");
            const userId = data.user.id;
            // 2. Explicitly update the public.profiles table
            // This ensures the role is strictly set and middle_name is added
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    role: 'unassigned',
                    username: formData.username,
                    middle_name: formData.middleName,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    name_extension: formData.nameExtension
                })
                .eq('id', userId);
            if (profileError) {
                console.error("Profile update error:", profileError);
                // Continue anyway to try inserting coach profile
            }
            // 3. Insert into coach_profiles
            // Parse tools from comma separated string
            const toolsArray = formData.tools.split(',').map(t => t.trim()).filter(t => t.length > 0);
            const { error: coachError } = await supabase
                .from('coach_profiles')
                .insert({
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
            // 4. Navigate to verification pending
            navigate('/verification-pending');
        } catch (err: any) {
            console.error("Application error:", err);
            setError(err.message || "An error occurred during application");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <StudentAuthLayout maxWidth="full">
            <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto items-start pt-10">
                {/* Left Side: Pitch & Map */}
                <div className="flex-1 w-full lg:w-1/2 space-y-8 sticky top-10">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-text-primary dark:text-white mb-6">
                            Share your knowledge.<br />
                            <span className="text-brand-primary">Inspire the world.</span>
                        </h1>
                        <p className="text-lg text-text-secondary dark:text-slate-400 leading-relaxed mb-8">
                            Join our global network of expert coaches. Teach what you love, connect with students worldwide,
                            and earn by making a difference.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-card p-6 border border-gray-100 dark:border-slate-700">
                        <h3 className="text-sm font-semibold text-text-muted dark:text-slate-400 uppercase tracking-wider mb-4">
                            Our Global Coach Network
                        </h3>
                        <div className="h-[300px] w-full bg-[#FAFBFF] dark:bg-slate-900 rounded-2xl overflow-hidden relative">
                            <ComposableMap
                                projection="geoMercator"
                                projectionConfig={{ scale: 100 }}
                                className="w-full h-full"
                            >
                                <Geographies geography={geoUrl}>
                                    {({ geographies }) =>
                                        geographies.map((geo) => (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                fill="#EAEAEC"
                                                stroke="#D6D6DA"
                                                strokeWidth={0.5}
                                            />
                                        ))
                                    }
                                </Geographies>
                                {coachLocations.map(({ coordinates, count }, i) => (
                                    <Marker key={i} coordinates={coordinates as [number, number]}>
                                        <circle r={4} fill="#FF5533" stroke="#fff" strokeWidth={1} />
                                    </Marker>
                                ))}
                            </ComposableMap>
                        </div>
                        <div className="flex items-center gap-2 mt-4 text-sm text-text-secondary dark:text-slate-400">
                            <span className="w-2 h-2 rounded-full bg-[#FF5533]"></span>
                            <span>Active coaches in major hubs</span>
                        </div>
                    </div>
                </div>
                {/* Right Side: Application Form */}
                <div className="flex-1 w-full lg:w-1/2 max-w-2xl">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-slate-700">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-text-primary dark:text-white">Apply to be a Coach</h2>
                            <p className="text-text-secondary dark:text-slate-400">Join 1,000+ mentors transforming careers.</p>
                            <p className="text-xs text-text-muted mt-2">Fields marked with <span className="text-red-500">*</span> are required.</p>
                        </div>
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                            {/* Personal Details */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-text-secondary uppercase">Personal Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="col-span-1">
                                        <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">First Name <span className="text-red-500">*</span></label>
                                        <input 
                                            name="firstName" 
                                            value={formData.firstName} 
                                            onChange={handleInputChange} 
                                            className={getInputClass('firstName', true)} 
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Middle Name</label>
                                        <input 
                                            name="middleName" 
                                            value={formData.middleName} 
                                            onChange={handleInputChange} 
                                            className={getInputClass('middleName', false)}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Last Name <span className="text-red-500">*</span></label>
                                        <input 
                                            name="lastName" 
                                            value={formData.lastName} 
                                            onChange={handleInputChange} 
                                            className={getInputClass('lastName', true)}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Extension</label>
                                        <input 
                                            name="nameExtension" 
                                            value={formData.nameExtension} 
                                            onChange={handleInputChange} 
                                            placeholder="Jr."
                                            className={getInputClass('nameExtension', false)}
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div className="col-span-1">
                                        <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Username <span className="text-red-500">*</span></label>
                                        <input 
                                            name="username" 
                                            value={formData.username} 
                                            onChange={handleInputChange} 
                                            className={getInputClass('username', true)}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Email <span className="text-red-500">*</span></label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            value={formData.email} 
                                            onChange={handleInputChange} 
                                            className={getInputClass('email', true)}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Password <span className="text-red-500">*</span></label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            value={formData.password} 
                                            onChange={handleInputChange} 
                                            className={getInputClass('password', true)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Confirm PW <span className="text-red-500">*</span></label>
                                        <input 
                                            type="password" 
                                            name="confirmPassword" 
                                            value={formData.confirmPassword} 
                                            onChange={handleInputChange} 
                                            className={getInputClass('confirmPassword', true)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr className="border-gray-100 dark:border-slate-700" />
                            {/* Professional Profile */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-text-secondary uppercase">Professional Profile</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Job Title <span className="text-red-500">*</span></label>
                                        <input 
                                            name="jobTitle" 
                                            value={formData.jobTitle} 
                                            onChange={handleInputChange} 
                                            placeholder="e.g. Senior Product Designer" 
                                            className={getInputClass('jobTitle', true)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Experience Level</label>
                                        <select 
                                            name="experienceLevel" 
                                            value={formData.experienceLevel} 
                                            onChange={handleInputChange} 
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border-none focus:ring-2 focus:ring-brand-primary/20"
                                        >
                                            {experienceLevelOptions.map(level => (
                                                <option key={level} value={level}>{level}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Professional Bio <span className="text-red-500">*</span></label>
                                    <textarea 
                                        name="bio" 
                                        value={formData.bio} 
                                        onChange={handleInputChange} 
                                        rows={3} 
                                        placeholder="Tell us about your experience and teaching philosophy..." 
                                        className={getInputClass('bio', true)}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">LinkedIn URL</label>
                                        <input 
                                            type="url" 
                                            name="linkedinUrl" 
                                            value={formData.linkedinUrl} 
                                            onChange={handleInputChange} 
                                            placeholder="https://linkedin.com/in/..." 
                                            className={getInputClass('linkedinUrl', false)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Portfolio (Optional)</label>
                                        <input 
                                            type="url" 
                                            name="portfolioUrl" 
                                            value={formData.portfolioUrl} 
                                            onChange={handleInputChange} 
                                            placeholder="https://..." 
                                            className={getInputClass('portfolioUrl', false)}
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Tools & Technologies</label>
                                    <input 
                                        name="tools" 
                                        value={formData.tools} 
                                        onChange={handleInputChange} 
                                        placeholder="e.g. Figma, React, Python, Adobe Suite (Comma separated)" 
                                        className={getInputClass('tools', false)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Expertise Areas</label>
                                    <div className="flex flex-wrap gap-2">
                                        {contentAreaOptions.map(area => (
                                            <button
                                                key={area}
                                                type="button"
                                                onClick={() => handleCheckboxChange(area)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${formData.contentAreas.includes(area)
                                                    ? 'bg-brand-primary text-white shadow-md'
                                                    : 'bg-gray-50 dark:bg-slate-700 text-text-secondary hover:bg-gray-100'
                                                    }`}
                                            >
                                                {area}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-gradient-to-r from-brand-primary to-brand-primary-light text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all"
                                >
                                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </StudentAuthLayout>
    );
};
export default CoachApplicationPage;