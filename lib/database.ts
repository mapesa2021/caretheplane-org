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
    
    // Convert snake_case to camelCase for frontend
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      position: item.position,
      bio: item.bio,
      avatar: item.avatar,
      email: item.email,
      linkedin: item.linkedin,
      twitter: item.twitter,
      order: item.order,
      isActive: item.is_active
    }))
  },

  async getActive(): Promise<TeamMember[]> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.TEAM_MEMBERS)
      .select('*')
      .eq('is_active', true)
      .order('order', { ascending: true })
    
    if (error) throw error
    
    // Convert snake_case to camelCase for frontend
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      position: item.position,
      bio: item.bio,
      avatar: item.avatar,
      email: item.email,
      linkedin: item.linkedin,
      twitter: item.twitter,
      order: item.order,
      isActive: item.is_active
    }))
  },

  async create(member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
    const client = checkSupabase()
    
    // Convert camelCase to snake_case for database
    const dbMember = {
      name: member.name,
      position: member.position,
      bio: member.bio,
      avatar: member.avatar,
      email: member.email,
      linkedin: member.linkedin,
      twitter: member.twitter,
      'order': member.order,
      is_active: member.isActive
    }
    
    const { data, error } = await client
      .from(TABLES.TEAM_MEMBERS)
      .insert([dbMember])
      .select()
      .single()
    
    if (error) throw error
    
    // Convert snake_case back to camelCase for frontend
    return {
      id: data.id,
      name: data.name,
      position: data.position,
      bio: data.bio,
      avatar: data.avatar,
      email: data.email,
      linkedin: data.linkedin,
      twitter: data.twitter,
      order: data.order,
      isActive: data.is_active
    }
  },

  async update(id: string, updates: Partial<TeamMember>): Promise<TeamMember | null> {
    const client = checkSupabase()
    
    // Convert camelCase to snake_case for database
    const dbUpdates: any = { updated_at: new Date().toISOString() }
    
    if (updates.name !== undefined) dbUpdates.name = updates.name
    if (updates.position !== undefined) dbUpdates.position = updates.position
    if (updates.bio !== undefined) dbUpdates.bio = updates.bio
    if (updates.avatar !== undefined) dbUpdates.avatar = updates.avatar
    if (updates.email !== undefined) dbUpdates.email = updates.email
    if (updates.linkedin !== undefined) dbUpdates.linkedin = updates.linkedin
    if (updates.twitter !== undefined) dbUpdates.twitter = updates.twitter
    if (updates.order !== undefined) dbUpdates.order = updates.order
    if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive
    
    const { data, error } = await client
      .from(TABLES.TEAM_MEMBERS)
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    
    // Convert snake_case back to camelCase for frontend
    if (!data) return null
    
    return {
      id: data.id,
      name: data.name,
      position: data.position,
      bio: data.bio,
      avatar: data.avatar,
      email: data.email,
      linkedin: data.linkedin,
      twitter: data.twitter,
      order: data.order,
      isActive: data.is_active
    }
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

// Testimonials Database Operations
export const testimonialsService = {
  async getAll(): Promise<Testimonial[]> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.TESTIMONIALS)
      .select('*')
      .order('order', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  async create(testimonial: Omit<Testimonial, 'id'>): Promise<Testimonial> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.TESTIMONIALS)
      .insert([testimonial])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: number, updates: Partial<Testimonial>): Promise<Testimonial | null> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.TESTIMONIALS)
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: number): Promise<boolean> {
    const client = checkSupabase()
    const { error } = await client
      .from(TABLES.TESTIMONIALS)
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}

// Hero Images Database Operations
export const heroImagesService = {
  async getAll(): Promise<HeroImage[]> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.HERO_IMAGES)
      .select('*')
      .order('order', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  async create(heroImage: Omit<HeroImage, 'id'>): Promise<HeroImage> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.HERO_IMAGES)
      .insert([heroImage])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: number, updates: Partial<HeroImage>): Promise<HeroImage | null> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.HERO_IMAGES)
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: number): Promise<boolean> {
    const client = checkSupabase()
    const { error } = await client
      .from(TABLES.HERO_IMAGES)
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}

// Tree Packages Database Operations
export const treePackagesService = {
  async getAll(): Promise<TreePackage[]> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.TREE_PACKAGES)
      .select('*')
      .order('order', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  async create(treePackage: Omit<TreePackage, 'id'>): Promise<TreePackage> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.TREE_PACKAGES)
      .insert([treePackage])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: number, updates: Partial<TreePackage>): Promise<TreePackage | null> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.TREE_PACKAGES)
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: number): Promise<boolean> {
    const client = checkSupabase()
    const { error } = await client
      .from(TABLES.TREE_PACKAGES)
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}

// Homepage Buttons Database Operations
export const buttonsService = {
  async getAll(): Promise<Button[]> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.BUTTONS)
      .select('*')
      .order('order', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  async getBySection(section: string): Promise<Button[]> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.BUTTONS)
      .select('*')
      .eq('section', section)
      .eq('is_active', true)
      .order('order', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  async create(button: Button): Promise<Button> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.BUTTONS)
      .insert([button])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<Button>): Promise<Button | null> {
    const client = checkSupabase()
    const { data, error } = await client
      .from(TABLES.BUTTONS)
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<boolean> {
    const client = checkSupabase()
    const { error } = await client
      .from(TABLES.BUTTONS)
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}
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