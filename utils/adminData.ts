// Admin Data Storage Utility
// In production, this would be replaced with a proper database and API

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface HeroImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  order: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  order: number;
}

export interface TreePackage {
  id: number;
  name: string;
  description: string;
  treeCount: number;
  price: number;
  currency: string;
  features: string[];
  isPopular: boolean;
  order: number;
}

export interface Button {
  id: string;
  section: string;
  text: string;
  url: string;
  variant: 'primary' | 'secondary';
  order: number;
  isActive: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
  source: string; // 'homepage', 'contact', etc.
}

export interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'replied';
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  avatar: string; // emoji or image URL
  email?: string;
  linkedin?: string;
  twitter?: string;
  order: number;
  isActive: boolean;
}

// Blog Posts Storage
export const getBlogPosts = (): BlogPost[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('caretheplanet_blog_posts');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Return default posts if none stored
  const defaultPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Impact of Tree Planting on Climate Change",
      excerpt: "Discover how strategic tree planting initiatives can significantly reduce carbon emissions and combat global warming.",
      content: "This is the full content of the blog post about tree planting and climate change...",
      author: "Dr. Sarah Johnson",
      date: "August 15, 2024",
      readTime: "5 min read",
      category: "Climate Action",
      image: "🌳",
      status: "published",
      createdAt: "2024-08-15T10:00:00Z",
      updatedAt: "2024-08-15T10:00:00Z"
    },
    {
      id: 2,
      title: "Sustainable Living: Small Changes, Big Impact",
      excerpt: "Learn about simple daily habits that can make a substantial difference in reducing your environmental footprint.",
      content: "This is the full content of the blog post about sustainable living...",
      author: "Michael Chen",
      date: "August 12, 2024",
      readTime: "4 min read",
      category: "Sustainability",
      image: "♻️",
      status: "published",
      createdAt: "2024-08-12T10:00:00Z",
      updatedAt: "2024-08-12T10:00:00Z"
    },
    {
      id: 3,
      title: "Community-Led Conservation Success Stories",
      excerpt: "Explore inspiring stories of communities around the world that have successfully restored their local ecosystems.",
      content: "This is the full content of the blog post about community conservation...",
      author: "Maria Rodriguez",
      date: "August 10, 2024",
      readTime: "6 min read",
      category: "Community",
      image: "🌍",
      status: "draft",
      createdAt: "2024-08-10T10:00:00Z",
      updatedAt: "2024-08-10T10:00:00Z"
    }
  ];
  
  localStorage.setItem('caretheplanet_blog_posts', JSON.stringify(defaultPosts));
  return defaultPosts;
};

export const saveBlogPosts = (posts: BlogPost[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('caretheplanet_blog_posts', JSON.stringify(posts));
};

export const addBlogPost = (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost => {
  const posts = getBlogPosts();
  const newPost: BlogPost = {
    ...post,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  posts.push(newPost);
  saveBlogPosts(posts);
  return newPost;
};

export const updateBlogPost = (id: number, updates: Partial<BlogPost>): BlogPost | null => {
  const posts = getBlogPosts();
  const index = posts.findIndex(post => post.id === id);
  
  if (index === -1) return null;
  
  posts[index] = {
    ...posts[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  saveBlogPosts(posts);
  return posts[index];
};

export const deleteBlogPost = (id: number): boolean => {
  const posts = getBlogPosts();
  const filteredPosts = posts.filter(post => post.id !== id);
  
  if (filteredPosts.length === posts.length) return false;
  
  saveBlogPosts(filteredPosts);
  return true;
};

// Hero Images Storage
export const getHeroImages = (): HeroImage[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('caretheplanet_hero_images');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Return default hero images if none stored
  const defaultImages: HeroImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Majestic mountains with snow-capped peaks above clouds",
      title: "Protecting Our Mountains",
      order: 1
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      alt: "Lush green forest with sunlight filtering through trees",
      title: "Restoring Forests",
      order: 2
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Person planting a tree in a forest",
      title: "Planting Trees Together",
      order: 3
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      alt: "Beautiful sunset over ocean waves",
      title: "Protecting Our Oceans",
      order: 4
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Wildlife in natural habitat",
      title: "Preserving Wildlife",
      order: 5
    }
  ];
  
  localStorage.setItem('caretheplanet_hero_images', JSON.stringify(defaultImages));
  return defaultImages;
};

export const saveHeroImages = (images: HeroImage[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('caretheplanet_hero_images', JSON.stringify(images));
};

export const updateHeroImage = (id: number, updates: Partial<HeroImage>): HeroImage | null => {
  const images = getHeroImages();
  const index = images.findIndex(img => img.id === id);
  
  if (index === -1) return null;
  
  images[index] = {
    ...images[index],
    ...updates
  };
  
  saveHeroImages(images);
  return images[index];
};

export const addHeroImage = (image: Omit<HeroImage, 'id'>): HeroImage => {
  const images = getHeroImages();
  const newImage: HeroImage = {
    ...image,
    id: Date.now()
  };
  
  images.push(newImage);
  saveHeroImages(images);
  return newImage;
};

export const deleteHeroImage = (id: number): boolean => {
  const images = getHeroImages();
  const filteredImages = images.filter(img => img.id !== id);
  
  if (filteredImages.length === images.length) return false;
  
  saveHeroImages(filteredImages);
  return true;
};

// Admin Authentication
export const isAdminAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('adminToken');
  return token === 'admin-token-123'; // In production, this would validate against a server
};

export const adminLogin = (username: string, password: string): boolean => {
  if (username === 'admin' && password === 'caretheplanet2024') {
    localStorage.setItem('adminToken', 'admin-token-123');
    return true;
  }
  return false;
};

export const adminLogout = (): void => {
  localStorage.removeItem('adminToken');
};

// Testimonials Storage
export const getTestimonials = (): Testimonial[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('caretheplanet_testimonials');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Return default testimonials if none stored
  const defaultTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "David Chen",
      role: "Environmental Advocate",
      content: "I've been supporting CareThePlanet for over two years now, and I'm amazed by the impact they've made. Their tree planting initiatives have transformed barren lands into thriving forests. It's incredible to see the difference we can make together.",
      avatar: "👨‍💼",
      order: 1
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Climate Scientist",
      content: "As a climate scientist, I'm impressed by CareThePlanet's data-driven approach to environmental conservation. Their projects are not just well-intentioned but scientifically sound. They're making real, measurable progress in the fight against climate change.",
      avatar: "👩‍🔬",
      order: 2
    },
    {
      id: 3,
      name: "Miguel Rodriguez",
      role: "Local Farmer",
      content: "CareThePlanet didn't just plant trees on my land—they taught me sustainable farming practices that have improved my crop yields while protecting the environment. Their community-focused approach has made all the difference.",
      avatar: "👨‍🌾",
      order: 3
    }
  ];
  
  localStorage.setItem('caretheplanet_testimonials', JSON.stringify(defaultTestimonials));
  return defaultTestimonials;
};

export const saveTestimonials = (testimonials: Testimonial[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('caretheplanet_testimonials', JSON.stringify(testimonials));
};

export const updateTestimonial = (id: number, updates: Partial<Testimonial>): Testimonial | null => {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex(testimonial => testimonial.id === id);
  
  if (index === -1) return null;
  
  testimonials[index] = {
    ...testimonials[index],
    ...updates
  };
  
  saveTestimonials(testimonials);
  return testimonials[index];
};

export const addTestimonial = (testimonial: Omit<Testimonial, 'id'>): Testimonial => {
  const testimonials = getTestimonials();
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: Date.now()
  };
  
  testimonials.push(newTestimonial);
  saveTestimonials(testimonials);
  return newTestimonial;
};

export const deleteTestimonial = (id: number): boolean => {
  const testimonials = getTestimonials();
  const filteredTestimonials = testimonials.filter(testimonial => testimonial.id !== id);
  
  if (filteredTestimonials.length === testimonials.length) return false;
  
  saveTestimonials(filteredTestimonials);
  return true;
};

// Tree Packages Storage
export const getTreePackages = (): TreePackage[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('caretheplanet_tree_packages');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Return default tree packages if none stored
  const defaultPackages: TreePackage[] = [
    {
      id: 1,
      name: "Bronze Package",
      description: "Start your environmental journey with our basic tree planting package.",
      treeCount: 5,
      price: 30000,
      currency: "Tsh",
      features: [
        "5 trees planted in your name",
        "Certificate of contribution",
        "Monthly progress updates",
        "Basic impact report"
      ],
      isPopular: false,
      order: 1
    },
    {
      id: 2,
      name: "Silver Package",
      description: "Make a significant impact with our popular tree planting package.",
      treeCount: 20,
      price: 100000,
      currency: "Tsh",
      features: [
        "20 trees planted in your name",
        "Premium certificate of contribution",
        "Weekly progress updates",
        "Detailed impact report",
        "GPS coordinates of planted trees",
        "Photo updates of tree growth"
      ],
      isPopular: true,
      order: 2
    },
    {
      id: 3,
      name: "Gold Package",
      description: "Maximum environmental impact with our premium tree planting package.",
      treeCount: 50,
      price: 300000,
      currency: "Tsh",
      features: [
        "50 trees planted in your name",
        "Luxury certificate of contribution",
        "Real-time progress tracking",
        "Comprehensive impact report",
        "GPS coordinates of planted trees",
        "Regular photo updates",
        "Personal tree planting ceremony invitation",
        "Naming rights for a small grove"
      ],
      isPopular: false,
      order: 3
    }
  ];
  
  localStorage.setItem('caretheplanet_tree_packages', JSON.stringify(defaultPackages));
  return defaultPackages;
};

export const saveTreePackages = (packages: TreePackage[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('caretheplanet_tree_packages', JSON.stringify(packages));
};

export const updateTreePackage = (id: number, updates: Partial<TreePackage>): TreePackage | null => {
  const packages = getTreePackages();
  const index = packages.findIndex(pkg => pkg.id === id);
  
  if (index === -1) return null;
  
  packages[index] = {
    ...packages[index],
    ...updates
  };
  
  saveTreePackages(packages);
  return packages[index];
};

export const addTreePackage = (treePackage: Omit<TreePackage, 'id'>): TreePackage => {
  const packages = getTreePackages();
  const newPackage: TreePackage = {
    ...treePackage,
    id: Date.now()
  };
  
  packages.push(newPackage);
  saveTreePackages(packages);
  return newPackage;
};

export const deleteTreePackage = (id: number): boolean => {
  const packages = getTreePackages();
  const filteredPackages = packages.filter(pkg => pkg.id !== id);
  
  if (filteredPackages.length === packages.length) return false;
  
  saveTreePackages(filteredPackages);
  return true;
}; 

// Default homepage buttons
const defaultButtons: Button[] = [
  // Hero Section
  { id: 'hero-donate', section: 'hero', text: 'Donate Now', url: '/donate', variant: 'primary', order: 1, isActive: true },
  { id: 'hero-learn', section: 'hero', text: 'Learn More', url: '/about', variant: 'secondary', order: 2, isActive: true },
  
  // Join Our Mission Section
  { id: 'mission-plant', section: 'mission', text: 'Start Planting Today', url: '/plant', variant: 'primary', order: 1, isActive: true },
  { id: 'mission-how', section: 'mission', text: 'Learn How It Works', url: '/how-it-works', variant: 'secondary', order: 2, isActive: true },
  
  // About Section
  { id: 'about-read', section: 'about', text: 'Read More About Us', url: '/about', variant: 'secondary', order: 1, isActive: true },
  
  // Projects Section
  { id: 'project-trees', section: 'projects', text: 'Learn More →', url: '/projects/tree-planting', variant: 'secondary', order: 1, isActive: true },
  { id: 'project-energy', section: 'projects', text: 'Learn More →', url: '/projects/renewable-energy', variant: 'secondary', order: 2, isActive: true },
  { id: 'project-ocean', section: 'projects', text: 'Learn More →', url: '/projects/ocean-conservation', variant: 'secondary', order: 3, isActive: true },
  
  // CTA Section
  { id: 'cta-donate', section: 'cta', text: 'Donate Today', url: '/donate', variant: 'secondary', order: 1, isActive: true },
  { id: 'cta-volunteer', section: 'cta', text: 'Volunteer With Us', url: '/volunteer', variant: 'secondary', order: 2, isActive: true },
  
  // Newsletter Section
  { id: 'newsletter-subscribe', section: 'newsletter', text: 'Subscribe to Newsletter', url: '#', variant: 'secondary', order: 1, isActive: true }
];

// Button management functions
export const getButtons = (): Button[] => {
  if (typeof window === 'undefined') return defaultButtons;
  
  const stored = localStorage.getItem('homepage-buttons');
  if (!stored) {
    localStorage.setItem('homepage-buttons', JSON.stringify(defaultButtons));
    return defaultButtons;
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return defaultButtons;
  }
};

export const saveButtons = (buttons: Button[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('homepage-buttons', JSON.stringify(buttons));
};

export const getButtonsBySection = (section: string): Button[] => {
  const buttons = getButtons();
  return buttons
    .filter(button => button.section === section && button.isActive)
    .sort((a, b) => a.order - b.order);
};

export const updateButton = (id: string, updates: Partial<Button>): void => {
  const buttons = getButtons();
  const index = buttons.findIndex(button => button.id === id);
  
  if (index !== -1) {
    buttons[index] = { ...buttons[index], ...updates };
    saveButtons(buttons);
  }
};

export const addButton = (button: Omit<Button, 'id'>): void => {
  const buttons = getButtons();
  const newId = `${button.section}-${Date.now()}`;
  const newButton: Button = { ...button, id: newId };
  
  buttons.push(newButton);
  saveButtons(buttons);
};

export const deleteButton = (id: string): void => {
  const buttons = getButtons();
  const filteredButtons = buttons.filter(button => button.id !== id);
  saveButtons(filteredButtons);
};

export const getButtonSections = (): string[] => {
  return ['hero', 'mission', 'about', 'projects', 'cta', 'newsletter'];
}; 

// Newsletter subscriber management functions
export const getNewsletterSubscribers = (): NewsletterSubscriber[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('newsletter-subscribers');
  if (!stored) {
    return [];
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const saveNewsletterSubscribers = (subscribers: NewsletterSubscriber[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('newsletter-subscribers', JSON.stringify(subscribers));
};

export const addNewsletterSubscriber = (email: string, source: string = 'homepage'): boolean => {
  const subscribers = getNewsletterSubscribers();
  
  // Check if email already exists
  const existingSubscriber = subscribers.find(sub => sub.email.toLowerCase() === email.toLowerCase());
  if (existingSubscriber) {
    // Reactivate if previously unsubscribed
    if (!existingSubscriber.isActive) {
      existingSubscriber.isActive = true;
      existingSubscriber.subscribedAt = new Date().toISOString();
      saveNewsletterSubscribers(subscribers);
      return true;
    }
    return false; // Already subscribed
  }
  
  // Add new subscriber
  const newSubscriber: NewsletterSubscriber = {
    id: Date.now().toString(),
    email: email.toLowerCase(),
    subscribedAt: new Date().toISOString(),
    isActive: true,
    source
  };
  
  subscribers.push(newSubscriber);
  saveNewsletterSubscribers(subscribers);
  return true;
};

export const removeNewsletterSubscriber = (id: string): void => {
  const subscribers = getNewsletterSubscribers();
  const filteredSubscribers = subscribers.filter(sub => sub.id !== id);
  saveNewsletterSubscribers(filteredSubscribers);
};

export const unsubscribeNewsletterSubscriber = (email: string): boolean => {
  const subscribers = getNewsletterSubscribers();
  const subscriber = subscribers.find(sub => sub.email.toLowerCase() === email.toLowerCase());
  
  if (subscriber) {
    subscriber.isActive = false;
    saveNewsletterSubscribers(subscribers);
    return true;
  }
  
  return false;
};

export const getActiveNewsletterSubscribers = (): NewsletterSubscriber[] => {
  return getNewsletterSubscribers().filter(sub => sub.isActive);
};

export const getNewsletterSubscriberCount = (): number => {
  return getActiveNewsletterSubscribers().length;
};

// Contact message management functions
export const getContactMessages = (): ContactMessage[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('contactMessages');
  if (!stored) {
    return [];
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const saveContactMessages = (messages: ContactMessage[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('contactMessages', JSON.stringify(messages));
};

export const addContactMessage = (message: Omit<ContactMessage, 'id' | 'submittedAt' | 'status'>): boolean => {
  const messages = getContactMessages();
  
  const newMessage: ContactMessage = {
    ...message,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: 'new'
  };
  
  messages.push(newMessage);
  saveContactMessages(messages);
  return true;
};

export const updateContactMessageStatus = (id: string, status: 'new' | 'read' | 'replied'): boolean => {
  const messages = getContactMessages();
  const messageIndex = messages.findIndex(msg => msg.id === id);
  
  if (messageIndex !== -1) {
    messages[messageIndex].status = status;
    saveContactMessages(messages);
    return true;
  }
  
  return false;
};

export const deleteContactMessage = (id: string): void => {
  const messages = getContactMessages();
  const filteredMessages = messages.filter(msg => msg.id !== id);
  saveContactMessages(filteredMessages);
};

export const getNewContactMessages = (): ContactMessage[] => {
  return getContactMessages().filter(msg => msg.status === 'new');
};

export const getContactMessageCount = (): number => {
  return getContactMessages().length;
};

export const getNewContactMessageCount = (): number => {
  return getNewContactMessages().length;
};

// Team member management functions
export const getTeamMembers = (): TeamMember[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('team-members');
  if (!stored) {
    // Return default team members if none stored
    const defaultMembers: TeamMember[] = [
      {
        id: '1',
        name: 'Dr. Sarah Green',
        position: 'Executive Director',
        bio: 'Environmental scientist with 15+ years of experience in conservation and sustainability.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        email: 'sarah.green@caretheplanet.org',
        linkedin: 'https://linkedin.com/in/sarah-green',
        twitter: 'https://twitter.com/sarahgreen',
        order: 1,
        isActive: true
      },
      {
        id: '2',
        name: 'Dr. Michael Chen',
        position: 'Head of Research',
        bio: 'Climate scientist leading our research initiatives and data-driven conservation strategies.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        email: 'michael.chen@caretheplanet.org',
        linkedin: 'https://linkedin.com/in/michael-chen',
        twitter: 'https://twitter.com/michaelchen',
        order: 2,
        isActive: true
      },
      {
        id: '3',
        name: 'Maria Rodriguez',
        position: 'Field Operations',
        bio: 'Conservation specialist managing our on-the-ground projects and community partnerships.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        email: 'maria.rodriguez@caretheplanet.org',
        linkedin: 'https://linkedin.com/in/maria-rodriguez',
        twitter: 'https://twitter.com/mariarodriguez',
        order: 3,
        isActive: true
      }
    ];
    saveTeamMembers(defaultMembers);
    return defaultMembers;
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const saveTeamMembers = (members: TeamMember[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('team-members', JSON.stringify(members));
};

export const addTeamMember = (member: Omit<TeamMember, 'id'>): void => {
  const members = getTeamMembers();
  const newId = Date.now().toString();
  const newMember: TeamMember = { ...member, id: newId };
  
  members.push(newMember);
  saveTeamMembers(members);
  
  // Dispatch custom event for admin panel updates
  window.dispatchEvent(new CustomEvent('localStorageChange'));
};

export const updateTeamMember = (id: string, updates: Partial<TeamMember>): boolean => {
  const members = getTeamMembers();
  const memberIndex = members.findIndex(member => member.id === id);
  
  if (memberIndex !== -1) {
    members[memberIndex] = { ...members[memberIndex], ...updates };
    saveTeamMembers(members);
    
    // Dispatch custom event for admin panel updates
    window.dispatchEvent(new CustomEvent('localStorageChange'));
    return true;
  }
  
  return false;
};

export const deleteTeamMember = (id: string): void => {
  const members = getTeamMembers();
  const filteredMembers = members.filter(member => member.id !== id);
  saveTeamMembers(filteredMembers);
  
  // Dispatch custom event for admin panel updates
  window.dispatchEvent(new CustomEvent('localStorageChange'));
};

export const getActiveTeamMembers = (): TeamMember[] => {
  return getTeamMembers().filter(member => member.isActive).sort((a, b) => a.order - b.order);
};

export const getTeamMemberCount = (): number => {
  return getTeamMembers().length;
};

export const getActiveTeamMemberCount = (): number => {
  return getActiveTeamMembers().length;
}; 