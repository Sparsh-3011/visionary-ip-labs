import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const FAQSection = () => {
  const faqs = [
    {
      question: 'What is this internship program about?',
      answer: 'The Patent & Research Internship Program is a comprehensive training initiative by Visionary IP Labs that teaches students about patent filing, research paper writing, innovation development, and startup mentorship. You\'ll work on real-world IP projects and learn from industry experts.'
    },
    {
      question: 'Is this internship paid or free?',
      answer: 'The internship program is primarily skill-focused and offers valuable learning opportunities. Top performers receive cash rewards, and all participants get an official certificate. The focus is on gaining practical experience in patent research and innovation.'
    },
    {
      question: 'Will I receive a certificate upon completion?',
      answer: 'Yes! All participants who successfully complete the internship program will receive an official internship completion certificate from Visionary IP Labs. This certificate is industry-recognized and can be added to your resume and LinkedIn profile.'
    },
    {
      question: 'How will participants be selected?',
      answer: 'Selection is based on your academic background, area of interest, motivation, and alignment with the program objectives. We look for passionate individuals eager to learn about innovation, patents, and research. Applications are reviewed on a rolling basis.'
    },
    {
      question: 'What is the duration of the internship?',
      answer: 'The internship program typically runs for 6-8 weeks, with flexible scheduling to accommodate your academic commitments. The exact duration and timeline will be communicated upon selection.'
    },
    {
      question: 'Do I need prior knowledge of patents to apply?',
      answer: 'No prior knowledge of patents is required! The program is designed for learners at all levels. We provide comprehensive training from basics to advanced topics in patent research, IP protection, and innovation development.'
    },
    {
      question: 'Can I work on this remotely?',
      answer: 'Yes, the internship offers flexible remote participation options. Most activities, mentorship sessions, and project work can be completed online, making it accessible to students from anywhere.'
    },
    {
      question: 'What kind of projects will I work on?',
      answer: 'You\'ll work on real-world innovation and patent projects including prior art searches, patent drafting, novelty analysis, research paper writing, and potentially contribute to actual patent applications as a co-inventor.'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Questions</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Everything you need to know about the internship program
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-slate-700/50 last:border-0"
              >
                <AccordionTrigger className="text-left text-white hover:text-amber-400 transition-colors duration-200 py-4">
                  <span className="font-semibold text-lg pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-center bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-8">
          <p className="text-slate-300 text-lg mb-4">
            Still have questions?
          </p>
          <a 
            href="#contact" 
            className="inline-block text-amber-400 hover:text-amber-300 font-semibold transition-colors duration-200"
          >
            Contact us for more information →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
