import { NextApiRequest, NextApiResponse } from 'next';
import { testConnection } from '../../../lib/mysql';
import { healthCheck } from '../../../lib/mysql-database';

interface DatabaseTestResponse {
  success: boolean;
  message: string;
  details?: {
    connection: boolean;
    healthCheck: boolean;
    config: {
      host: string;
      port: number;
      database: string;
      username: string;
    };
  };
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<DatabaseTestResponse>) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    console.log('🧪 Testing MySQL database connection...');

    // Test basic connection
    const connectionTest = await testConnection();
    console.log('📊 Connection test result:', connectionTest);

    // Test database operations
    const healthCheckResult = await healthCheck();
    console.log('🏥 Health check result:', healthCheckResult);

    const config = {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      database: process.env.DB_DATABASE || 'carethep_caretheplanet',
      username: process.env.DB_USERNAME || 'carethep_caretheplanet'
    };

    if (connectionTest && healthCheckResult) {
      return res.status(200).json({
        success: true,
        message: 'MySQL database connection successful',
        details: {
          connection: connectionTest,
          healthCheck: healthCheckResult,
          config
        }
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Database connection failed',
        details: {
          connection: connectionTest,
          healthCheck: healthCheckResult,
          config
        }
      });
    }

  } catch (error: any) {
    console.error('❌ Database test failed:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Database test failed',
      error: error.message || 'Unknown database error'
    });
  }
}