import supabase from '../config/supabase.js';

export class Share {
    static async create(shareData) {
        try {
            const { data, error } = await supabase
                .from('shares')
                .insert([shareData])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error creating share:', error);
            throw error;
        }
    }

    static async findByCode(code) {
        try {
            const { data, error } = await supabase
                .from('shares')
                .select('*, files(*)')
                .eq('code', code)
                .gt('expires_at', new Date().toISOString())
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error finding share:', error);
            throw error;
        }
    }
}