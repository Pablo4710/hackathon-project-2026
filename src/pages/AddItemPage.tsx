import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AddItemPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    pointValue: 25,
    tags: [] as string[]
  });
  
  const [images, setImages] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    'Outerwear',
    'Tops', 
    'Bottoms',
    'Dresses',
    'Shoes',
    'Accessories',
    'Activewear',
    'Formal'
  ];

  const conditions = [
    { value: 'New', description: 'Never worn, with tags' },
    { value: 'Like New', description: 'Worn once or twice, excellent condition' },
    { value: 'Good', description: 'Worn several times, good condition' },
    { value: 'Fair', description: 'Worn regularly, shows some wear' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '12', 'One Size'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you would upload to a file storage service
      // For now, we'll use placeholder images
      const newImages = Array.from(files).map((file, index) => 
        `https://images.pexels.com/photos/${1040945 + index}/pexels-photo-${1040945 + index}.jpeg`
      );
      setImages(prev => [...prev, ...newImages].slice(0, 5)); // Max 5 images
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const calculatePointValue = () => {
    let base = 20;
    
    // Condition multiplier
    const conditionMultipliers = {
      'New': 1.5,
      'Like New': 1.3,
      'Good': 1.0,
      'Fair': 0.7
    };
    
    // Category multiplier
    const categoryMultipliers = {
      'Outerwear': 1.4,
      'Dresses': 1.2,
      'Formal': 1.3,
      'Shoes': 1.1,
      'Accessories': 0.8,
      'Tops': 1.0,
      'Bottoms': 1.0,
      'Activewear': 1.1
    };

    if (formData.condition && formData.category) {
      const conditionMult = conditionMultipliers[formData.condition as keyof typeof conditionMultipliers] || 1;
      const categoryMult = categoryMultipliers[formData.category as keyof typeof categoryMultipliers] || 1;
      
      const calculated = Math.round(base * conditionMult * categoryMult);
      setFormData(prev => ({ ...prev, pointValue: calculated }));
    }
  };

  React.useEffect(() => {
    calculatePointValue();
  }, [formData.condition, formData.category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Item submitted successfully! It will be reviewed before going live.');
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to submit item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please log in</h2>
          <p className="text-gray-600">You need to be logged in to list items.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="px-6 py-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">List a New Item</h1>
            <p className="text-gray-600 mt-2">
              Share your pre-loved items with the ReWear community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Images Upload */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Photos (Max 5)
              </label>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {images.length < 5 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center hover:border-green-400 transition-colors">
                    <label className="cursor-pointer flex flex-col items-center">
                      <Upload className="h-6 w-6 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Add Photo</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-500">
                Upload clear photos showing the item's condition. First photo will be the main image.
              </p>
            </div>

            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Vintage Levi's Denim Jacket"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Type
                </label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="e.g., Jacket, T-Shirt, Sneakers"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size *
                </label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select size</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Describe the item's condition, fit, material, and any flaws..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Condition and Points */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <div className="space-y-2">
                  {conditions.map(condition => (
                    <label key={condition.value} className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="condition"
                        value={condition.value}
                        checked={formData.condition === condition.value}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{condition.value}</div>
                        <div className="text-sm text-gray-600">{condition.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Point Value
                </label>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-700 font-medium">Suggested Points:</span>
                    <span className="text-2xl font-bold text-green-600">{formData.pointValue}</span>
                  </div>
                  <p className="text-sm text-green-600">
                    Points are calculated based on category and condition
                  </p>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={formData.pointValue}
                    onChange={(e) => setFormData(prev => ({ ...prev, pointValue: parseInt(e.target.value) }))}
                    className="w-full mt-3"
                  />
                  <div className="flex justify-between text-xs text-green-600 mt-1">
                    <span>10</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-green-500 hover:text-green-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add tags (vintage, casual, designer...)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Items are reviewed before being published to ensure quality and community standards.
                </p>
                <button
                  type="submit"
                  disabled={loading || !formData.title || !formData.category || !formData.size || !formData.condition || !formData.description}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Submitting...' : 'Submit for Review'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;