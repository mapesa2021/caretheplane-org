'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { teamService } from '../../lib/database';
import type { TeamMember } from '../../utils/adminData';

const TeamManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    avatar: '👨‍💼',
    email: '',
    linkedin: '',
    twitter: '',
    order: 1,
    isActive: true
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (token === 'admin-token-123') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadTeamMembers();
    }
  }, [isAuthenticated]);

  const loadTeamMembers = async () => {
    try {
      const members = await teamService.getAll();
      setTeamMembers(members);
    } catch (error) {
      console.error('Error loading team members:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      bio: '',
      avatar: '👨‍💼',
      email: '',
      linkedin: '',
      twitter: '',
      order: 1,
      isActive: true
    });
    setEditingMember(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingMember) {
        // Update existing member
        await teamService.update(editingMember.id, formData);
      } else {
        // Add new member
        await teamService.create(formData);
      }
      
      await loadTeamMembers();
      resetForm();
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio,
      avatar: member.avatar,
      email: member.email || '',
      linkedin: member.linkedin || '',
      twitter: member.twitter || '',
      order: member.order,
      isActive: member.isActive
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      try {
        await teamService.delete(id);
        await loadTeamMembers();
      } catch (error) {
        console.error('Error deleting team member:', error);
      }
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
              await teamService.update(id, { isActive: !currentStatus });
      await loadTeamMembers();
    } catch (error) {
      console.error('Error updating team member:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Team Management - CareThePlanet Admin</title>
        <meta name="description" content="Manage team members for CareThePlanet" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Link href="/admin" className="mr-4">
                  <button className="text-gray-600 hover:text-gray-900">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </Link>
                <div className="w-8 h-8 bg-eco-green rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">👥</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, Admin</span>
                <button
                  onClick={() => {
                    localStorage.removeItem('adminToken');
                    router.push('/admin/login');
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
              <p className="text-gray-600">Manage your team information displayed on the About page</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-eco-green hover:bg-eco-dark text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Team Member
            </button>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position *
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio *
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                  />
                </div>

                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Profile Picture URL
                     </label>
                     <input
                       type="url"
                       name="avatar"
                       value={formData.avatar}
                       onChange={handleInputChange}
                       placeholder="https://example.com/profile-image.jpg"
                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                     />
                     <p className="text-xs text-gray-500 mt-1">
                       Enter a URL to an image or leave empty to use default emoji
                     </p>
                     {formData.avatar && formData.avatar.startsWith('http') && (
                       <div className="mt-2">
                         <p className="text-xs text-gray-600 mb-1">Preview:</p>
                         <div className="w-16 h-16 bg-eco-pale rounded-full overflow-hidden">
                           <img 
                             src={formData.avatar} 
                             alt="Preview"
                             className="w-full h-full object-cover"
                             onError={(e) => {
                               e.currentTarget.style.display = 'none';
                               e.currentTarget.nextElementSibling?.classList.remove('hidden');
                             }}
                           />
                           <div className="w-full h-full flex items-center justify-center hidden">
                             <span className="text-sm text-gray-400">❌</span>
                           </div>
                         </div>
                       </div>
                     )}
                   </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter URL
                    </label>
                    <input
                      type="url"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-eco-green focus:ring-eco-green border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Active (visible on website)
                  </label>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-eco-green hover:bg-eco-dark text-white rounded-lg transition-colors duration-200"
                  >
                    {editingMember ? 'Update Member' : 'Add Member'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Team Members List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Team Members ({teamMembers.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teamMembers.map((member) => (
                    <tr key={member.id}>
                                             <td className="px-6 py-4 whitespace-nowrap">
                         <div className="flex items-center">
                           <div className="w-10 h-10 bg-eco-pale rounded-full flex items-center justify-center mr-3 overflow-hidden">
                             {member.avatar && member.avatar.startsWith('http') ? (
                               <img 
                                 src={member.avatar} 
                                 alt={member.name}
                                 className="w-full h-full object-cover"
                                 onError={(e) => {
                                   e.currentTarget.style.display = 'none';
                                   e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                 }}
                               />
                             ) : null}
                             <div className={`w-full h-full flex items-center justify-center ${member.avatar && member.avatar.startsWith('http') ? 'hidden' : ''}`}>
                               <span className="text-xl">{member.avatar || '👨‍💼'}</span>
                             </div>
                           </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.bio.substring(0, 50)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {member.email && (
                            <div className="flex items-center mb-1">
                              <span className="text-gray-400 mr-2">📧</span>
                              <span className="text-xs">{member.email}</span>
                            </div>
                          )}
                          {member.linkedin && (
                            <div className="flex items-center mb-1">
                              <span className="text-gray-400 mr-2">💼</span>
                              <span className="text-xs">LinkedIn</span>
                            </div>
                          )}
                          {member.twitter && (
                            <div className="flex items-center">
                              <span className="text-gray-400 mr-2">🐦</span>
                              <span className="text-xs">Twitter</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleActive(member.id, member.isActive)}
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            member.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {member.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(member)}
                          className="text-eco-green hover:text-eco-dark mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {teamMembers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No team members found. Add your first team member above.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default TeamManagement; 