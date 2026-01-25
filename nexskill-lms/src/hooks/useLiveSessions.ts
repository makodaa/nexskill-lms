import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { LiveSession } from '../types/db';

export const useLiveSessions = (courseId: string | undefined) => {
    const [sessions, setSessions] = useState<LiveSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSessions = useCallback(async () => {
        if (!courseId) return;

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('live_sessions')
                .select('*')
                .eq('course_id', courseId)
                .order('scheduled_at', { ascending: true });

            if (error) throw error;
            setSessions(data as LiveSession[]);
        } catch (err: any) {
            console.error('Error fetching live sessions:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [courseId]);

    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    const createSession = async (sessionData: Partial<LiveSession>) => {
        try {
            const { data, error } = await supabase
                .from('live_sessions')
                .insert([sessionData])
                .select()
                .single();

            if (error) throw error;
            setSessions((prev) => [...prev, data as LiveSession]);
            return data;
        } catch (err: any) {
            console.error('Error creating session:', err);
            throw err;
        }
    };

    const updateSession = async (sessionId: string, updates: Partial<LiveSession>) => {
        try {
            const { data, error } = await supabase
                .from('live_sessions')
                .update(updates)
                .eq('id', sessionId)
                .select()
                .single();

            if (error) throw error;
            setSessions((prev) =>
                prev.map((s) => s.id === sessionId ? (data as LiveSession) : s)
            );
            return data;
        } catch (err: any) {
            console.error('Error updating session:', err);
            throw err;
        }
    };

    const deleteSession = async (sessionId: string) => {
        try {
            const { error } = await supabase
                .from('live_sessions')
                .delete()
                .eq('id', sessionId);

            if (error) throw error;
            setSessions((prev) => prev.filter((s) => s.id !== sessionId));
        } catch (err: any) {
            console.error('Error deleting session:', err);
            throw err;
        }
    };

    return {
        sessions,
        loading,
        error,
        createSession,
        updateSession,
        deleteSession,
        refreshSessions: fetchSessions
    };
};
