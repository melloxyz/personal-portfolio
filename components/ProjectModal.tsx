import React from 'react';
import { GithubRepo } from '../types';

declare var marked: any;

interface ProjectModalProps {
  repo: GithubRepo;
  onClose: () => void;
  readmeContent: string | null;
  isLoadingReadme: boolean;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ repo, onClose, readmeContent, isLoadingReadme }) => {
  const parsedReadme = readmeContent ? marked.parse(readmeContent) : '';

  return (
    <div 
      className="fixed inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-fast"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-light-card dark:bg-dark-card rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-6 border-b border-light-border dark:border-dark-border flex justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">{repo.name}</h2>
            <p className="text-light-subtext dark:text-dark-subtext mt-1 text-sm">{repo.description || ''}</p>
          </div>
          <button onClick={onClose} aria-label="Fechar modal" className="p-2 -mr-2 -mt-2 rounded-full hover:bg-light-bg dark:hover:bg-dark-bg text-light-subtext dark:text-dark-subtext transition-colors">
            <X className="w-6 h-6" />
          </button>
        </header>

        <main className="p-6 overflow-y-auto">
          {isLoadingReadme ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="w-8 h-8 animate-spin text-light-accent dark:text-dark-accent" />
            </div>
          ) : (
            readmeContent ? (
              <div 
                className="prose"
                dangerouslySetInnerHTML={{ __html: parsedReadme }} 
              />
            ) : (
               <p className="text-light-subtext dark:text-dark-subtext">Não foi possível carregar o README.</p>
            )
          )}
        </main>

        <footer className="p-6 border-t border-light-border dark:border-dark-border flex flex-wrap gap-x-6 gap-y-2 justify-between items-center text-sm text-light-subtext dark:text-dark-subtext">
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
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-light-accent dark:text-dark-accent hover:underline font-medium">
            Ver no GitHub <ExternalLink className="w-4 h-4 ml-1.5" />
          </a>
        </footer>
      </div>
       <style>{`
        @keyframes fade-in-fast {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-fast {
          animation: fade-in-fast 0.2s ease-out forwards;
        }
        
        /* Estilos prose para markdown renderizado */
        .prose {
          color: #1d1d1f;
          line-height: 1.65;
        }
        .dark .prose {
          color: #f5f5f7;
        }
        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
          font-weight: 700;
          margin-bottom: 0.8em;
          margin-top: 1.5em;
        }
        .prose h1 { font-size: 2em; }
        .prose h2 { font-size: 1.5em; padding-bottom: 0.3em; border-bottom: 1px solid #e5e5e5; }
        .dark .prose h2 { border-bottom-color: #333333; }
        .prose h3 { font-size: 1.25em; }
        .prose p { margin-bottom: 1em; }
        .prose a { color: #0071e3; text-decoration: none; }
        .prose a:hover { text-decoration: underline; }
        .dark .prose a { color: #0a84ff; }
        .prose ul, .prose ol { margin-bottom: 1em; padding-left: 1.5em; }
        .prose li > p { margin-bottom: 0.5em; }
        .prose pre {
          background-color: #f7f7f7;
          border-radius: 8px;
          padding: 1em;
          overflow-x: auto;
          margin-bottom: 1em;
          font-family: monospace;
        }
        .dark .prose pre { background-color: #121212; }
        .prose code { font-family: monospace; }
        .prose :not(pre) > code {
          background-color: rgba(0, 113, 227, 0.1);
          color: #0071e3;
          padding: 0.2em 0.4em;
          font-size: 0.9em;
          border-radius: 4px;
        }
        .dark .prose :not(pre) > code {
          background-color: rgba(10, 132, 255, 0.2);
          color: #0a84ff;
        }
        .prose blockquote {
          border-left: 4px solid #e5e5e5;
          padding-left: 1em;
          margin-left: 0;
          font-style: italic;
          color: #6e6e73;
        }
        .dark .prose blockquote {
          border-left-color: #333333;
          color: #a1a1a6;
        }
        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .prose table { width: 100%; border-collapse: collapse; margin-bottom: 1em; }
        .prose th, .prose td { border: 1px solid #e5e5e5; padding: 0.5em 0.8em; }
        .dark .prose th, .dark .prose td { border-color: #333333; }
        .prose th { font-weight: 600; background-color: #f7f7f7; }
        .dark .prose th { background-color: #121212; }
      `}</style>
    </div>
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
const X: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const Loader: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
);
const GitCommit: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="9" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="15"></line></svg>
);

export default ProjectModal;