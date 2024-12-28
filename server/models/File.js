import supabase from '../config/supabase.js';

export class File {
    static async findAll(userId) {
        try {
            const { data, error } = await supabase
                .from('files')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error finding files:', error);
            throw error;
        }
    }

    static async findById(id, userId) {
        try {
            const { data, error } = await supabase
                .from('files')
                .select('*')
                .eq('id', id)
                .eq('user_id', userId)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error finding file:', error);
            throw error;
        }
    }

    static async create(fileData) {
        try {
            const { data, error } = await supabase
                .from('files')
                .insert([fileData])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error creating file:', error);
            throw error;
        }
    }

    static async delete(id, userId) {
        try {
            const { error } = await supabase
                .from('files')
                .delete()
                .eq('id', id)
                .eq('user_id', userId);

            if (error) throw error;
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }

    static async incrementDownloads(id) {
        try {
            const { error } = await supabase.rpc('increment_downloads', { file_id: id });
            if (error) throw error;
        } catch (error) {
            console.error('Error incrementing downloads:', error);
            throw error;
        }
    }
}