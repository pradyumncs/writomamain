import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaQuestionCircle, FaHeadset, FaBook, FaDiscord, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

export default function SupportPage() {
  const faqs = [
    {
      question: "How does Writoma detect AI-generated content?",
      answer: "Writoma uses advanced machine learning algorithms and natural language processing techniques to analyze text patterns, sentence structures, and linguistic markers that are commonly associated with AI-generated content. Our system has been trained on millions of text samples to provide accurate detection."
    },
    {
      question: "What is the accuracy rate of your AI detection?",
      answer: "Our AI detection system achieves over 95% accuracy across various content types and writing styles. We continuously improve our algorithms to maintain high accuracy rates as AI writing tools evolve."
    },
    {
      question: "Can I use Writoma for academic purposes?",
      answer: "Yes! Writoma is widely used by educators, researchers, and students to ensure academic integrity. Our tools help identify AI-generated content in essays, research papers, and other academic submissions."
    },
    {
      question: "How do I get started with Writoma?",
      answer: "Getting started is easy! Simply sign up for an account, choose your plan, and start using our AI detection tools. You can upload text directly or use our API for bulk processing."
    },
    {
      question: "What file formats does Writoma support?",
      answer: "Writoma supports multiple file formats including TXT, DOC, DOCX, PDF, and plain text. You can also copy and paste text directly into our web interface."
    },
    {
      question: "Is my content secure when using Writoma?",
      answer: "Absolutely. We take data security seriously. All content processed through Writoma is encrypted, and we never store or share your text content. Your privacy and data security are our top priorities."
    }
  ];

  const supportChannels = [
    {
      icon: FaEnvelope,
      title: "Email Support",
      description: "Get detailed responses within 24 hours",
      contact: "pradyumntp@gmail.com",
      action: "Send Email",
      href: "mailto:pradyumntp@gmail.com"
    },
    {
      icon: FaHeadset,
      title: "Live Chat",
      description: "Available during business hours",
      contact: "Mon-Fri, 9 AM - 6 PM IST",
      action: "Start Chat",
      href: "#"
    },
    {
      icon: FaBook,
      title: "Help Center",
      description: "Comprehensive guides and tutorials",
      contact: "Self-service resources",
      action: "Browse Articles",
      href: "/helpcenter"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Need Help? We're Here for You
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Get support for Writoma's AI detection tools. Our team is ready to help you succeed.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our AI detection services? Reach out to our support team.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {supportChannels.map((channel, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <channel.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{channel.title}</h3>
              <p className="text-gray-600 mb-4">{channel.description}</p>
              <p className="text-blue-600 font-medium mb-4">{channel.contact}</p>
              <Link 
                href={channel.href}
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {channel.action}
              </Link>
            </div>
          ))}
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <FaMapMarkerAlt className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
              <p className="text-gray-600">Mangalore, India</p>
            </div>
            <div className="flex flex-col items-center">
              <FaEnvelope className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
              <p className="text-gray-600">pradyumntp@gmail.com</p>
            </div>
            <div className="flex flex-col items-center">
              <FaQuestionCircle className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Business Hours</h4>
              <p className="text-gray-600">Mon-Fri, 9 AM - 6 PM IST</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find quick answers to common questions about Writoma
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Support */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Still Need Help?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is ready to assist you.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Contact Our Support Team
              </h3>
              <p className="text-gray-600 mb-6">
                Send us a detailed message and we'll get back to you as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="mailto:pradyumntp@gmail.com"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <FaEnvelope className="w-5 h-5 mr-2" />
                  Send Email
                </Link>
                <Link 
                  href="/helpcenter"
                  className="inline-flex items-center justify-center bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  <FaBook className="w-5 h-5 mr-2" />
                  Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
