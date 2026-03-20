import { supabase } from '../supabase/client';

export interface Testimonial {
  id: string;
  name: string;
  service: string;
  text: string;
  status: 'pending' | 'approved' | 'spam';
  created_at: string;
}

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
  return data as Testimonial[];
}

export async function getAllAdminTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching admin testimonials:', error);
    return [];
  }
  return data as Testimonial[];
}

export async function createTestimonial(data: Omit<Testimonial, 'id' | 'created_at' | 'status'>): Promise<Testimonial | null> {
  const { data: newTestimonial, error } = await supabase
    .from('testimonials')
    .insert([{ ...data, status: 'pending' }])
    .select()
    .single();

  if (error || !newTestimonial) {
    console.error('Error creating testimonial:', error);
    return null;
  }
  return newTestimonial as Testimonial;
}

export async function updateTestimonialStatus(id: string, status: 'pending' | 'approved' | 'spam'): Promise<boolean> {
  const { error } = await supabase
    .from('testimonials')
    .update({ status })
    .eq('id', id);

  return !error;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  return !error;
}
