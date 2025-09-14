import React from 'react';
import ThemeToggle from './ThemeToggle';
import { NavSection } from '../types';
import { PERSONAL_INFO } from '../constants';

interface HeaderProps {
  activeSection: NavSection;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

const NavLink: React.FC<{
  section: NavSection;
  label: string;
  activeSection: NavSection;
}> = ({ section, label, activeSection }) => (
  // SEO: Usar tag <a> para links rastreáveis
  <a
    href={`#${section}`}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      activeSection === section
        ? 'text-light-accent dark:text-dark-accent'
        : 'text-light-subtext dark:text-dark-subtext hover:text-light-text dark:hover:text-dark-text'
    }`}
  >
    {label}
  </a>
);


const Header: React.FC<HeaderProps> = ({ activeSection, isDarkMode, setIsDarkMode }) => {
  const navItems: { section: NavSection; label: string }[] = [
    { section: 'home', label: 'Início' },
    { section: 'projects', label: 'Projetos' },
    { section: 'about', label: 'Sobre' },
    { section: 'certifications', label: 'Formação' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-lg border-b border-light-border dark:border-dark-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-light-text dark:text-dark-text tracking-tight">{PERSONAL_INFO.name.split(' ')[0]}</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map(item => (
                <NavLink 
                  key={item.section}
                  section={item.section}
                  label={item.label}
                  activeSection={activeSection}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center">
             <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>
        </div>
        <div className="md:hidden flex items-center justify-center py-2 space-x-2 overflow-x-auto">
           {navItems.map(item => (
                <NavLink 
                  key={item.section}
                  section={item.section}
                  label={item.label}
                  activeSection={activeSection}
                />
              ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
