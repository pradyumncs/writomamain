import { FaSearch, FaBook, FaVideo, FaFileAlt, FaDownload, FaQuestionCircle, FaLightbulb, FaTools, FaShieldAlt, FaRocket, FaUsers, FaCog } from 'react-icons/fa';
import Link from 'next/link';

export default function HelpCenterPage() {
  const categories = [
    {
      icon: FaRocket,
      title: "Getting Started",
      description: "Learn the basics and set up your account",
      articles: [
        {
          title: "How to Create Your First Account",
          description: "Step-by-step guide to setting up your Writoma account",
          readTime: "3 min read",
          difficulty: "Beginner"
        },
        {
          title: "Understanding AI Detection Basics",
          description: "Learn how our AI detection technology works",
          readTime: "5 min read",
          difficulty: "Beginner"
        },
        {
          title: "Your First AI Detection Scan",
          description: "Complete your first content analysis with Writoma",
          readTime: "4 min read",
          difficulty: "Beginner"
        }
      ]
    },
    {
      icon: FaTools,
      title: "Using Writoma",
      description: "Master the tools and features",
      articles: [
        {
          title: "Text Upload and Analysis",
          description: "How to upload and analyze your content effectively",
          readTime: "4 min read",
          difficulty: "Intermediate"
        },
        {
          title: "Understanding Detection Results",
          description: "Learn to interpret AI detection scores and reports",
          readTime: "6 min read",
          difficulty: "Intermediate"
        },
        {
          title: "Bulk Processing with API",
          description: "Use our API for large-scale content analysis",
          readTime: "8 min read",
          difficulty: "Advanced"
        },
        {
          title: "Exporting and Sharing Reports",
          description: "Save and share your detection results",
          readTime: "3 min read",
          difficulty: "Intermediate"
        }
      ]
    },
    {
      icon: FaShieldAlt,
      title: "Best Practices",
      description: "Tips for optimal results",
      articles: [
        {
          title: "Preparing Content for Analysis",
          description: "Best practices for content preparation",
          readTime: "4 min read",
          difficulty: "Intermediate"
        },
        {
          title: "Interpreting False Positives",
          description: "Understanding and handling detection errors",
          readTime: "5 min read",
          difficulty: "Intermediate"
        },
        {
          title: "Maintaining Detection Accuracy",
          description: "Tips for consistent and reliable results",
          readTime: "6 min read",
          difficulty: "Advanced"
        }
      ]
    },
    {
      icon: FaUsers,
      title: "Use Cases",
      description: "Real-world applications and examples",
      articles: [
        {
          title: "Academic Integrity for Educators",
          description: "Using Writoma in educational institutions",
          readTime: "7 min read",
          difficulty: "Intermediate"
        },
        {
          title: "Content Marketing Verification",
          description: "Ensuring authenticity in marketing content",
          readTime: "5 min read",
          difficulty: "Intermediate"
        },
        {
          title: "Legal Document Analysis",
          description: "AI detection in legal and compliance contexts",
          readTime: "6 min read",
          difficulty: "Advanced"
        },
        {
          title: "Research Paper Validation",
          description: "Verifying academic research authenticity",
          readTime: "5 min read",
          difficulty: "Intermediate"
        }
      ]
    },
    {
      icon: FaCog,
      title: "Account & Settings",
      description: "Manage your account and preferences",
      articles: [
        {
          title: "Managing Your Subscription",
          description: "Upgrade, downgrade, and manage billing",
          readTime: "4 min read",
          difficulty: "Beginner"
        },
        {
          title: "API Key Management",
          description: "Generate and manage API keys for integration",
          readTime: "6 min read",
          difficulty: "Advanced"
        },
        {
          title: "Privacy and Data Settings",
          description: "Control your data and privacy preferences",
          readTime: "3 min read",
          difficulty: "Beginner"
        }
      ]
    }
  ];

  const popularArticles = [
    {
      title: "How to Detect AI-Generated Content",
      category: "Getting Started",
      readTime: "5 min read",
      views: "2.3k"
    },
    {
      title: "Understanding Detection Accuracy",
      category: "Using Writoma",
      readTime: "6 min read",
      views: "1.8k"
    },
    {
      title: "API Integration Guide",
      category: "Account & Settings",
      readTime: "8 min read",
      views: "1.5k"
    },
    {
      title: "Academic Use Case Examples",
      category: "Use Cases",
      readTime: "7 min read",
      views: "1.2k"
    }
  ];

  const resources = [
    {
      icon: FaDownload,
      title: "User Manual PDF",
      description: "Complete user guide in PDF format",
      downloadUrl: "#"
    },
    {
      icon: FaVideo,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      downloadUrl: "#"
    },
    {
      icon: FaFileAlt,
      title: "API Documentation",
      description: "Technical API reference and examples",
      downloadUrl: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Help Center
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Find answers, tutorials, and resources to help you get the most out of Writoma
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles, tutorials, or guides..."
                  className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

     
      {/* Contact Support */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-blue-50 rounded-lg p-8">
            <FaLightbulb className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Our support team is here to help. Contact us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/support"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <FaQuestionCircle className="w-5 h-5 mr-2" />
                Contact Support
              </Link>
              <Link 
                href="mailto:pradyumntp@gmail.com"
                className="inline-flex items-center justify-center bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                <FaQuestionCircle className="w-5 h-5 mr-2" />
                Send Email
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
