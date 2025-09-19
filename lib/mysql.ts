import mysql from 'mysql2/promise';

// MySQL Database Configuration
const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USERNAME || 'carethep_caretheplanet',
  password: process.env.DB_PASSWORD || 'caretheplanet@2025',
  database: process.env.DB_DATABASE || 'carethep_caretheplanet',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
};

// Create connection pool
let pool: mysql.Pool | null = null;

export const getConnection = async (): Promise<mysql.Pool> => {
  if (!pool) {
    try {
      pool = mysql.createPool(DB_CONFIG);
      console.log('🗄️ MySQL connection pool created successfully');
      
      // Test the connection
      const connection = await pool.getConnection();
      await connection.ping();
      connection.release();
      console.log('✅ MySQL database connection verified');
      
    } catch (error) {
      console.error('❌ MySQL connection failed:', error);
      throw new Error(`Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  return pool;
};

// Close connection pool
export const closeConnection = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('🔌 MySQL connection pool closed');
  }
};

// Execute query with error handling
export const executeQuery = async (query: string, values?: any[]): Promise<any> => {
  try {
    const connection = await getConnection();
    const [results] = await connection.execute(query, values);
    return results;
  } catch (error) {
    console.error('❌ Query execution failed:', error);
    console.error('📝 Query:', query);
    console.error('📝 Values:', values);
    throw error;
  }
};

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    await getConnection();
    return true;
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    return false;
  }
};