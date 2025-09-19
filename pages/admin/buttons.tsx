'use client';
import { useState, useEffect } from 'react';
import { Button, getButtons, saveButtons, updateButton, addButton, deleteButton, getButtonSections } from '../../utils/adminData';

export default function ButtonsManagement() {
  const [buttons, setButtons] = useState<Button[]>([]);
  const [editingButton, setEditingButton] = useState<Button | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    section: 'hero',
    text: '',
    url: '',
    variant: 'primary' as 'primary' | 'secondary',
    order: 1,
    isActive: true
  });

  const sections = getButtonSections();

  useEffect(() => {
    setButtons(getButtons());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingButton) {
      updateButton(editingButton.id, formData);
      setEditingButton(null);
    } else {
      addButton(formData);
    }
    
    setButtons(getButtons());
    resetForm();
  };

  const handleEdit = (button: Button) => {
    setEditingButton(button);
    setFormData({
      section: button.section,
      text: button.text,
      url: button.url,
      variant: button.variant,
      order: button.order,
      isActive: button.isActive
    });
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this button?')) {
      deleteButton(id);
      setButtons(getButtons());
    }
  };

  const resetForm = () => {
    setFormData({
      section: 'hero',
      text: '',
      url: '',
      variant: 'primary',
      order: 1,
      isActive: true
    });
    setEditingButton(null);
    setIsAdding(false);
  };

  const getSectionDisplayName = (section: string) => {
    const names: { [key: string]: string } = {
      hero: 'Hero Section',
      mission: 'Join Our Mission',
      about: 'About Section',
      projects: 'Projects Section',
      cta: 'Call to Action',
      newsletter: 'Newsletter Section'
    };
    return names[section] || section;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Manage Homepage Buttons</h1>
            <button
              onClick={() => setIsAdding(true)}
              className="bg-eco-green text-white px-4 py-2 rounded-lg hover:bg-eco-dark transition-colors"
            >
              Add New Button
            </button>
          </div>

          {/* Form */}
          {(isAdding || editingButton) && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingButton ? 'Edit Button' : 'Add New Button'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section
                    </label>
                    <select
                      value={formData.section}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                      required
                    >
                      {sections.map(section => (
                        <option key={section} value={section}>
                          {getSectionDisplayName(section)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                      placeholder="e.g., Donate Now"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL/Link
                    </label>
                    <input
                      type="text"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                      placeholder="e.g., /donate"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Style Variant
                    </label>
                    <select
                      value={formData.variant}
                      onChange={(e) => setFormData({ ...formData, variant: e.target.value as 'primary' | 'secondary' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                      min="1"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                      Active
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-eco-green text-white px-6 py-2 rounded-lg hover:bg-eco-dark transition-colors"
                  >
                    {editingButton ? 'Update Button' : 'Add Button'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Buttons List */}
          <div className="space-y-6">
            {sections.map(section => {
              const sectionButtons = buttons.filter(button => button.section === section);
              if (sectionButtons.length === 0) return null;
              
              return (
                <div key={section} className="border border-gray-200 rounded-lg">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {getSectionDisplayName(section)}
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {sectionButtons
                      .sort((a, b) => a.order - b.order)
                      .map(button => (
                        <div key={button.id} className="px-4 py-4 flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-500 w-8">#{button.order}</span>
                              <div>
                                <div className="font-medium text-gray-900">{button.text}</div>
                                <div className="text-sm text-gray-500">{button.url}</div>
                              </div>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                button.variant === 'primary' 
                                  ? 'bg-eco-green text-white' 
                                  : 'bg-gray-200 text-gray-700'
                              }`}>
                                {button.variant}
                              </span>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                button.isActive 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {button.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(button)}
                              className="text-eco-green hover:text-eco-dark transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(button.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 