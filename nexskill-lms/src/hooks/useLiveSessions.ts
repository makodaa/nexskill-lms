import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { LiveSession } from '../types/db';
import { useAuth } from '../context/AuthContext';

export const useLiveSessions = () => {
    const { user } = useAuth();
    const [sessions, setSessions] = useState<LiveSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSessions = useCallback(async () => {
        if (!user) return;

        try {
            setLoading(true);
            setError(null);

            // 1. Get enrolled course IDs
            const { data: enrollments, error: enrollmentError } = await supabase
                .from('enrollments')
                .select('course_id')
                .eq('profile_id', user.id);

            if (enrollmentError) throw enrollmentError;

            const courseIds = enrollments.map(e => e.course_id);

            // If no enrollments, return empty
            if (courseIds.length === 0) {
                setSessions([]);
                return;
            }

            // 2. Fetch live sessions for these courses
            // explicit foreign key syntax might be needed if multiple relations exist
            // Assuming live_sessions.coach_id -> profiles.id and live_sessions.course_id -> courses.id
            const { data, error: sessionError } = await supabase
                .from('live_sessions')
                .select(`
                    *,
                    courses!live_sessions_course_id_fkey (
                        title,
                        category:categories(name)
                    ),
                    coach:profiles!live_sessions_coach_id_fkey (
                        first_name,
                        last_name,
                        username
                    )
                `)
                .in('course_id', courseIds)
                .order('scheduled_at', { ascending: true });

            if (sessionError) {
                // strict mode for foreign keys might fail if name is different
                console.error('Supabase session fetch error:', sessionError);
                throw sessionError;
            }

            // 3. Sanitize data (hide link if not live)
            const sanitizedData = data.map((session: any) => {
                const showLink = session.is_live || session.status === 'in_progress' || session.status === 'live';
                return {
                    ...session,
                    meeting_link: showLink ? session.meeting_link : undefined
                };
            });

            setSessions(sanitizedData as LiveSession[]);
        } catch (err: any) {
            console.error('Error fetching live sessions:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    const upcomingSessions = sessions.filter(s =>
        (s.status === 'scheduled' || s.status === 'in_progress' || s.status === 'live') &&
        !s.recording_url // If it has recording, it might move to recorded even if scheduled in past? 
        // Better: scheduled in future OR is live
    ).sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());

    // Actually, "Completed" tab usually means past sessions.
    const completedSessions = sessions.filter(s =>
        s.status === 'completed' || s.status === 'cancelled'
    ).sort((a, b) => new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime()); // Newest first

    const recordedSessions = sessions.filter(s =>
        s.recording_url && s.recording_url.length > 0
    ).sort((a, b) => new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime());

    return {
        sessions,
        upcomingSessions,
        completedSessions,
        recordedSessions,
        loading,
        error,
        refresh: fetchSessions
    };
};

export const useLiveSession = (sessionId?: string) => {
    const { user } = useAuth();
    const [session, setSession] = useState<LiveSession | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            if (!user || !sessionId) return;
            try {
                setLoading(true);
                // Fetch specific session
                const { data, error: sessionError } = await supabase
                    .from('live_sessions')
                    .select(`
                    *,
                    courses!live_sessions_course_id_fkey (
                        title,
                        category:categories(name)
                    ),
                    coach:profiles!live_sessions_coach_id_fkey (
                        first_name,
                        last_name,
                        username
                    )
                `)
                    .eq('id', sessionId)
                    .single();

                if (sessionError) throw sessionError;

                // Sanitize
                const showLink = data.is_live || data.status === 'in_progress' || data.status === 'live';
                const sanitized = {
                    ...data,
                    meeting_link: showLink ? data.meeting_link : undefined
                };

                setSession(sanitized as LiveSession);
            } catch (err: any) {
                console.error('Error fetching live session:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, [user, sessionId]);

    return { session, loading, error };
};
