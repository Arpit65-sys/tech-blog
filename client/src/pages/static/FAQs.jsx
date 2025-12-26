import { useState } from "react";

const faqs = [
  {
    question: "What is TechQeeda?",
    answer:
      "TechQeeda is a knowledge-sharing platform where users can explore tech insights, create posts, and connect with the tech community.",
  },
  {
    question: "How do I create a post?",
    answer:
      "Once logged in, go to the Dashboard and click on 'Create Post' to write and publish your content.",
  },
  {
    question: "Is TechQeeda free to use?",
    answer:
      "Yes! TechQeeda is free for all users. Additional premium features may come in the future.",
  },
  {
    question: "Can I edit or delete my posts?",
    answer:
      "Yes, you can manage your posts anytime through the dashboard.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach us at techqeedasupport@gmail.com or via the Contact page.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 text-center">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 shadow border cursor-pointer transition hover:shadow-lg"
            onClick={() => toggle(index)}
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold md:text-lg text-gray-800">
                {faq.question}
              </h2>
              <span className="text-xl text-gray-700">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>
            {openIndex === index && (
              <p className="mt-3 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
