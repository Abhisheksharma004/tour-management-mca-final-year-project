'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { use } from 'react';

// Define types
type Tour = {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  maxParticipants: number;
};

type Review = {
  id: number;
  user: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
};

type Availability = {
  date: string;
  slots: string[];
};

type Guide = {
  id: string;
  name: string;
  location: string;
  languages: string[];
  rating: number;
  reviews: number | Review[];
  price: number;
  experience: number;
  bio: string;
  profileImage: string;
  galleryImages: string[];
  specialties: string[];
  tours: Tour[];
  availability: Availability[];
};

// Mock guides data
const guidesData: { [key: string]: Guide } = {
  'raj-mehta': {
    id: '1',
    name: 'Raj Mehta',
    location: 'Mumbai, India',
    languages: ['English', 'Hindi', 'Marathi'],
    rating: 4.9,
    reviews: 127,
    price: 2500,
    experience: 5,
    bio: "As a Mumbai native and history enthusiast, I'm passionate about sharing the diverse cultures and hidden gems of my city. From bustling markets to iconic landmarks, I'll help you experience Mumbai like a local, with authentic food experiences and rich cultural insights.",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    galleryImages: [
      'https://images.unsplash.com/photo-1598924957323-4700f9e40826?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1602424130259-aa54ea657bac?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&q=80&w=1470',
    ],
    specialties: ['History', 'Food', 'Architecture', 'Cultural Tours'],
    tours: [
      {
        id: '1',
        title: 'Mumbai Heritage Walk',
        description: 'Explore Mumbai\'s colonial architecture and historical sites, from the iconic Gateway of India to the stunning Victoria Terminus railway station.',
        duration: '3 hours',
        price: 2200,
        image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 8
      },
      {
        id: '2',
        title: 'Street Food Adventure',
        description: 'Sample Mumbai\'s famous street foods from vada pav to pav bhaji, with insights into the culinary traditions and spices that make them unique.',
        duration: '4 hours',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1602424130259-aa54ea657bac?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 6
      },
      {
        id: '3',
        title: 'Bollywood Experience',
        description: 'Discover the world\'s largest film industry with visits to iconic film studios, shooting locations, and insights into filmmaking processes, possibly with a chance to see shooting in action.',
        duration: '5 hours',
        price: 2700,
        image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 10
      }
    ],
    availability: [
      { date: '2024-12-10', slots: ['09:00', '15:00'] },
      { date: '2024-12-11', slots: ['09:00', '15:00', '18:00'] },
      { date: '2024-12-14', slots: ['15:00'] },
      { date: '2024-12-15', slots: ['09:00', '18:00'] },
      { date: '2024-12-17', slots: ['09:00', '15:00', '18:00'] }
    ]
  },
  'priya-sharma': {
    id: '2',
    name: 'Priya Sharma',
    location: 'Delhi, India',
    languages: ['English', 'Hindi', 'Punjabi'],
    rating: 5.0,
    reviews: 89,
    price: 3200,
    experience: 7,
    bio: "Born and raised in Delhi, I have a deep love for the rich history and diverse culture of India's capital. With a background in history and cultural studies, I provide insightful tours that connect you with both the historical monuments and the vibrant everyday life of Delhi.",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    galleryImages: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1585577733907-f172136517dc?auto=format&fit=crop&q=80&w=1528',
      'https://images.unsplash.com/photo-1596305589440-2645680df8ce?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=80&w=1470',
    ],
    specialties: ['Heritage', 'Food Tours', 'Cultural Experiences', 'Historical Monuments'],
    tours: [
      {
        id: '1',
        title: 'Old Delhi Heritage Tour',
        description: 'Walk through the narrow lanes of Old Delhi, exploring historical sites like the Red Fort, Jama Masjid, and the bustling Chandni Chowk market.',
        duration: '4 hours',
        price: 2900,
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 8
      },
      {
        id: '2',
        title: 'Delhi Food Trail',
        description: 'Taste the diverse flavors of Delhi\'s cuisine, from street food stalls to traditional eateries that have been operating for generations.',
        duration: '3 hours',
        price: 2250,
        image: 'https://images.unsplash.com/photo-1596305589440-2645680df8ce?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 6
      },
      {
        id: '3',
        title: 'Spiritual Delhi Journey',
        description: 'Visit the most significant religious sites in Delhi, including the Lotus Temple, Akshardham Temple, and Gurudwara Bangla Sahib.',
        duration: '5 hours',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 10
      }
    ],
    availability: [
      { date: '2024-12-10', slots: ['09:00', '14:00'] },
      { date: '2024-12-12', slots: ['09:00', '14:00', '18:00'] },
      { date: '2024-12-14', slots: ['14:00'] },
      { date: '2024-12-16', slots: ['09:00', '18:00'] },
      { date: '2024-12-18', slots: ['09:00', '14:00', '18:00'] }
    ]
  },
  'arjun-patel': {
    id: '3',
    name: 'Arjun Patel',
    location: 'Jaipur, India',
    languages: ['English', 'Hindi', 'Rajasthani'],
    rating: 4.8,
    reviews: 215,
    price: 2800,
    experience: 8,
    bio: "With deep roots in Rajasthan and a passion for photography, I offer tours that showcase the rich royal heritage and vibrant culture of Jaipur. As a descendant of a family that served in the royal courts, I share authentic stories and hidden perspectives on the Pink City's majestic history.",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    galleryImages: [
      'https://images.unsplash.com/photo-1599661046827-9d1be56d4043?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1598343438982-7d25b2556254?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1572698096303-997e5f3f2cd8?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1558440404-7d43d1cd0c05?auto=format&fit=crop&q=80&w=1470',
    ],
    specialties: ['History', 'Architecture', 'Photography', 'Royal Heritage'],
    tours: [
      {
        id: '1',
        title: 'Amber Fort Royal Tour',
        description: 'Explore the majestic Amber Fort with its stunning architecture, intricate mirror work, and panoramic views of the surrounding hills and Maota Lake.',
        duration: '4 hours',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1599661046827-9d1be56d4043?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 8
      },
      {
        id: '2',
        title: 'Jaipur Photography Walk',
        description: 'Capture the vibrant colors, architectural details, and daily life of Jaipur through your lens with expert guidance on the best angles and lighting.',
        duration: '3 hours',
        price: 1900,
        image: 'https://images.unsplash.com/photo-1598343438982-7d25b2556254?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 6
      },
      {
        id: '3',
        title: 'Palace and Bazaar Experience',
        description: 'Visit the City Palace and Hawa Mahal, then explore the bustling bazaars of Jaipur known for textiles, jewelry, and handicrafts with insights into traditional craftsmanship.',
        duration: '5 hours',
        price: 2800,
        image: 'https://images.unsplash.com/photo-1572698096303-997e5f3f2cd8?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 10
      }
    ],
    availability: [
      { date: '2024-12-09', slots: ['09:00', '15:00'] },
      { date: '2024-12-11', slots: ['09:00', '15:00', '18:00'] },
      { date: '2024-12-13', slots: ['15:00'] },
      { date: '2024-12-15', slots: ['09:00', '18:00'] },
      { date: '2024-12-17', slots: ['09:00', '15:00', '18:00'] }
    ]
  },
  'meera-iyer': {
    id: '4',
    name: 'Meera Iyer',
    location: 'Varanasi, India',
    languages: ['English', 'Hindi', 'Sanskrit'],
    rating: 4.7,
    reviews: 94,
    price: 2200,
    experience: 6,
    bio: "I'm a spiritual guide with deep knowledge of Varanasi's sacred traditions. Having studied Sanskrit and Hindu philosophy, I offer authentic experiences that connect travelers with the spiritual essence of India's oldest living city, from sunrise boat rides to evening ceremonies.",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    galleryImages: [
      'https://images.unsplash.com/photo-1561361058-c24cecda72e5?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1627895456330-d3e889d66c24?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1590584610997-730aeb8026b0?auto=format&fit=crop&q=80&w=1474',
      'https://images.unsplash.com/photo-1604159371465-7631aade0343?auto=format&fit=crop&q=80&w=1471',
    ],
    specialties: ['Spiritual Tours', 'Cultural Heritage', 'Photography', 'Hindu Ceremonies'],
    tours: [
      {
        id: '1',
        title: 'Sunrise Ganges Boat Ride',
        description: 'Experience the magical atmosphere of dawn on the sacred Ganges River, witnessing the morning rituals at the ghats as the city awakens.',
        duration: '2 hours',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1561361058-c24cecda72e5?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 6
      },
      {
        id: '2',
        title: 'Sacred Temples Journey',
        description: 'Visit the most significant temples of Varanasi, including the Kashi Vishwanath Temple, while learning about Hindu mythology and spiritual practices.',
        duration: '4 hours',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1627895456330-d3e889d66c24?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 8
      },
      {
        id: '3',
        title: 'Evening Ganga Aarti Experience',
        description: 'Witness the spectacular evening Ganga Aarti ceremony at Dashashwamedh Ghat, with privileged viewing positions and detailed explanations of the ritual significance.',
        duration: '3 hours',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1590584610997-730aeb8026b0?auto=format&fit=crop&q=80&w=1474',
        maxParticipants: 10
      }
    ],
    availability: [
      { date: '2024-12-10', slots: ['05:30', '16:00'] },
      { date: '2024-12-12', slots: ['05:30', '10:00', '16:00'] },
      { date: '2024-12-14', slots: ['10:00'] },
      { date: '2024-12-16', slots: ['05:30', '16:00'] },
      { date: '2024-12-18', slots: ['05:30', '10:00', '16:00'] }
    ]
  },
  'vikram-nair': {
    id: '5',
    name: 'Vikram Nair',
    location: 'Kerala, India',
    languages: ['English', 'Malayalam', 'Tamil'],
    rating: 4.9,
    reviews: 156,
    price: 2600,
    experience: 7,
    bio: "A native of Kerala with a deep love for its natural beauty and cultural traditions. I specialize in sustainable tourism experiences that showcase the backwaters, hill stations, and vibrant culture of God's Own Country while supporting local communities.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    galleryImages: [
      'https://images.unsplash.com/photo-1602301413458-69484f2a3f3b?auto=format&fit=crop&q=80&w=1471',
      'https://images.unsplash.com/photo-1609340442497-be3f6292ca49?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1605649461784-edc524486522?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1624958723474-07b315ce4233?auto=format&fit=crop&q=80&w=1470',
    ],
    specialties: ['Backwaters', 'Nature', 'Culture', 'Ayurveda'],
    tours: [
      {
        id: '1',
        title: 'Alleppey Backwater Cruise',
        description: 'Explore the serene backwaters of Kerala on a traditional houseboat, observing rural life, lush landscapes, and diverse birdlife along the waterways.',
        duration: '6 hours',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1602301413458-69484f2a3f3b?auto=format&fit=crop&q=80&w=1471',
        maxParticipants: 8
      },
      {
        id: '2',
        title: 'Munnar Tea Plantations',
        description: 'Visit the verdant tea gardens of Munnar in the Western Ghats, learning about tea production and enjoying breathtaking mountain views and cool climate.',
        duration: '7 hours',
        price: 3200,
        image: 'https://images.unsplash.com/photo-1609340442497-be3f6292ca49?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 6
      },
      {
        id: '3',
        title: 'Fort Kochi Heritage Walk',
        description: 'Discover the multicultural heritage of Fort Kochi with its Chinese fishing nets, Dutch Palace, Jewish Synagogue, and colonial architecture reflecting centuries of trading history.',
        duration: '4 hours',
        price: 1900,
        image: 'https://images.unsplash.com/photo-1605649461784-edc524486522?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 10
      }
    ],
    availability: [
      { date: '2024-12-09', slots: ['09:00', '15:00'] },
      { date: '2024-12-11', slots: ['09:00', '15:00'] },
      { date: '2024-12-13', slots: ['09:00'] },
      { date: '2024-12-15', slots: ['09:00', '15:00'] },
      { date: '2024-12-17', slots: ['09:00', '15:00'] }
    ]
  },
  'ananya-reddy': {
    id: '6',
    name: 'Ananya Reddy',
    location: 'Goa, India',
    languages: ['English', 'Konkani', 'Hindi'],
    rating: 4.8,
    reviews: 178,
    price: 3000,
    experience: 5,
    bio: "Goa is my home and passion. With a background in marine biology and local history, I offer tours that blend beach culture, Portuguese heritage, and ecological awareness. Whether you're looking for vibrant nightlife or tranquil beaches, I'll help you discover the authentic Goan experience.",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    galleryImages: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1587403810146-d37544f9e276?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1617653202545-6d38a2e6a252?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1554995301-f43d7c3bc833?auto=format&fit=crop&q=80&w=1470',
    ],
    specialties: ['Beaches', 'Nightlife', 'Portuguese Heritage', 'Wildlife'],
    tours: [
      {
        id: '1',
        title: 'North Goa Beach Hopping',
        description: 'Explore the vibrant beaches of North Goa, from popular Baga and Calangute to the more serene Morjim and Ashwem, with time for swimming and beachside relaxation.',
        duration: '6 hours',
        price: 2800,
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 8
      },
      {
        id: '2',
        title: 'Portuguese Goa Heritage',
        description: "Discover Goa's colonial past through its well-preserved Portuguese architecture, churches, and mansions in Old Goa and Fontainhas with historical context.",
        duration: '4 hours',
        price: 2400,
        image: 'https://images.unsplash.com/photo-1617653202545-6d38a2e6a252?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 10
      },
      {
        id: '3',
        title: 'Goan Cuisine Adventure',
        description: 'Sample authentic Goan cuisine with its unique blend of Portuguese and Indian influences, from seafood curries and vindaloo to bebinca dessert and feni liquor.',
        duration: '3 hours',
        price: 1750,
        image: 'https://images.unsplash.com/photo-1587403810146-d37544f9e276?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 6
      }
    ],
    availability: [
      { date: '2024-12-10', slots: ['09:00', '16:00'] },
      { date: '2024-12-12', slots: ['09:00', '16:00', '19:00'] },
      { date: '2024-12-14', slots: ['16:00'] },
      { date: '2024-12-16', slots: ['09:00', '19:00'] },
      { date: '2024-12-18', slots: ['09:00', '16:00', '19:00'] }
    ]
  },
  'rahul-verma': {
    id: '7',
    name: 'Rahul Verma',
    location: 'Agra, India',
    languages: ['English', 'Hindi', 'Urdu'],
    rating: 4.9,
    reviews: 210,
    price: 3400,
    experience: 9,
    bio: "With a master's degree in Mughal history and years of experience guiding visitors at the Taj Mahal, I provide in-depth insights into Agra's architectural marvels and cultural significance. I'll help you experience these iconic monuments beyond the usual tourist perspective.",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    galleryImages: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1471',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1476',
      'https://images.unsplash.com/photo-1545462616-01b3a9a039b9?auto=format&fit=crop&q=80&w=1528',
      'https://images.unsplash.com/photo-1602505829050-9eb4e9c35193?auto=format&fit=crop&q=80&w=1471',
    ],
    specialties: ['Mughal History', 'Architecture', 'Photography', 'Cultural Heritage'],
    tours: [
      {
        id: '1',
        title: 'Taj Mahal at Sunrise',
        description: 'Experience the breathtaking beauty of the Taj Mahal at dawn, when crowds are minimal and the marble changes color with the rising sun, with expert historical commentary.',
        duration: '3 hours',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1471',
        maxParticipants: 6
      },
      {
        id: '2',
        title: 'Agra Fort & Heritage',
        description: 'Explore the impressive Agra Fort, a UNESCO World Heritage site that served as the main residence of the Mughal emperors until 1638, with its palaces, audience halls, and mosques.',
        duration: '4 hours',
        price: 2200,
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1476',
        maxParticipants: 8
      },
      {
        id: '3',
        title: 'Fatehpur Sikri Excursion',
        description: 'Visit the abandoned city of Fatehpur Sikri, built by Emperor Akbar as his capital and later deserted, featuring a unique blend of Hindu and Islamic architectural elements.',
        duration: '5 hours',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1602505829050-9eb4e9c35193?auto=format&fit=crop&q=80&w=1471',
        maxParticipants: 10
      }
    ],
    availability: [
      { date: '2024-12-09', slots: ['06:00', '14:00'] },
      { date: '2024-12-11', slots: ['06:00', '14:00', '16:00'] },
      { date: '2024-12-13', slots: ['14:00'] },
      { date: '2024-12-15', slots: ['06:00', '16:00'] },
      { date: '2024-12-17', slots: ['06:00', '14:00', '16:00'] }
    ]
  },
  'sunita-das': {
    id: '8',
    name: 'Sunita Das',
    location: 'Darjeeling, India',
    languages: ['English', 'Bengali', 'Nepali'],
    rating: 4.7,
    reviews: 86,
    price: 2400,
    experience: 6,
    bio: "Born in the hills of Darjeeling, I've spent my life exploring the tea gardens, mountain trails, and unique cultural blend of this region. With expertise in tea production and local ecology, I offer authentic experiences that connect travelers with Darjeeling's natural beauty and cultural heritage.",
    profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    galleryImages: [
      'https://images.unsplash.com/photo-1544433228-6a73f0a146d1?auto=format&fit=crop&q=80&w=1374',
      'https://images.unsplash.com/photo-1570789718598-43aa743d7760?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1562576900-06cd5458fba9?auto=format&fit=crop&q=80&w=1473',
      'https://images.unsplash.com/photo-1652186337961-53861ba4591f?auto=format&fit=crop&q=80&w=1470',
    ],
    specialties: ['Tea Plantations', 'Himalayan Treks', 'Local Culture', 'Buddhist Monasteries'],
    tours: [
      {
        id: '1',
        title: 'Tiger Hill Sunrise',
        description: 'Witness the spectacular sunrise over the Himalayan range including Kanchenjunga, the world\'s third-highest mountain, from the famous Tiger Hill viewpoint.',
        duration: '3 hours',
        price: 1400,
        image: 'https://images.unsplash.com/photo-1544433228-6a73f0a146d1?auto=format&fit=crop&q=80&w=1374',
        maxParticipants: 8
      },
      {
        id: '2',
        title: 'Tea Garden Experience',
        description: 'Visit historic tea estates to learn about the cultivation, processing, and tasting of Darjeeling\'s world-famous tea, with walks through scenic plantations.',
        duration: '4 hours',
        price: 2000,
        image: 'https://images.unsplash.com/photo-1570789718598-43aa743d7760?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 6
      },
      {
        id: '3',
        title: 'Darjeeling Himalayan Railway',
        description: 'Experience a journey on the historic "Toy Train," a UNESCO World Heritage Site, with stops at Batasia Loop and Ghum Monastery for panoramic views and cultural insights.',
        duration: '5 hours',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1562576900-06cd5458fba9?auto=format&fit=crop&q=80&w=1473',
        maxParticipants: 10
      }
    ],
    availability: [
      { date: '2024-12-10', slots: ['05:00', '11:00'] },
      { date: '2024-12-12', slots: ['05:00', '11:00', '14:00'] },
      { date: '2024-12-14', slots: ['11:00'] },
      { date: '2024-12-16', slots: ['05:00', '14:00'] },
      { date: '2024-12-18', slots: ['05:00', '11:00', '14:00'] }
    ]
  },
  'ajay-gupta': {
    id: '9',
    name: 'Ajay Gupta',
    location: 'Delhi, India',
    languages: ['English', 'Hindi', 'French'],
    rating: 4.8,
    reviews: 123,
    price: 2700,
    experience: 7,
    bio: "A food historian and culinary expert, I take travelers on gastronomic journeys through Delhi's diverse neighborhoods. Having worked in food journalism, I combine my knowledge of local cuisines with historical context, connecting you with authentic food experiences from street stalls to family kitchens.",
    profileImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1448&q=80",
    galleryImages: [
      'https://images.unsplash.com/photo-1517519014922-8fc06b814a0e?auto=format&fit=crop&q=80&w=1452',
      'https://images.unsplash.com/photo-1624833655340-8eb68c8a27b7?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1634815655301-37bed135da47?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1585058168721-13cbe3d3ef36?auto=format&fit=crop&q=80&w=1470',
    ],
    specialties: ['Street Food', 'History', 'Local Markets', 'Cooking Workshops'],
    tours: [
      {
        id: '1',
        title: 'Old Delhi Street Food Trail',
        description: 'Taste your way through the labyrinthine lanes of Old Delhi, sampling iconic street foods like parathas, chaat, jalebi, and kebabs from century-old establishments.',
        duration: '4 hours',
        price: 2200,
        image: 'https://images.unsplash.com/photo-1517519014922-8fc06b814a0e?auto=format&fit=crop&q=80&w=1452',
        maxParticipants: 8
      },
      {
        id: '2',
        title: 'Spice Market Tour',
        description: 'Explore Asia\'s largest spice market in Khari Baoli, learning about the history and uses of various spices in Indian cuisine, with tastings of teas and spice mixtures.',
        duration: '3 hours',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1634815655301-37bed135da47?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 6
      },
      {
        id: '3',
        title: 'Home Cooking Experience',
        description: 'Visit a local home to learn how to prepare authentic North Indian dishes, followed by a shared meal and insights into Indian culinary traditions and family life.',
        duration: '4 hours',
        price: 2400,
        image: 'https://images.unsplash.com/photo-1585058168721-13cbe3d3ef36?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 4
      }
    ],
    availability: [
      { date: '2024-12-09', slots: ['10:00', '16:00'] },
      { date: '2024-12-11', slots: ['10:00', '16:00', '19:00'] },
      { date: '2024-12-13', slots: ['16:00'] },
      { date: '2024-12-15', slots: ['10:00', '19:00'] },
      { date: '2024-12-17', slots: ['10:00', '16:00', '19:00'] }
    ]
  },
  'shreya-choudhury': {
    id: '10',
    name: 'Shreya Choudhury',
    location: 'Mumbai, India',
    languages: ['English', 'Hindi', 'Gujarati'],
    rating: 4.7,
    reviews: 95,
    price: 2650,
    experience: 5,
    bio: "As a former film industry professional and Mumbai native, I offer unique insights into the city's vibrant film culture, urban lifestyle, and coastal heritage. My tours blend Bollywood glamour with authentic local experiences, showcasing Mumbai's dynamic energy and cultural contrasts.",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    galleryImages: [
      'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1611154046036-cd481f03356f?auto=format&fit=crop&q=80&w=1473',
      'https://images.unsplash.com/photo-1570168866489-c8aedc7c3512?auto=format&fit=crop&q=80&w=1527',
      'https://images.unsplash.com/photo-1623050804066-42bcedb4e81d?auto=format&fit=crop&q=80&w=1471',
    ],
    specialties: ['Bollywood', 'Urban Culture', 'Coastal Cuisine', 'Contemporary Art'],
    tours: [
      {
        id: '1',
        title: 'Bollywood Behind the Scenes',
        description: 'Discover the world\'s largest film industry with visits to iconic film studios, shooting locations, and insights into filmmaking processes, possibly with a chance to see shooting in action.',
        duration: '5 hours',
        price: 2800,
        image: 'https://images.unsplash.com/photo-1611154046036-cd481f03356f?auto=format&fit=crop&q=80&w=1473',
        maxParticipants: 8
      },
      {
        id: '2',
        title: 'Mumbai Coastal Journey',
        description: 'Explore Mumbai\'s relationship with the sea from the iconic Gateway of India to the fishing village of Worli, with seafood tastings and cultural insights.',
        duration: '4 hours',
        price: 2400,
        image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 10
      },
      {
        id: '3',
        title: 'Mumbai Art Tour',
        description: 'Discover Mumbai\'s vibrant contemporary art scene with visits to leading galleries, street art districts, and design studios showcasing modern Indian creativity.',
        duration: '3 hours',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1570168866489-c8aedc7c3512?auto=format&fit=crop&q=80&w=1527',
        maxParticipants: 6
      }
    ],
    availability: [
      { date: '2024-12-10', slots: ['10:00', '15:00'] },
      { date: '2024-12-12', slots: ['10:00', '15:00', '18:00'] },
      { date: '2024-12-14', slots: ['15:00'] },
      { date: '2024-12-16', slots: ['10:00', '18:00'] },
      { date: '2024-12-18', slots: ['10:00', '15:00', '18:00'] }
    ]
  },
  'nikhil-desai': {
    id: '11',
    name: 'Nikhil Desai',
    location: 'Jaipur, India',
    languages: ['English', 'Hindi', 'German'],
    rating: 4.6,
    reviews: 78,
    price: 2450,
    experience: 4,
    bio: "With a family background in traditional Rajasthani crafts, I offer unique insights into Jaipur's artistic heritage. My tours focus on the city's rich artisanal traditions, from textiles and jewelry to pottery and block printing, connecting travelers with local craftspeople and workshops.",
    profileImage: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    galleryImages: [
      'https://images.unsplash.com/photo-1598343432255-aee689fc21a3?auto=format&fit=crop&q=80&w=1374',
      'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?auto=format&fit=crop&q=80&w=1374',
      'https://images.unsplash.com/photo-1590617774401-b1ce1a426c5f?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1566057344278-8902c563c928?auto=format&fit=crop&q=80&w=1470',
    ],
    specialties: ['Craft Workshops', 'Royal Heritage', 'Textile History', 'Architecture'],
    tours: [
      {
        id: '1',
        title: 'Jaipur Textile Heritage',
        description: 'Discover the vibrant textile traditions of Jaipur through visits to block printing workshops, textile museums, and interactions with master craftspeople.',
        duration: '4 hours',
        price: 2100,
        image: 'https://images.unsplash.com/photo-1598343432255-aee689fc21a3?auto=format&fit=crop&q=80&w=1374',
        maxParticipants: 6
      },
      {
        id: '2',
        title: 'Jewelry Heritage Tour',
        description: 'Explore Jaipur\'s famous gem-cutting and jewelry-making traditions with visits to workshops, bazaars, and a chance to learn about traditional techniques.',
        duration: '3 hours',
        price: 1700,
        image: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?auto=format&fit=crop&q=80&w=1374',
        maxParticipants: 8
      },
      {
        id: '3',
        title: 'Craft Workshop Experience',
        description: 'Participate in hands-on workshops learning traditional Rajasthani crafts such as block printing, pottery, or blue pottery with master artisans.',
        duration: '5 hours',
        price: 2650,
        image: 'https://images.unsplash.com/photo-1590617774401-b1ce1a426c5f?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 4
      }
    ],
    availability: [
      { date: '2024-12-09', slots: ['09:00', '14:00'] },
      { date: '2024-12-11', slots: ['09:00', '14:00', '17:00'] },
      { date: '2024-12-13', slots: ['14:00'] },
      { date: '2024-12-15', slots: ['09:00', '17:00'] },
      { date: '2024-12-17', slots: ['09:00', '14:00', '17:00'] }
    ]
  },
  'kavita-singh': {
    id: '12',
    name: 'Kavita Singh',
    location: 'Varanasi, India',
    languages: ['English', 'Hindi', 'Bhojpuri'],
    rating: 4.9,
    reviews: 142,
    price: 2300,
    experience: 8,
    bio: "Born into a family of Varanasi musicians, I offer unique insight into the city's spiritual traditions and cultural practices. With deep knowledge of both Hindu and Buddhist traditions, my tours connect travelers with authentic spiritual experiences while respecting the sacred nature of these ancient practices.",
    profileImage: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=689&q=80",
    galleryImages: [
      'https://images.unsplash.com/photo-1612859625997-8279e1bd079f?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1524492514790-1c02e4b788e6?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1544948281-76852703b8e9?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1585166059784-e438d328a37d?auto=format&fit=crop&q=80&w=1470',
    ],
    specialties: ['Spiritual Ceremonies', 'River Cruises', 'Ancient History', 'Classical Music'],
    tours: [
      {
        id: '1',
        title: 'Spiritual Journey through Varanasi',
        description: 'Experience the spiritual essence of Varanasi through its temples, ashrams, and sacred ceremonies, with insights into Hindu philosophy and practices.',
        duration: '5 hours',
        price: 2100,
        image: 'https://images.unsplash.com/photo-1612859625997-8279e1bd079f?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 6
      },
      {
        id: '2',
        title: 'Ganges River Exploration',
        description: 'Discover life along the sacred river with an extended boat journey past the ghats, witnessing daily rituals, cremations, and the changing face of riverside Varanasi.',
        duration: '3 hours',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1544948281-76852703b8e9?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 8
      },
      {
        id: '3',
        title: 'Varanasi Music Experience',
        description: 'Explore Varanasi\'s rich musical heritage with visits to instrument makers, interactions with musicians, and an evening classical performance.',
        duration: '4 hours',
        price: 1900,
        image: 'https://images.unsplash.com/photo-1585166059784-e438d328a37d?auto=format&fit=crop&q=80&w=1470',
        maxParticipants: 10
      }
    ],
    availability: [
      { date: '2024-12-10', slots: ['06:00', '16:00'] },
      { date: '2024-12-12', slots: ['06:00', '11:00', '16:00'] },
      { date: '2024-12-14', slots: ['11:00'] },
      { date: '2024-12-16', slots: ['06:00', '16:00'] },
      { date: '2024-12-18', slots: ['06:00', '11:00', '16:00'] }
    ]
  },
};

export default function GuideProfile({ params }: { params: { name: string } | Promise<{ name: string }> }) {
  // Unwrap params if it's a Promise
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  const guideName = unwrappedParams.name;
  const guide = guidesData[guideName];
  
  // If guide doesn't exist, show 404
  if (!guide) {
    notFound();
  }

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTour, setSelectedTour] = useState(guide.tours[0].id);
  const [participants, setParticipants] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const availableDates = guide.availability.map(item => item.date);
  const availableTimes = selectedDate 
    ? guide.availability.find(item => item.date === selectedDate)?.slots || []
    : [];

  const selectedTourObject = guide.tours.find(tour => tour.id === selectedTour);

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
    setSelectedTime(''); // Reset time when date changes
  };

  const handleBookTour = () => {
    if (!selectedDate || !selectedTime || !selectedTour) {
      alert('Please select a date, time and tour');
      return;
    }
    
    // In a real app, this would send the booking data to a server
    console.log('Booking:', {
      guideId: guide.id,
      guideName: guide.name,
      tourId: selectedTour,
      tourName: selectedTourObject?.title,
      date: selectedDate,
      time: selectedTime,
      participants
    });
    
    // Show success message
    setBookingSuccess(true);
    
    // Reset form
    setTimeout(() => {
      setSelectedDate('');
      setSelectedTime('');
      setParticipants(1);
      setBookingSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-12">
      {/* Header with guide photo and basic info */}
      <div className="relative h-96">
        <div className="absolute inset-0">
          <Image 
            src={guide.profileImage}
            alt={`${guide.name}, tour guide in ${guide.location}`}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            className="opacity-40"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-end">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image 
                src={guide.profileImage}
                alt={guide.name}
                fill
                sizes="128px"
                style={{ objectFit: "cover" }}
                unoptimized
              />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h1 className="text-3xl font-bold">{guide.name}</h1>
              <p className="text-xl text-gray-300">{guide.location}</p>
              <div className="mt-2 flex items-center justify-center md:justify-start">
                <span className="text-yellow-500">★</span>
                <span className="ml-1 font-bold">{guide.rating}</span>
                <span className="ml-1 text-gray-300">({typeof guide.reviews === 'number' ? guide.reviews : guide.reviews.length} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - About section and Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">About {guide.name}</h2>
              <div className="space-y-4">
                <p className="text-gray-300">{guide.bio}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-orange-400">Languages</h3>
                    <ul className="mt-2 text-gray-300">
                      {guide.languages.map((language, index) => (
                        <li key={index}>{language}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-orange-400">Specialties</h3>
                    <ul className="mt-2 text-gray-300">
                      {guide.specialties.map((specialty, index) => (
                        <li key={index}>{specialty}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-700">
                  <div className="flex justify-between">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{guide.experience}+</p>
                      <p className="text-gray-300">Years Experience</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{typeof guide.reviews === 'number' ? guide.reviews : guide.reviews.length}</p>
                      <p className="text-gray-300">Reviews</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">₹{guide.price}</p>
                      <p className="text-gray-300">Average Rate/Hour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                {guide.galleryImages.map((image, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                    <Image 
                      src={image}
                      alt={`${guide.name}'s tour in ${guide.location}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                      className="hover:opacity-90 transition-opacity"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Tours with {guide.name}</h2>
              <div className="space-y-6">
                {guide.tours.map((tour) => (
                  <div 
                    key={tour.id} 
                    className={`p-4 rounded-lg transition-colors ${selectedTour === tour.id ? 'bg-gray-700 border border-orange-500' : 'bg-gray-700 border border-transparent hover:border-gray-600'}`}
                    onClick={() => setSelectedTour(tour.id)}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 mb-4 md:mb-0">
                        <div className="relative h-40 md:h-full rounded-lg overflow-hidden">
                          <Image 
                            src={tour.image}
                            alt={tour.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 25vw"
                            style={{ objectFit: "cover" }}
                            unoptimized
                          />
                        </div>
                      </div>
                      <div className="md:w-3/4 md:pl-6">
                        <div className="flex flex-wrap justify-between items-start mb-2">
                          <h3 className="text-xl font-bold">{tour.title}</h3>
                          <p className="font-bold text-orange-400">₹{tour.price} / person</p>
                        </div>
                        <p className="text-gray-300 mb-4">{tour.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <div className="flex items-center">
                            <FaClock className="mr-1" />
                            <span>{tour.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <FaUser className="mr-1" />
                            <span>Max {tour.maxParticipants} people</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column - Booking */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-4">Book a Tour</h2>
              
              {bookingSuccess ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-green-800 text-white p-4 rounded-lg mb-4"
                >
                  <h3 className="font-bold text-lg">Booking Successful!</h3>
                  <p>Your tour with {guide.name} has been booked. Check your email for details.</p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Select Tour</label>
                    <select 
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={selectedTour}
                      onChange={(e) => setSelectedTour(e.target.value)}
                    >
                      {guide.tours.map(tour => (
                        <option key={tour.id} value={tour.id}>
                          {tour.title} - ₹{tour.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        <span>Select Date</span>
                      </div>
                    </label>
                    <select 
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={selectedDate}
                      onChange={handleDateChange}
                    >
                      <option value="">Choose a date</option>
                      {availableDates.map(date => (
                        <option key={date} value={date}>{date}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      <div className="flex items-center">
                        <FaClock className="mr-2" />
                        <span>Select Time</span>
                      </div>
                    </label>
                    <select 
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      disabled={!selectedDate}
                    >
                      <option value="">Choose a time</option>
                      {availableTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      <div className="flex items-center">
                        <FaUser className="mr-2" />
                        <span>Number of Participants</span>
                      </div>
                    </label>
                    <select 
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={participants}
                      onChange={(e) => setParticipants(Number(e.target.value))}
                    >
                      {[...Array(selectedTourObject?.maxParticipants || 10)].map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center text-lg mb-4">
                      <span className="font-medium">Total Price:</span>
                      <span className="font-bold text-orange-400">
                        ₹{selectedTourObject ? selectedTourObject.price * participants : 0}
                      </span>
                    </div>
                    
                    <motion.button 
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-md"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBookTour}
                    >
                      Book Now
                    </motion.button>
                    
                    <p className="text-sm text-gray-400 mt-2 text-center">
                      No payment required now. Pay directly to the guide.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 