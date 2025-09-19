'use client';
import { useState, useEffect } from 'react';
import { 
  NewsletterSubscriber, 
  getNewsletterSubscribers, 
  removeNewsletterSubscriber, 
  unsubscribeNewsletterSubscriber,
  getNewsletterSubscriberCount 
} from '../../utils/adminData';

export default function NewsletterManagement() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [activeCount, setActiveCount] = useState(0);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = () => {
    const allSubscribers = getNewsletterSubscribers();
    setSubscribers(allSubscribers);
    setActiveCount(getNewsletterSubscriberCount());
  };

  const handleRemove = (id: string) => {
    if (confirm('Are you sure you want to permanently remove this subscriber?')) {
      removeNewsletterSubscriber(id);
      loadSubscribers();
    }
  };

  const handleUnsubscribe = (email: string) => {
    if (confirm('Are you sure you want to unsubscribe this email?')) {
      unsubscribeNewsletterSubscriber(email);
      loadSubscribers();
    }
  };

  const handleExport = () => {
    const activeSubscribers = subscribers.filter(sub => sub.isActive);
    const csvContent = [
      'Email,Subscribed Date,Source',
      ...activeSubscribers.map(sub => 
        `${sub.email},${new Date(sub.subscribedAt).toLocaleDateString()},${sub.source}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredSubscribers = subscribers
    .filter(sub => {
      if (filter === 'active') return sub.isActive;
      if (filter === 'inactive') return !sub.isActive;
      return true;
    })
    .filter(sub => 
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.source.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime());

  const getSourceDisplayName = (source: string) => {
    const names: { [key: string]: string } = {
      homepage: 'Homepage',
      contact: 'Contact Form',
      footer: 'Footer',
      popup: 'Popup'
    };
    return names[source] || source;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Newsletter Subscribers</h1>
              <p className="text-gray-600 mt-2">
                Manage your newsletter subscribers and track subscription sources
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleExport}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Export CSV
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{subscribers.length}</div>
              <div className="text-sm text-blue-600">Total Subscribers</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{activeCount}</div>
              <div className="text-sm text-green-600">Active Subscribers</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">{subscribers.length - activeCount}</div>
              <div className="text-sm text-red-600">Unsubscribed</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">
                {subscribers.length > 0 ? Math.round((activeCount / subscribers.length) * 100) : 0}%
              </div>
              <div className="text-sm text-purple-600">Engagement Rate</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by email or source..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
              />
            </div>
            <div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'inactive')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
              >
                <option value="all">All Subscribers</option>
                <option value="active">Active Only</option>
                <option value="inactive">Unsubscribed</option>
              </select>
            </div>
          </div>

          {/* Subscribers List */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subscribed Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {subscriber.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(subscriber.subscribedAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(subscriber.subscribedAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {getSourceDisplayName(subscriber.source)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          subscriber.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {subscriber.isActive ? 'Active' : 'Unsubscribed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          {subscriber.isActive ? (
                            <button
                              onClick={() => handleUnsubscribe(subscriber.email)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                            >
                              Unsubscribe
                            </button>
                          ) : (
                            <span className="text-gray-400">Unsubscribed</span>
                          )}
                          <button
                            onClick={() => handleRemove(subscriber.id)}
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredSubscribers.length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-500 text-lg">
                  {searchTerm || filter !== 'all' 
                    ? 'No subscribers match your filters' 
                    : 'No subscribers yet'
                  }
                </div>
                <p className="text-gray-400 mt-2">
                  {searchTerm || filter !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Subscribers will appear here when they sign up'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Summary */}
          {filteredSubscribers.length > 0 && (
            <div className="mt-6 text-sm text-gray-600">
              Showing {filteredSubscribers.length} of {subscribers.length} subscribers
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 