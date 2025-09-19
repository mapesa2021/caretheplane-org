import { executeQuery, getConnection } from './mysql';

// Payment Service for MySQL
export const paymentService = {
  // Get all payments
  async getAll(): Promise<any[]> {
    try {
      const query = 'SELECT * FROM payments ORDER BY created_at DESC';
      const results = await executeQuery(query);
      return results;
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  },

  // Get payment by order ID
  async getByOrderId(orderId: string): Promise<any> {
    try {
      const query = 'SELECT * FROM payments WHERE order_id = ? LIMIT 1';
      const results = await executeQuery(query, [orderId]);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Error fetching payment by order ID:', error);
      throw error;
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
    try {
      const query = `
        INSERT INTO payments (
          order_id, amount, currency, buyer_email, buyer_name, buyer_phone, 
          zeno_pay_response, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
      `;
      
      const values = [
        paymentData.orderId,
        paymentData.amount,
        paymentData.currency,
        paymentData.buyerEmail,
        paymentData.buyerName,
        paymentData.buyerPhone,
        paymentData.zenoPayResponse ? JSON.stringify(paymentData.zenoPayResponse) : null
      ];

      await executeQuery(query, values);
      
      // Return the created payment
      return await this.getByOrderId(paymentData.orderId);
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  },

  // Update payment status
  async updateStatus(orderId: string, status: string, zenoPayResponse?: any): Promise<any> {
    try {
      const query = `
        UPDATE payments 
        SET status = ?, zeno_pay_response = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE order_id = ?
      `;
      
      const values = [
        status,
        zenoPayResponse ? JSON.stringify(zenoPayResponse) : null,
        orderId
      ];

      await executeQuery(query, values);
      return await this.getByOrderId(orderId);
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  },

  // Update payment with callback data
  async updateWithCallback(orderId: string, callbackData: any): Promise<any> {
    try {
      const query = `
        UPDATE payments 
        SET callback_data = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE order_id = ?
      `;
      
      const values = [
        JSON.stringify(callbackData),
        orderId
      ];

      await executeQuery(query, values);
      return await this.getByOrderId(orderId);
    } catch (error) {
      console.error('Error updating payment with callback:', error);
      throw error;
    }
  }
};

// Blog Service for MySQL
export const blogService = {
  // Get all blog posts
  async getAll(): Promise<any[]> {
    try {
      const query = 'SELECT * FROM blog_posts ORDER BY created_at DESC';
      const results = await executeQuery(query);
      return results;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  },

  // Get published blog posts
  async getPublished(): Promise<any[]> {
    try {
      const query = 'SELECT * FROM blog_posts WHERE status = "published" ORDER BY created_at DESC';
      const results = await executeQuery(query);
      return results;
    } catch (error) {
      console.error('Error fetching published blog posts:', error);
      throw error;
    }
  },

  // Get blog post by ID
  async getById(id: string): Promise<any> {
    try {
      const query = 'SELECT * FROM blog_posts WHERE id = ? LIMIT 1';
      const results = await executeQuery(query, [id]);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Error fetching blog post by ID:', error);
      throw error;
    }
  }
};

// Contact Service for MySQL
export const contactService = {
  // Get all contact messages
  async getAll(): Promise<any[]> {
    try {
      const query = 'SELECT * FROM contact_messages ORDER BY created_at DESC';
      const results = await executeQuery(query);
      return results;
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      throw error;
    }
  },

  // Create new contact message
  async create(messageData: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<any> {
    try {
      const query = `
        INSERT INTO contact_messages (
          first_name, last_name, email, subject, message
        ) VALUES (?, ?, ?, ?, ?)
      `;
      
      const values = [
        messageData.firstName,
        messageData.lastName,
        messageData.email,
        messageData.subject,
        messageData.message
      ];

      const result = await executeQuery(query, values);
      return result;
    } catch (error) {
      console.error('Error creating contact message:', error);
      throw error;
    }
  }
};

// Newsletter Service for MySQL
export const newsletterService = {
  // Get all subscribers
  async getAll(): Promise<any[]> {
    try {
      const query = 'SELECT * FROM newsletter_subscribers ORDER BY created_at DESC';
      const results = await executeQuery(query);
      return results;
    } catch (error) {
      console.error('Error fetching newsletter subscribers:', error);
      throw error;
    }
  },

  // Add new subscriber
  async subscribe(email: string, source: string = 'homepage'): Promise<any> {
    try {
      const query = `
        INSERT INTO newsletter_subscribers (email, source) 
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE is_active = TRUE
      `;
      
      const values = [email, source];
      const result = await executeQuery(query, values);
      return result;
    } catch (error) {
      console.error('Error adding newsletter subscriber:', error);
      throw error;
    }
  }
};

// Database health check
export const healthCheck = async (): Promise<boolean> => {
  try {
    const query = 'SELECT 1 as health_check';
    await executeQuery(query);
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
};