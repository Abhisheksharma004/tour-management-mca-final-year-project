'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGlobe, 
  FaStar, 
  FaCamera, 
  FaLanguage, 
  FaUpload, 
  FaSave, 
  FaTrash
} from 'react-icons/fa';

// Sample guide data
const guideData = {
  id: '1',
  name: 'Raj Mehta',
  email: 'raj.mehta@example.com',
  phone: '+91 98765 43210',
  location: 'Delhi, India',
  about: 'Professional tour guide with 7+ years of experience showing visitors the rich history and culture of Delhi. Specialized in heritage tours and food experiences.',
  profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
  coverImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077',
  rating: 4.8,
  reviews: 127,
  languages: ['English', 'Hindi', 'Punjabi'],
  website: 'https://rajmehta.example.com',
  specialties: ['Heritage Tours', 'Food Tours', 'Cultural Experiences', 'Photography Tours'],
  experience: 7,
  socialMedia: {
    facebook: 'https://facebook.com/rajmehta',
    instagram: 'https://instagram.com/raj_mehta_tours',
    twitter: 'https://twitter.com/rajmehtatours'
  },
  verificationStatus: 'Verified',
  certifications: [
    { name: 'Ministry of Tourism Guide License', year: '2018', verificationStatus: 'Verified' },
    { name: 'First Aid Certification', year: '2023', verificationStatus: 'Verified' }
  ],
  galleryImages: [
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da',
    'https://images.unsplash.com/photo-1566019055530-3ea65f7a3ebe',
    'https://images.unsplash.com/photo-1514222134-b57cbb8ce073',
    'https://images.unsplash.com/photo-1609609830354-8f615d61f7fc'
  ]
};

export default function ProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [profile, setProfile] = useState(guideData);
  const [newLanguage, setNewLanguage] = useState('');
  const [newSpecialty, setNewSpecialty] = useState('');
  
  const handleAddLanguage = () => {
    if (newLanguage && !profile.languages.includes(newLanguage)) {
      setProfile({
        ...profile,
        languages: [...profile.languages, newLanguage]
      });
      setNewLanguage('');
    }
  };
  
  const handleRemoveLanguage = (language: string) => {
    setProfile({
      ...profile,
      languages: profile.languages.filter(lang => lang !== language)
    });
  };
  
  const handleAddSpecialty = () => {
    if (newSpecialty && !profile.specialties.includes(newSpecialty)) {
      setProfile({
        ...profile,
        specialties: [...profile.specialties, newSpecialty]
      });
      setNewSpecialty('');
    }
  };
  
  const handleRemoveSpecialty = (specialty: string) => {
    setProfile({
      ...profile,
      specialties: profile.specialties.filter(spec => spec !== specialty)
    });
  };
  
  const handleSaveProfile = () => {
    // In a real app, this would send the data to an API
    console.log('Saving profile data:', profile);
    setIsEditMode(false);
  };
  
  return (
    <div>
      {/* Cover and Profile Image */}
      <div className="relative rounded-lg overflow-hidden mb-6 bg-gray-800 border border-gray-700">
        <div className="h-48 md:h-64 relative">
          <Image 
            src={profile.coverImage} 
            alt="Cover" 
            fill 
            style={{ objectFit: "cover" }}
            className="bg-gray-700"
            unoptimized
          />
          {isEditMode && (
            <button className="absolute right-4 bottom-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full">
              <FaCamera size={20} />
            </button>
          )}
        </div>
        
        <div className="px-4 md:px-6 pb-6 pt-16 relative">
          <div className="absolute -top-16 left-6 rounded-full overflow-hidden border-4 border-gray-800 shadow-lg bg-gray-700 w-24 h-24 md:w-32 md:h-32 relative">
            <Image 
              src={profile.profileImage} 
              alt={profile.name} 
              fill 
              style={{ objectFit: "cover" }}
              unoptimized
            />
            {isEditMode && (
              <button className="absolute inset-0 flex items-center justify-center bg-black/60 hover:bg-black/80 text-white opacity-0 hover:opacity-100 transition">
                <FaCamera size={24} />
              </button>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
              <div className="flex items-center text-sm text-gray-400 mt-1">
                <FaMapMarkerAlt className="mr-1" size={14} />
                {profile.location}
                {profile.verificationStatus === 'Verified' && (
                  <span className="ml-3 px-2 py-0.5 bg-green-900/50 text-green-300 rounded-full text-xs border border-green-700 flex items-center">
                    Verified
                  </span>
                )}
              </div>
            </div>
            
            {!isEditMode ? (
              <button 
                onClick={() => setIsEditMode(true)}
                className="mt-4 md:mt-0 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex space-x-3 mt-4 md:mt-0">
                <button 
                  onClick={() => setIsEditMode(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition flex items-center"
                >
                  <FaSave className="mr-2" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Profile Tabs and Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Tabs and Main Info */}
        <div className="md:col-span-2">
          <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden mb-6">
            <div className="flex border-b border-gray-700">
              <button 
                onClick={() => setActiveTab('basic')}
                className={`px-4 py-3 text-center text-sm font-medium flex-1 ${activeTab === 'basic' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400 hover:text-white'}`}
              >
                Basic Info
              </button>
              <button 
                onClick={() => setActiveTab('specialties')}
                className={`px-4 py-3 text-center text-sm font-medium flex-1 ${activeTab === 'specialties' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400 hover:text-white'}`}
              >
                Specialties
              </button>
              <button 
                onClick={() => setActiveTab('gallery')}
                className={`px-4 py-3 text-center text-sm font-medium flex-1 ${activeTab === 'gallery' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400 hover:text-white'}`}
              >
                Gallery
              </button>
            </div>
            
            <div className="p-4 md:p-6">
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">About Me</label>
                    {isEditMode ? (
                      <textarea 
                        className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:ring-orange-500 focus:border-orange-500"
                        rows={4}
                        value={profile.about}
                        onChange={(e) => setProfile({...profile, about: e.target.value})}
                      />
                    ) : (
                      <p className="text-gray-300">{profile.about}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                      {isEditMode ? (
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="text-gray-400" />
                          </div>
                          <input 
                            type="email" 
                            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-orange-500 focus:border-orange-500"
                            value={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-300">
                          <FaEnvelope className="text-gray-400 mr-2" />
                          {profile.email}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                      {isEditMode ? (
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaPhone className="text-gray-400" />
                          </div>
                          <input 
                            type="tel" 
                            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-orange-500 focus:border-orange-500"
                            value={profile.phone}
                            onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-300">
                          <FaPhone className="text-gray-400 mr-2" />
                          {profile.phone}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                      {isEditMode ? (
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaMapMarkerAlt className="text-gray-400" />
                          </div>
                          <input 
                            type="text" 
                            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-orange-500 focus:border-orange-500"
                            value={profile.location}
                            onChange={(e) => setProfile({...profile, location: e.target.value})}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-300">
                          <FaMapMarkerAlt className="text-gray-400 mr-2" />
                          {profile.location}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Website</label>
                      {isEditMode ? (
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaGlobe className="text-gray-400" />
                          </div>
                          <input 
                            type="url" 
                            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-orange-500 focus:border-orange-500"
                            value={profile.website}
                            onChange={(e) => setProfile({...profile, website: e.target.value})}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-300">
                          <FaGlobe className="text-gray-400 mr-2" />
                          <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">
                            {profile.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Languages</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {profile.languages.map((language, index) => (
                        <div 
                          key={index} 
                          className={`px-3 py-1.5 rounded-full text-sm flex items-center 
                            ${isEditMode 
                              ? 'bg-gray-700 text-gray-300 border border-gray-600' 
                              : 'bg-gray-700/50 text-gray-300'
                            }`
                          }
                        >
                          <FaLanguage className="mr-1 text-gray-400" />
                          {language}
                          {isEditMode && (
                            <button 
                              className="ml-2 text-gray-400 hover:text-red-400"
                              onClick={() => handleRemoveLanguage(language)}
                            >
                              &times;
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {isEditMode && (
                      <div className="flex">
                        <input 
                          type="text" 
                          placeholder="Add language..." 
                          className="flex-1 bg-gray-700 border border-gray-600 rounded-l-md p-2 text-white focus:ring-orange-500 focus:border-orange-500"
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddLanguage()}
                        />
                        <button 
                          className="bg-orange-600 hover:bg-orange-700 text-white px-3 rounded-r-md"
                          onClick={handleAddLanguage}
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Experience</label>
                    {isEditMode ? (
                      <div className="flex items-center">
                        <input 
                          type="number" 
                          min="0"
                          max="50"
                          className="w-20 bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-orange-500 focus:border-orange-500"
                          value={profile.experience}
                          onChange={(e) => setProfile({...profile, experience: parseInt(e.target.value) || 0})}
                        />
                        <span className="ml-2 text-gray-300">years</span>
                      </div>
                    ) : (
                      <p className="text-gray-300">{profile.experience} years</p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Specialties Tab */}
              {activeTab === 'specialties' && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">Your Specialties</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {profile.specialties.map((specialty, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg ${isEditMode 
                          ? 'bg-gray-700 border border-gray-600 flex justify-between items-center' 
                          : 'bg-gray-700/50'}`
                        }
                      >
                        <span className="text-gray-200">{specialty}</span>
                        {isEditMode && (
                          <button 
                            className="text-gray-400 hover:text-red-400"
                            onClick={() => handleRemoveSpecialty(specialty)}
                          >
                            <FaTrash size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {isEditMode && (
                    <div className="flex mt-4">
                      <input 
                        type="text" 
                        placeholder="Add specialty..." 
                        className="flex-1 bg-gray-700 border border-gray-600 rounded-l-md p-2 text-white focus:ring-orange-500 focus:border-orange-500"
                        value={newSpecialty}
                        onChange={(e) => setNewSpecialty(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSpecialty()}
                      />
                      <button 
                        className="bg-orange-600 hover:bg-orange-700 text-white px-3 rounded-r-md"
                        onClick={handleAddSpecialty}
                      >
                        Add
                      </button>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-400 mb-3">Certifications</label>
                    <div className="space-y-3">
                      {profile.certifications.map((cert, index) => (
                        <div 
                          key={index}
                          className={`p-3 rounded-lg ${isEditMode 
                            ? 'bg-gray-700 border border-gray-600' 
                            : 'bg-gray-700/50'}`
                          }
                        >
                          <div className="flex justify-between">
                            <span className="text-gray-200">{cert.name}</span>
                            <span className="text-gray-400">{cert.year}</span>
                          </div>
                          <div className="mt-1 flex justify-between items-center">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              cert.verificationStatus === 'Verified' 
                                ? 'bg-green-900/50 text-green-300 border border-green-700' 
                                : 'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
                            }`}>
                              {cert.verificationStatus}
                            </span>
                            {isEditMode && (
                              <button className="text-red-400 hover:text-red-300">
                                <FaTrash size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {isEditMode && (
                      <button className="mt-3 flex items-center text-orange-500 hover:text-orange-400">
                        <FaUpload className="mr-1" size={14} />
                        Add Certification
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {/* Gallery Tab */}
              {activeTab === 'gallery' && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Profile Gallery 
                    {isEditMode && <span className="text-gray-500 ml-2">(These images appear on your public profile)</span>}
                  </label>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {profile.galleryImages.map((image, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden relative group">
                        <Image 
                          src={image} 
                          alt={`Gallery image ${index + 1}`} 
                          fill 
                          style={{ objectFit: "cover" }}
                          className="bg-gray-700"
                          unoptimized
                        />
                        {isEditMode && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition">
                            <button className="p-2 bg-red-600 rounded-full">
                              <FaTrash className="text-white" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {isEditMode && (
                      <div className="aspect-square border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center bg-gray-700 hover:bg-gray-600 transition cursor-pointer">
                        <FaUpload className="text-gray-400 text-2xl mb-2" />
                        <span className="text-sm text-gray-400">Upload Image</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Column - Stats and Additional Info */}
        <div>
          <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg p-4 mb-6">
            <h2 className="text-lg font-medium text-white mb-3">Guide Stats</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Rating</span>
                  <div className="flex items-center">
                    <span className="text-white mr-1">{profile.rating}</span>
                    <FaStar className="text-yellow-500" />
                  </div>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500"
                    style={{ width: `${(profile.rating / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Reviews</span>
                <span className="text-white">{profile.reviews}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Total Tours</span>
                <span className="text-white">153</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Active Tours</span>
                <span className="text-white">5</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Response Rate</span>
                <span className="text-white">98%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg p-4">
            <h2 className="text-lg font-medium text-white mb-3">Account Settings</h2>
            
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition">
                Change Password
              </button>
              
              <button className="w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition">
                Notification Settings
              </button>
              
              <button className="w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition">
                Privacy Settings
              </button>
              
              <button className="w-full text-left px-4 py-2 bg-red-900/40 hover:bg-red-900/60 rounded-md text-red-300 border border-red-700 transition mt-6">
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 