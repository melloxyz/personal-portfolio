
import React from 'react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-light-card/80 dark:bg-dark-card/80 border-t border-light-border dark:border-dark-border mt-10">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-light-subtext dark:text-dark-subtext">
        <p>&copy; {currentYear} {PERSONAL_INFO.name}. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
