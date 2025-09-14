import React from 'react';
import { GithubRepo } from '../types';

interface ProjectCardProps {
  repo: GithubRepo;
  onCardClick: (repo: GithubRepo) => void;
  index: number;
}

export const languageColorMapping: { [key: string]: string } = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-500',
  Go: 'bg-cyan-500',
  Python: 'bg-green-500',
  HTML: 'bg-orange-500',
  CSS: 'bg-indigo-500',
  // Adicionar mais linguagens conforme necessário
};

const ProjectCard: React.FC<ProjectCardProps> = ({ repo, onCardClick, index }) => {
  const langColor = repo.language ? languageColorMapping[repo.language] || 'bg-gray-500' : 'bg-gray-500';

  return (
    <>
      <button
        onClick={() => onCardClick(repo)}
        className="block w-full text-left bg-light-card dark:bg-dark-card rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-card-enter h-60"
        style={{ animationDelay: `${index * 80}ms` }}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-3 gap-2">
            <h3 className="text-lg lg:text-xl font-bold text-light-text dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors duration-300 break-words line-clamp-2 min-w-0 flex-grow">
              {repo.name}
            </h3>
            <a
               href={repo.html_url}
               target="_blank"
               rel="noopener noreferrer"
               onClick={(e) => e.stopPropagation()}
               aria-label="Ver no GitHub"
               className="p-1 text-light-subtext dark:text-dark-subtext group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors flex-shrink-0"
             >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
          <p className="text-light-subtext dark:text-dark-subtext text-sm mb-4 min-h-[40px] line-clamp-2">
            {repo.description || 'Clique para ver o README.'}
          </p>

          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {repo.topics.slice(0, 4).map(topic => (
                <span key={topic} className="px-2 py-0.5 bg-light-accent/10 dark:bg-dark-accent/20 text-light-accent dark:text-dark-accent text-xs font-medium rounded-full">
                  {topic}
                </span>
              ))}
            </div>
          )}

          <div className="flex-grow" />

          <div className="mt-auto pt-4 border-t border-light-border/70 dark:border-dark-border/70 text-sm text-light-subtext dark:text-dark-subtext">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {repo.language && (
                  <>
                    <span className={`w-3 h-3 rounded-full mr-2 ${langColor}`}></span>
                    <span>{repo.language}</span>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-4">
                {typeof repo.commit_count === 'number' && (
                  <div className="flex items-center" title={`${repo.commit_count} commits`}>
                    <GitCommit className="w-4 h-4 mr-1.5" />
                    <span>{repo.commit_count}</span>
                  </div>
                )}
                <div className="flex items-center" title={`${repo.stargazers_count} estrelas`}>
                  <Star className="w-4 h-4 mr-1.5" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center" title={`${repo.forks_count} forks`}>
                  <GitFork className="w-4 h-4 mr-1.5" />
                  <span>{repo.forks_count}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        @keyframes card-enter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-card-enter {
          opacity: 0;
          animation: card-enter 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
};

// Ícones
const Star: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);
const GitFork: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><circle cx="18" cy="6" r="3"></circle><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"></path><path d="M12 12v3"></path></svg>
);
const ExternalLink: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);
const GitCommit: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="9" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="15"></line></svg>
);

export default ProjectCard;