import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Clock, User, BookOpen, DollarSign, Globe } from 'lucide-react';
import type { CourseVerificationStatus } from '../../../types/db';

interface CourseInfo {
    id: string;
    title: string;
    subtitle: string | null;
    level: string | null;
    language: string | null;
    duration_hours: number;
    price: number;
    verification_status: CourseVerificationStatus;
    coach?: {
        first_name: string | null;
        last_name: string | null;
        email: string | null;
    };
    category?: {
        name: string;
    };
}

interface VerificationActionsProps {
    course: CourseInfo;
    unresolvedFeedbackCount: number;
    onUpdateStatus: (status: CourseVerificationStatus) => Promise<void>;
}

const VerificationActions: React.FC<VerificationActionsProps> = ({
    course,
    unresolvedFeedbackCount,
    onUpdateStatus
}) => {
    const [submitting, setSubmitting] = useState<string | null>(null);

    const handleStatusChange = async (newStatus: CourseVerificationStatus) => {
        try {
            setSubmitting(newStatus);
            await onUpdateStatus(newStatus);
        } catch (error) {
            console.error('Failed to update status:', error);
        } finally {
            setSubmitting(null);
        }
    };

    const getStatusBadge = (status: CourseVerificationStatus) => {
        switch (status) {
            case 'draft':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        <Clock size={12} />
                        Draft
                    </span>
                );
            case 'pending_review':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        <Clock size={12} />
                        Pending Review
                    </span>
                );
            case 'changes_requested':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        <AlertTriangle size={12} />
                        Changes Requested
                    </span>
                );
            case 'approved':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle size={12} />
                        Approved
                    </span>
                );
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Course Info Header */}
            <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-[#304DB5]/5 to-transparent">
                <h3 className="font-semibold text-gray-900">Course Details</h3>
            </div>

            <div className="p-4 space-y-4">
                {/* Course Title & Status */}
                <div>
                    <h4 className="font-medium text-gray-900">{course.title}</h4>
                    {course.subtitle && (
                        <p className="text-sm text-gray-500 mt-1">{course.subtitle}</p>
                    )}
                    <div className="mt-2">
                        {getStatusBadge(course.verification_status)}
                    </div>
                </div>

                {/* Course Meta */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                        <User size={14} />
                        <span className="truncate">
                            {course.coach?.first_name} {course.coach?.last_name}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <BookOpen size={14} />
                        <span>{course.category?.name || 'No category'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <Clock size={14} />
                        <span>{course.duration_hours}h</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <DollarSign size={14} />
                        <span>₱{course.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <Globe size={14} />
                        <span>{course.language || 'English'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <AlertTriangle size={14} />
                        <span>{course.level || 'All levels'}</span>
                    </div>
                </div>

                {/* Unresolved Feedback Warning */}
                {unresolvedFeedbackCount > 0 && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-center gap-2 text-amber-700 text-sm">
                            <AlertTriangle size={16} />
                            <span>
                                {unresolvedFeedbackCount} unresolved feedback item{unresolvedFeedbackCount !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Update Status</h4>

                    <button
                        onClick={() => handleStatusChange('approved')}
                        disabled={submitting !== null || course.verification_status === 'approved'}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <CheckCircle size={18} />
                        {submitting === 'approved' ? 'Approving...' : 'Approve Course'}
                    </button>

                    <button
                        onClick={() => handleStatusChange('changes_requested')}
                        disabled={submitting !== null || course.verification_status === 'changes_requested'}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <AlertTriangle size={18} />
                        {submitting === 'changes_requested' ? 'Updating...' : 'Request Changes'}
                    </button>

                    <button
                        onClick={() => handleStatusChange('draft')}
                        disabled={submitting !== null || course.verification_status === 'draft'}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <XCircle size={18} />
                        {submitting === 'draft' ? 'Reverting...' : 'Revert to Draft'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerificationActions;
