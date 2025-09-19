'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  getTestimonials, 
  addTestimonial, 
  updateTestimonial, 
  deleteTestimonial, 
  Testimonial,
  isAdminAuthenticated 
} from '../../utils/adminData';

const TestimonialsAdmin = () => {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    avatar: '👤',
    order: 1
  });

  // Check authentication
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login');
    }
  }, [router]);

  // Load testimonials
  useEffect(() => {
    if (isAdminAuthenticated()) {
      setTestimonials(getTestimonials());
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      updateTestimonial(isEditing, formData);
    } else {
      addTestimonial(formData);
    }
    
    setTestimonials(getTestimonials());
    resetForm();
  };

  const handleEdit = (testimonial: Testimonial) => {
    setIsEditing(testimonial.id);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      avatar: testimonial.avatar,
      order: testimonial.order
    });
    setIsAdding(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      deleteTestimonial(id);
      setTestimonials(getTestimonials());
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      content: '',
      avatar: '👤',
      order: 1
    });
    setIsEditing(null);
    setIsAdding(false);
  };

  const avatarOptions = [
    '👤', '👨‍💼', '👩‍💼', '👨‍🔬', '👩‍🔬', '👨‍🌾', '👩‍🌾', 
    '👨‍🎓', '👩‍🎓', '👨‍⚕️', '👩‍⚕️', '👨‍🏫', '👩‍🏫', '👨‍💻', '👩‍💻'
  ];

  if (!isAdminAuthenticated()) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Testimonials</h1>
              <p className="text-gray-600">Add, edit, and remove testimonials from the home page</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/admin')}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back to Admin
              </button>
              <button
                onClick={() => setIsAdding(true)}
                className="bg-eco-green hover:bg-eco-dark text-white px-6 py-2 rounded-lg transition-colors"
              >
                Add New Testimonial
              </button>
            </div>
          </div>

          {/* Add/Edit Form */}
          {(isAdding || isEditing) && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role/Title *
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                      placeholder="e.g., Environmental Advocate"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Testimonial Content *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    placeholder="Enter the testimonial content..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Avatar Emoji
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {avatarOptions.map((emoji, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, avatar: emoji }))}
                          className={`w-10 h-10 text-xl rounded-lg border-2 transition-colors ${
                            formData.avatar === emoji 
                              ? 'border-eco-green bg-eco-green text-white' 
                              : 'border-gray-300 hover:border-eco-green'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-eco-green hover:bg-eco-dark text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    {isEditing ? 'Update Testimonial' : 'Add Testimonial'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Testimonials List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Current Testimonials</h2>
            {testimonials.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No testimonials found. Add your first testimonial above.</p>
            ) : (
              testimonials
                .sort((a, b) => a.order - b.order)
                .map((testimonial) => (
                  <div key={testimonial.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-eco-pale rounded-full flex items-center justify-center text-2xl">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                          <p className="text-eco-green text-sm">{testimonial.role}</p>
                          <p className="text-gray-600 text-sm mt-1">Order: {testimonial.order}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(testimonial)}
                          className="px-3 py-1 text-eco-green hover:text-eco-dark transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial.id)}
                          className="px-3 py-1 text-red-600 hover:text-red-800 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-700 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsAdmin; 