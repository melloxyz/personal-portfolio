import React from 'react';
import Section from './Section';
import GithubStats from './GithubStats';
import { PERSONAL_INFO, SKILLS } from '../constants';
import { useGithubContext } from '../App';

interface AboutProps {
  onSkillSelect: (skill: string) => void;
}

const About: React.FC<AboutProps> = ({ onSkillSelect }) => {
  const { repos, isLoadingRepos, isReposStale } = useGithubContext();

  return (
    <Section id="about">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-2">
           <h2 className="text-3xl md:text-4xl font-bold mb-4">Sobre Mim</h2>
           <p className="text-lg text-light-subtext dark:text-dark-subtext leading-relaxed">
            {PERSONAL_INFO.extendedBio}
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Principais Habilidades</h3>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map(skill => (
              <button
                key={skill}
                onClick={() => onSkillSelect(skill)}
                className="px-3 py-1 bg-light-accent/10 dark:bg-dark-accent/20 text-light-accent dark:text-dark-accent text-sm font-medium rounded-full cursor-pointer hover:bg-light-accent/20 dark:hover:bg-dark-accent/30 transition-colors duration-200"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-20 border-t border-light-border dark:border-dark-border pt-16">
        <GithubStats repos={repos} isLoading={isLoadingRepos} isDataStale={isReposStale} />
      </div>
    </Section>
  );
};

export default About;