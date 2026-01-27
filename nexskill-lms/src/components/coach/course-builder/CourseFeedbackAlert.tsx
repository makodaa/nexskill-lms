import React from 'react';

interface CourseFeedbackAlertProps {
    status: 'rejected' | 'changes_requested' | string;
    feedback: string;
    timestamp?: string;
}

const CourseFeedbackAlert: React.FC<CourseFeedbackAlertProps> = ({ status, feedback, timestamp }) => {
    if (!feedback) return null;

    const isRejected = status === 'rejected';

    return (
        <div className={`mb-6 p-4 rounded-xl border-l-4 ${isRejected
                ? 'bg-red-50 border-red-500 text-red-900'
                : 'bg-amber-50 border-amber-500 text-amber-900'
            }`}>
            <div className="flex items-start gap-3">
                <div className="mt-1">
                    {isRejected ? (
                        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                </div>
                <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${isRejected ? 'text-red-900' : 'text-amber-900'
                        }`}>
                        {isRejected ? 'Course Rejected' : 'Changes Requested'}
                    </h3>
                    <p className="text-sm whitespace-pre-wrap">{feedback}</p>
                    {timestamp && (
                        <p className={`text-xs mt-2 ${isRejected ? 'text-red-700' : 'text-amber-700'
                            }`}>
                            Feedback provided on {new Date(timestamp).toLocaleDateString()}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseFeedbackAlert;
