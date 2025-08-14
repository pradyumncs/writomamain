import React from 'react';

const testimonials = [
  {
    quote: "Writoma helped me humanize AI text from ChatGPT in seconds. It made my writing sound real and passed Turnitin easily. This tool saved my grade.",
    author: "Julia K.",
    role: "Student",
  },
  {
    quote: "I've tried several tools to bypass AI detectors, but nothing compares to Writoma. It's fast, accurate, and the free humanize AI text feature is a lifesaver.",
    author: "Liam R.",
    role: "Content Writer",
  },
  {
    quote: "The best thing about Writoma? I can humanize my text and rewrite AI drafts without losing quality. It feels like a real editor polished it.",
    author: "Sophie M.",
    role: "Freelancer",
  },
];

const QuoteIcon = () => (
    <svg width="45" height="34" viewBox="0 0 45 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-700">
        <path d="M14.4263 34H0.692308L11.7583 0H19.2308L14.4263 34Z" fill="currentColor"/>
        <path d="M39.6923 34H25.9583L37.0243 0H44.5L39.6923 34Z" fill="currentColor"/>
    </svg>
);


const UserSay = () => {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What our users say
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <figure key={index} className="bg-white rounded-xl shadow-md p-6 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
              <div className="mb-4">
                <QuoteIcon />
              </div>
              <blockquote className="mt-4">
                <p className="text-base text-gray-600">
                  “{testimonial.quote}”
                </p>
              </blockquote>
              <figcaption className="mt-6">
                <div className="text-base font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserSay;

