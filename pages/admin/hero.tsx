import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { heroImagesService } from '../../lib/database';
import type { HeroImage } from '../../utils/adminData';

const HeroManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [editingImage, setEditingImage] = useState<HeroImage | null>(null);
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
    if (isAuthenticated) {
      loadHeroImages();
    }
  }, [isAuthenticated]);

  const loadHeroImages = async () => {
    try {
      const images = await heroImagesService.getAll();
      setHeroImages(images);
    } catch (error) {
      console.error('Error loading hero images:', error);
      alert('Error loading hero images. Please try again.');
    }
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleEditImage = (image: HeroImage) => {
    setEditingImage({ ...image });
  };

  const handleSaveImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    setIsSubmitting(true);
    try {
      if (editingImage.id && editingImage.id > 0 && heroImages.find(img => img.id === editingImage.id)) {
        // This is an existing image
        await heroImagesService.update(editingImage.id, {
          src: editingImage.src,
          alt: editingImage.alt,
          title: editingImage.title,
          order: editingImage.order
        });
      } else {
        // This is a new image
        await heroImagesService.create({
          src: editingImage.src,
          alt: editingImage.alt,
          title: editingImage.title,
          order: editingImage.order
        });
      }
      
      await loadHeroImages();
      setEditingImage(null);
    } catch (error) {
      console.error('Error saving hero image:', error);
      alert('Error saving hero image. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteImage = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await heroImagesService.delete(id);
        await loadHeroImages();
      } catch (error) {
        console.error('Error deleting hero image:', error);
        alert('Error deleting hero image. Please try again.');
      }
    }
  };

  const handleAddImage = () => {
    const newImage: HeroImage = {
      id: Date.now(),
      src: '',
      alt: '',
      title: '',
      order: heroImages.length + 1
    };
    setEditingImage(newImage);
  };

  const handleReorder = async (fromIndex: number, toIndex: number) => {
    const newImages = [...heroImages];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    
    // Update order numbers
    const updates = newImages.map((img, index) => ({
      ...img,
      order: index + 1
    }));
    
    try {
      // Update all images with new order
      for (const img of updates) {
        await heroImagesService.update(img.id, { order: img.order });
      }
      
      await loadHeroImages();
    } catch (error) {
      console.error('Error reordering images:', error);
      alert('Error reordering images. Please try again.');
    }
  };

  const handleSaveAll = async () => {
    // This function is no longer needed since we save individual changes immediately
    alert('All changes have been saved automatically!');
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
        <title>Hero Image Management - CareThePlanet Admin</title>
        <meta name="description" content="Manage hero slider images for CareThePlanet website" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Link href="/admin" className="mr-4">
                  <div className="w-8 h-8 bg-eco-green rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">🌱</span>
                  </div>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Hero Image Management</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleAddImage}
                  className="bg-eco-green hover:bg-eco-dark text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  + Add Image
                </button>
                <button
                  onClick={handleSaveAll}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save All Changes'}
                </button>
                <Link
                  href="/admin"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Hero Image Guidelines</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>• Images should be high-quality and relevant to environmental conservation</p>
                  <p>• Recommended size: 1920x1080 pixels or similar aspect ratio</p>
                  <p>• Use descriptive alt text for accessibility</p>
                  <p>• Drag and drop to reorder images (first image appears first)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroImages.map((image, index) => (
              <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Image Preview */}
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    onError={() => {
                      // Handle error if needed
                    }}
                  />
                  <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    Order: {image.order}
                  </div>
                  {image.src && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      ✓ Loaded
                    </div>
                  )}
                </div>

                {/* Image Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{image.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{image.alt}</p>
                  
                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditImage(image)}
                      className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm hover:bg-blue-200 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded text-sm hover:bg-red-200 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>

                  {/* Reorder Controls */}
                  <div className="flex justify-center mt-3 space-x-2">
                    {index > 0 && (
                      <button
                        onClick={() => handleReorder(index, index - 1)}
                        className="bg-gray-100 text-gray-600 p-1 rounded hover:bg-gray-200 transition-colors duration-200"
                        title="Move up"
                      >
                        ↑
                      </button>
                    )}
                    {index < heroImages.length - 1 && (
                      <button
                        onClick={() => handleReorder(index, index + 1)}
                        className="bg-gray-100 text-gray-600 p-1 rounded hover:bg-gray-200 transition-colors duration-200"
                        title="Move down"
                      >
                        ↓
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Modal */}
          {editingImage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {editingImage.id > 5 ? 'Add New Image' : 'Edit Image'}
                </h3>
                
                <form onSubmit={handleSaveImage} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={editingImage.src}
                      onChange={(e) => setEditingImage(prev => prev ? { ...prev, src: e.target.value } : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingImage.title}
                      onChange={(e) => setEditingImage(prev => prev ? { ...prev, title: e.target.value } : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                      placeholder="Image title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alt Text *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={editingImage.alt}
                      onChange={(e) => setEditingImage(prev => prev ? { ...prev, alt: e.target.value } : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                      placeholder="Description of the image for accessibility"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setEditingImage(null)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-eco-green hover:bg-eco-dark text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default HeroManagement; 