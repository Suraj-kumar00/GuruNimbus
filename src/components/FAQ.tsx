'use client';

import { useState } from 'react';

export function FAQ() {
  const [expanded, setExpanded] = useState(Array(10).fill(false));

  const handleToggle = (index: number) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const faqs = [
    {
      question: "What is 'Rate My Workplace'?",
      answer:
        '"Rate My Workplace" is a platform where employees can anonymously share their experiences and rate their workplaces. The goal is to provide insights and transparency about various companies\' work environments.',
    },
    {
      question: 'Can I submit my own review on "Rate My Workplace"?',
      answer:
        `"Rate My Workplace" does not accept user-submitted reviews. Instead, the platform uses AI to provide feedback based on a curated list of reviews already in our database.`,
    },
    {
      question: 'Can I remain anonymous when submitting a review?',
      answer:
        'Yes, all reviews are submitted anonymously to protect your privacy. We do not collect personal information that could identify you.',
    },
    {
      question: 'How do you ensure the authenticity of reviews?',
      answer:
        'We use a combination of automated and manual moderation processes to review and verify submissions. This helps ensure that the feedback we publish is authentic and valuable.',
    },
    {
      question: 'How can I contact support if I have an issue?',
      answer:
        'If you have any issues or questions, please use the "Contact Us" section on the site. Fill out the contact form, and our support team will get back to you as soon as possible.',
    },
    {
      question: 'Can I edit or delete my review after submission?',
      answer:
        'Once a review is submitted, it cannot be edited or deleted by the user. If you need to make changes, please contact our support team with the details of your request.',
    },
    {
      question: 'How is the data used by the chatbot?',
      answer:
        'The chatbot uses semantic search embeddings to provide relevant responses based on the data stored in our database. It helps users find information quickly and accurately by understanding the context of their queries.',
    },
    {
      question: 'What is Pinecone, and how is it used here?',
      answer:
        'Pinecone is a vector database used for semantic search. We use Pinecone to manage and search the embeddings of our data, allowing the chatbot to retrieve and provide precise answers based on user queries.',
    },
    {
      question: 'Can I rate multiple workplaces?',
      answer:
        'Yes, you can rate multiple workplaces. Each review is considered individually and contributes to the overall rating of the respective workplace.',
    },
    {
      question: 'How can I provide feedback about the website?',
      answer:
        'If you have feedback about the website, please use the "Contact Us" section to share your thoughts. We welcome suggestions and comments to help improve our platform.',
    },
  ];

  return (
    <div className="bg-slate-600 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    expanded[index] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {expanded[index] && (
                <div className="mt-4 text-gray-400">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
