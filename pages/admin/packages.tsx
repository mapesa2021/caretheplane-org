'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  getTreePackages, 
  addTreePackage, 
  updateTreePackage, 
  deleteTreePackage, 
  TreePackage,
  isAdminAuthenticated 
} from '../../utils/adminData';

const PackagesAdmin = () => {
  const router = useRouter();
  const [packages, setPackages] = useState<TreePackage[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    treeCount: 1,
    price: 0,
    currency: 'Tsh',
    features: [''],
    isPopular: false,
    order: 1
  });

  // Check authentication
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login');
    }
  }, [router]);

  // Load packages
  useEffect(() => {
    if (isAdminAuthenticated()) {
      setPackages(getTreePackages());
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? Number(value) : value
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty features
    const filteredFeatures = formData.features.filter(feature => feature.trim() !== '');
    
    if (filteredFeatures.length === 0) {
      alert('Please add at least one feature');
      return;
    }
    
    const packageData = {
      ...formData,
      features: filteredFeatures
    };
    
    if (isEditing) {
      updateTreePackage(isEditing, packageData);
    } else {
      addTreePackage(packageData);
    }
    
    setPackages(getTreePackages());
    resetForm();
  };

  const handleEdit = (treePackage: TreePackage) => {
    setIsEditing(treePackage.id);
    setFormData({
      name: treePackage.name,
      description: treePackage.description,
      treeCount: treePackage.treeCount,
      price: treePackage.price,
      currency: treePackage.currency,
      features: treePackage.features.length > 0 ? treePackage.features : [''],
      isPopular: treePackage.isPopular,
      order: treePackage.order
    });
    setIsAdding(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this package?')) {
      deleteTreePackage(id);
      setPackages(getTreePackages());
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      treeCount: 1,
      price: 0,
      currency: 'Tsh',
      features: [''],
      isPopular: false,
      order: 1
    });
    setIsEditing(null);
    setIsAdding(false);
  };

  const currencyOptions = ['Tsh', '$', '€', '£', '¥'];

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Tree Packages</h1>
              <p className="text-gray-600">Add, edit, and remove tree planting packages with pricing and features</p>
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
                Add New Package
              </button>
            </div>
          </div>

          {/* Add/Edit Form */}
          {(isAdding || isEditing) && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {isEditing ? 'Edit Tree Package' : 'Add New Tree Package'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                      placeholder="e.g., Bronze Package"
                    />
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    placeholder="Describe what this package includes..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Trees *
                    </label>
                    <input
                      type="number"
                      name="treeCount"
                      value={formData.treeCount}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    >
                      {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features *
                  </label>
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          placeholder="Enter a feature..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="px-3 py-2 text-red-600 hover:text-red-800 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFeature}
                      className="text-eco-green hover:text-eco-dark transition-colors"
                    >
                      + Add Feature
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPopular"
                    checked={formData.isPopular}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-eco-green focus:ring-eco-green border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Mark as Popular Package
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-eco-green hover:bg-eco-dark text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    {isEditing ? 'Update Package' : 'Add Package'}
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

          {/* Packages List */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Current Tree Packages</h2>
            {packages.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No packages found. Add your first package above.</p>
            ) : (
              packages
                .sort((a, b) => a.order - b.order)
                .map((treePackage) => (
                  <div key={treePackage.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="text-xl font-semibold text-gray-900">{treePackage.name}</h3>
                          {treePackage.isPopular && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                              Popular
                            </span>
                          )}
                          <span className="text-sm text-gray-500">Order: {treePackage.order}</span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{treePackage.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                          <span>🌳 {treePackage.treeCount} Trees</span>
                          <span>💰 {treePackage.currency} {treePackage.price.toLocaleString()}</span>
                        </div>
                        
                        <div className="mb-3">
                          <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {treePackage.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(treePackage)}
                          className="px-3 py-1 text-eco-green hover:text-eco-dark transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(treePackage.id)}
                          className="px-3 py-1 text-red-600 hover:text-red-800 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
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

export default PackagesAdmin; 