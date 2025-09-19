import { supabase, TABLES } from './supabase'
import type { 
  BlogPost, 
  TeamMember, 
  Testimonial, 
  HeroImage, 
  TreePackage, 
  Button, 
  NewsletterSubscriber, 
  ContactMessage 
} from '../utils/adminData'

// Helper function to check if Supabase is available and return the client
const checkSupabase = () => {
  if (!supabase) {
    throw new Error('Supabase client not available. Environment variables may be missing.')
  }
  return supabase
}

// Blog Posts Database Operations
export const blogService = {
  async getAll(): Promise<BlogPost[]> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.BLOG_POSTS)
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getById(id: number): Promise<BlogPost | null> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.BLOG_POSTS)
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.BLOG_POSTS)
      .insert([post])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: number, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.BLOG_POSTS)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: number): Promise<boolean> {
    const client = checkSupabase()
    const { error } = await client
      .from(TABLES.BLOG_POSTS)
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}

// Team Members Database Operations
export const teamService = {
  async getAll(): Promise<TeamMember[]> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.TEAM_MEMBERS)
      .select('*')
      .order('order', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  async getActive(): Promise<TeamMember[]> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.TEAM_MEMBERS)
      .select('*')
      .eq('is_active', true)
      .order('order', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  async create(member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.TEAM_MEMBERS)
      .insert([member])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<TeamMember>): Promise<TeamMember | null> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.TEAM_MEMBERS)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<boolean> {
    const client = checkSupabase()
    const { error } = await client
      .from(TABLES.TEAM_MEMBERS)
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}

// Contact Messages Database Operations
export const contactService = {
  async getAll(): Promise<ContactMessage[]> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.CONTACT_MESSAGES)
      .select('*')
      .order('submitted_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async create(message: Omit<ContactMessage, 'id' | 'submittedAt' | 'status'>): Promise<ContactMessage> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.CONTACT_MESSAGES)
      .insert([message])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateStatus(id: string, status: 'new' | 'read' | 'replied'): Promise<boolean> {
    const client = checkSupabase()
    const { error } = await client
      .from(TABLES.CONTACT_MESSAGES)
      .update({ status })
      .eq('id', id)
    
    if (error) throw error
    return true
  },

  async delete(id: string): Promise<boolean> {
    const client = checkSupabase()
    const { error } = await client
      .from(TABLES.CONTACT_MESSAGES)
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}

// Newsletter Subscribers Database Operations
export const newsletterService = {
  async getAll(): Promise<NewsletterSubscriber[]> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.NEWSLETTER_SUBSCRIBERS)
      .select('*')
      .order('subscribed_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async subscribe(email: string, source: string = 'homepage'): Promise<boolean> {
    const client = checkSupabase()
    const { error } = await client
      .from(TABLES.NEWSLETTER_SUBSCRIBERS)
      .upsert([{ email, source }], { onConflict: 'email' })
    
    if (error) throw error
    return true
  },

  async unsubscribe(email: string): Promise<boolean> {
    const client = checkSupabase()
    const { error } = await client
      .from(TABLES.NEWSLETTER_SUBSCRIBERS)
      .update({ is_active: false })
      .eq('email', email)
    
    if (error) throw error
    return true
  }
} 

// Payment Service
export const paymentService = {
  // Get all payments
  async getAll(): Promise<any[]> {
    const client = checkSupabase()
    try {
      const { data, error } = await client
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching payments:', error);
      return [];
    }
  },

  // Get payment by order ID
  async getByOrderId(orderId: string): Promise<any | null> {
    const client = checkSupabase()
    try {
      const { data, error } = await client
        .from('payments')
        .select('*')
        .eq('order_id', orderId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching payment:', error);
      return null;
    }
  },

  // Create new payment record
  async create(paymentData: {
    orderId: string;
    amount: number;
    currency: string;
    buyerEmail: string;
    buyerName: string;
    buyerPhone: string;
    zenoPayResponse?: any;
  }): Promise<any> {
    const client = checkSupabase()
    try {
      const { data, error } = await client
        .from('payments')
        .insert([{
          order_id: paymentData.orderId,
          amount: paymentData.amount,
          currency: paymentData.currency,
          buyer_email: paymentData.buyerEmail,
          buyer_name: paymentData.buyerName,
          buyer_phone: paymentData.buyerPhone,
          zeno_pay_response: paymentData.zenoPayResponse,
          status: 'pending'
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  },

  // Update payment status
  async updateStatus(orderId: string, status: string, zenoPayResponse?: any): Promise<any> {
    const client = checkSupabase()
    try {
      const { data, error } = await client
        .from('payments')
        .update({
          status,
          zeno_pay_response: zenoPayResponse,
          updated_at: new Date().toISOString()
        })
        .eq('order_id', orderId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  },

  // Update payment with callback data
  async updateWithCallback(orderId: string, callbackData: any): Promise<any> {
    const client = checkSupabase()
    try {
      const { data, error } = await client
        .from('payments')
        .update({
          callback_data: callbackData,
          updated_at: new Date().toISOString()
        })
        .eq('order_id', orderId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating payment with callback:', error);
      throw error;
    }
  }
}; 