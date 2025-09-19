'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  getContactMessages, 
  updateContactMessageStatus, 
  deleteContactMessage,
  getContactMessageCount,
  getNewContactMessageCount,
  ContactMessage 
} from '../../utils/adminData';

export default function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    loadMessages();

    const handleStorageChange = () => {
      loadMessages();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, []);

  const loadMessages = () => {
    const allMessages = getContactMessages();
    setMessages(allMessages);
  };

  const handleStatusChange = (id: string, newStatus: 'new' | 'read' | 'replied') => {
    updateContactMessageStatus(id, newStatus);
    loadMessages();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      deleteContactMessage(id);
      loadMessages();
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesFilter = filter === 'all' || message.status === filter;
    const matchesSearch = 
      message.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Email', 'Subject', 'Message', 'Date', 'Status'],
      ...filteredMessages.map(msg => [
        `${msg.firstName} ${msg.lastName}`,
        msg.email,
        msg.subject,
        `"${msg.message.replace(/"/g, '""')}"`,
        new Date(msg.submittedAt).toLocaleDateString(),
        msg.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-messages-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
              <p className="text-gray-600 mt-2">
                Manage messages from the contact form
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={exportToCSV}
                className="bg-eco-green text-white px-4 py-2 rounded-lg hover:bg-eco-dark transition-colors duration-200"
              >
                Export to CSV
              </button>
              <Link
                href="/admin"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                Back to Admin
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{getContactMessageCount()}</div>
              <div className="text-sm text-blue-600">Total Messages</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{getNewContactMessageCount()}</div>
              <div className="text-sm text-red-600">New Messages</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {messages.filter(m => m.status === 'read').length}
              </div>
              <div className="text-sm text-yellow-600">Read Messages</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {messages.filter(m => m.status === 'replied').length}
              </div>
              <div className="text-sm text-green-600">Replied Messages</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
            >
              <option value="all">All Messages</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>

          {/* Messages List */}
          <div className="space-y-4">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No messages found.
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div key={message.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {message.firstName} {message.lastName}
                      </h3>
                      <p className="text-eco-green">{message.email}</p>
                      <p className="text-gray-600 text-sm">
                        {new Date(message.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                        {message.status}
                      </span>
                      <div className="flex space-x-2">
                        <select
                          value={message.status}
                          onChange={(e) => handleStatusChange(message.id, e.target.value as any)}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                        <button
                          onClick={() => handleDelete(message.id)}
                          className="text-red-600 hover:text-red-800 text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Subject: {message.subject}</h4>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {message.message.length > 200 
                        ? `${message.message.substring(0, 200)}...` 
                        : message.message
                      }
                    </p>
                    {message.message.length > 200 && (
                      <button
                        onClick={() => setSelectedMessage(message)}
                        className="text-eco-green hover:text-eco-dark text-sm mt-2"
                      >
                        Read full message
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Full Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Message from {selectedMessage.firstName} {selectedMessage.lastName}
                  </h2>
                  <p className="text-eco-green">{selectedMessage.email}</p>
                  <p className="text-gray-600 text-sm">
                    {new Date(selectedMessage.submittedAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Subject: {selectedMessage.subject}</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 