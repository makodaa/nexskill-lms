import React from "react";

interface Coach {
    name: string;
    avatar?: string; // Emoji or URL
    bio: string;
    studentsCount: number;
    coursesCount: number;
    rating: number;
}

interface CourseCoachTabProps {
    coach: Coach | null;
}

const CourseCoachTab: React.FC<CourseCoachTabProps> = ({ coach }) => {
    if (!coach) {
        return (
            <div className="text-center py-12">
                <div className="text-4xl mb-4">👨‍🏫</div>
                <p className="text-text-muted">Instructor information coming soon</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-primary to-brand-primary-light flex items-center justify-center text-4xl text-white flex-shrink-0">
                    {coach.avatar?.length === 1 ? (
                        // Emoji avatar
                        coach.avatar
                    ) : coach.avatar ? (
                        // Image avatar
                        <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                        // Initials fallback
                        coach.name.charAt(0).toUpperCase()
                    )}
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                        {coach.name}
                    </h3>
                    <p className="text-text-secondary dark:text-dark-text-secondary mb-4 leading-relaxed">
                        {coach.bio}
                    </p>

                    <div className="flex gap-8 border-t border-[#EDF0FB] dark:border-gray-700 pt-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                                {coach.studentsCount.toLocaleString()}
                            </div>
                            <div className="text-xs text-text-muted dark:text-dark-text-muted uppercase tracking-wide">
                                Students
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                                {coach.coursesCount}
                            </div>
                            <div className="text-xs text-text-muted dark:text-dark-text-muted uppercase tracking-wide">
                                Courses
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                                {coach.rating.toFixed(1)}
                            </div>
                            <div className="text-xs text-text-muted dark:text-dark-text-muted uppercase tracking-wide">
                                Rating
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCoachTab;
