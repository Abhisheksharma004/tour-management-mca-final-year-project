'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Image from 'next/image';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaEdit, 
  FaSave,
  FaStar,
  FaCalendarAlt,
  FaLanguage,
  FaDollarSign,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

interface GuideProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  guide?: any; // In a real app, this would be properly typed
}

export default function GuideProfileModal({ isOpen, onClose, guide }: GuideProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  // Default guide data if none provided
  const defaultGuide = {
    id: 'G001',
    name: 'Raj Mehta',
    email: 'raj.mehta@indianguide.com',
    phone: '+91 98765 43210',
    location: 'Delhi, India',
    bio: 'Experienced local guide with deep knowledge of Delhi heritage sites and history. Fluent in English, Hindi, and French.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    rating: 4.8,
    totalTours: 156,
    experience: '5 years',
    languages: ['English', 'Hindi', 'French'],
    specialties: ['Historical Sites', 'Cultural Tours', 'Food Tours'],
    hourlyRate: 1200,
    verified: true,
    featured: true,
    availability: ['Weekdays', 'Weekends', 'Evenings']
  };

  const guideData = guide || defaultGuide;
  const [formData, setFormData] = useState({ ...guideData });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: 'languages' | 'specialties' | 'availability'
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const handleSave = () => {
    // In a real app, you would save this to the backend
    // For now, we'll just close the edit mode
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...guideData });
    setIsEditing(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Guide Profile"
      size="xl"
    >
      <div className="space-y-6">
        {/* Header with Avatar and Toggle Edit Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center pb-4 border-b border-gray-700">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-orange-500">
              <Image 
                src={formData.avatar}
                alt={formData.name}
                fill
                className="object-cover"
                sizes="80px"
                priority
              />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-white">{formData.name}</h3>
              <div className="flex items-center mt-1">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="text-white font-medium">{formData.rating}</span>
                <span className="text-gray-400 text-sm ml-1">({formData.totalTours} tours)</span>
              </div>
              <div className="flex items-center mt-1 text-sm">
                <span className={`px-2 py-0.5 rounded-full ${formData.verified ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'}`}>
                  {formData.verified ? 'Verified' : 'Unverified'}
                </span>
                {formData.featured && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-orange-900 text-orange-300">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
              isEditing 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
          >
            {isEditing ? 'Cancel' : <><FaEdit className="mr-2" /> Edit Profile</>}
          </button>
        </div>

        {/* Profile Info or Edit Form */}
        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Hourly Rate (₹)</label>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="verified"
                    name="verified"
                    checked={formData.verified}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 rounded"
                  />
                  <label htmlFor="verified" className="ml-2 block text-sm text-gray-300">
                    Verified
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-300">
                    Featured
                  </label>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">Languages</label>
                <div className="flex flex-wrap gap-2">
                  {formData.languages.map((language, index) => (
                    <input
                      key={index}
                      type="text"
                      value={language}
                      onChange={(e) => handleArrayChange(e, index, 'languages')}
                      className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">Specialties</label>
                <div className="flex flex-wrap gap-2">
                  {formData.specialties.map((specialty, index) => (
                    <input
                      key={index}
                      type="text"
                      value={specialty}
                      onChange={(e) => handleArrayChange(e, index, 'specialties')}
                      className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">Avatar URL</label>
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center"
              >
                <FaSave className="mr-2" /> Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <FaEnvelope className="text-orange-400 mt-1 mr-3" />
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="text-white">{formData.email}</div>
                </div>
              </div>
              <div className="flex items-start">
                <FaPhone className="text-orange-400 mt-1 mr-3" />
                <div>
                  <div className="text-sm text-gray-400">Phone</div>
                  <div className="text-white">{formData.phone}</div>
                </div>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-orange-400 mt-1 mr-3" />
                <div>
                  <div className="text-sm text-gray-400">Location</div>
                  <div className="text-white">{formData.location}</div>
                </div>
              </div>
              <div className="flex items-start">
                <FaCalendarAlt className="text-orange-400 mt-1 mr-3" />
                <div>
                  <div className="text-sm text-gray-400">Experience</div>
                  <div className="text-white">{formData.experience}</div>
                </div>
              </div>
              <div className="flex items-start">
                <FaLanguage className="text-orange-400 mt-1 mr-3" />
                <div>
                  <div className="text-sm text-gray-400">Languages</div>
                  <div className="text-white">{formData.languages.join(', ')}</div>
                </div>
              </div>
              <div className="flex items-start">
                <FaDollarSign className="text-orange-400 mt-1 mr-3" />
                <div>
                  <div className="text-sm text-gray-400">Hourly Rate</div>
                  <div className="text-white">₹{formData.hourlyRate}</div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-start">
                <div className="w-full">
                  <div className="text-sm text-gray-400 mb-2">Bio</div>
                  <div className="text-white">{formData.bio}</div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <div className="text-sm text-gray-400 mb-2">Specialties</div>
              <div className="flex flex-wrap gap-2">
                {formData.specialties.map((specialty, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <div className="text-sm text-gray-400 mb-2">Availability</div>
              <div className="flex flex-wrap gap-2">
                {formData.availability.map((day, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-6 border-t border-gray-700">
          <h4 className="text-lg font-medium text-white mb-4">Actions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center justify-center"
            >
              <FaCheck className="mr-2" /> Approve Guide
            </button>
            <button
              className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center justify-center"
            >
              <FaTimes className="mr-2" /> Reject Guide
            </button>
            <button
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center"
            >
              View All Tours
            </button>
            <button
              className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center justify-center"
            >
              View Earnings
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
} 