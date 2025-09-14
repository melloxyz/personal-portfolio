
import React from 'react';

interface SectionProps {
  id: string;
  children: React.ReactNode;
}

// Componente Section com animação de fade-in
const Section: React.FC<SectionProps> = ({ id, children }) => {
  return (
    <section id={id} className="w-full py-16 md:py-24 animate-fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Section;
