import supabase from '../config/supabase.js';

export class User {
    static async findByEmail(email) {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    }

    static async create(userData) {
        try {
            const { data, error } = await supabase
                .from('users')
                .insert([userData])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
}