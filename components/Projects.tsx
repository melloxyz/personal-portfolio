import React, { useState, useEffect, useCallback } from 'react';
import Section from './Section';
import { FEATURED_PROJECTS } from '../constants';
import { useGithubContext } from '../App';
import { GithubRepo } from '../types';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

// Ícone para o botão limpar
const X: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

interface ProjectsProps {
  initialFilter: string | null;
  onFilterApplied: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ initialFilter, onFilterApplied }) => {
  const { repos, isLoadingRepos, isReposStale, getRepoReadme } = useGithubContext();
  
  const [allRepos, setAllRepos] = useState<GithubRepo[]>([]);
  const [featuredRepos, setFeaturedRepos] = useState<GithubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GithubRepo[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);

  // Processar repos quando carregados do contexto
  useEffect(() => {
    if (repos) {
      const featured = repos.filter(repo => FEATURED_PROJECTS.includes(repo.name));
      const others = repos.filter(repo => !FEATURED_PROJECTS.includes(repo.name));
      
      setFeaturedRepos(featured);
      setAllRepos(others);

      const langSet = new Set<string>();
      others.forEach(repo => { // Usar apenas linguagens de repos não destacados para filtros
        if (repo.language) langSet.add(repo.language);
      });
      setLanguages([...Array.from(langSet)]);
    }
  }, [repos]);

  useEffect(() => {
      if (initialFilter && languages.length > 0) { 
          const knownLang = languages.find(l => l.toLowerCase() === initialFilter.toLowerCase());
          if (knownLang) {
              setSelectedLangs([knownLang]);
          } else {
              setSelectedLangs([initialFilter]);
          }
          onFilterApplied();
      }
  }, [initialFilter, onFilterApplied, languages]);

  useEffect(() => {
    if (selectedLangs.length === 0) {
      setFilteredRepos(allRepos);
    } else {
      setFilteredRepos(
        allRepos.filter(repo => {
          return selectedLangs.some(selectedLang => {
            const term = selectedLang.toLowerCase();
            
            // Verificar linguagem do repositório
            if (repo.language && repo.language.toLowerCase() === term) return true;
            
            // Criar uma lista pesquisável de strings dos dados do repositório
            const searchCorpus = [
              ...repo.topics.map(t => t.toLowerCase()),
              repo.name.toLowerCase()
            ];

            // Normalizar termo para melhor correspondência (ex: 'Node.js' -> 'nodejs')
            const normalizedTerm = term.replace(/\.| & /g, '');
            
            // Verificar se algum tópico ou nome do repositório inclui o termo normalizado
            return searchCorpus.some(item => item.includes(normalizedTerm));
          });
        })
      );
    }
  }, [selectedLangs, allRepos]);

  const handleLangToggle = (lang: string) => {
    setSelectedLangs(prev =>
      prev.includes(lang)
        ? prev.filter(l => l !== lang)
        : [...prev, lang]
    );
  };

  const handleClearFilters = () => {
    setSelectedLangs([]);
  };

  const handleCardClick = async (repo: GithubRepo) => {
    setSelectedRepo(repo);
    setIsModalOpen(true);
    setIsLoadingReadme(true);
    setReadmeContent(null);

    const owner = repo.full_name.split('/')[0];
    const { data: readmeData } = await getRepoReadme(owner, repo.name);

    if (readmeData?.content) {
      try {
        const binaryString = atob(readmeData.content);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const decodedContent = new TextDecoder('utf-8').decode(bytes);
        setReadmeContent(decodedContent);
      } catch (e) {
        console.error("Failed to decode README content:", e);
        setReadmeContent("Erro: Não foi possível decodificar o conteúdo do README.");
      }
    } else {
      setReadmeContent("Nenhum arquivo README encontrado para este projeto.");
    }
    setIsLoadingReadme(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRepo(null);
    setReadmeContent(null);
  };
  
  const SkeletonCard = () => (
    <div className="bg-light-card dark:bg-dark-card rounded-2xl p-6 shadow-md animate-pulse">
        <div className="h-6 bg-light-border dark:bg-dark-border rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-light-border dark:bg-dark-border rounded w-full mb-1"></div>
        <div className="h-4 bg-light-border dark:bg-dark-border rounded w-5/6 mb-4"></div>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-light-border/70 dark:border-dark-border/70">
            <div className="h-5 bg-light-border dark:bg-dark-border rounded w-1/4"></div>
            <div className="flex gap-4">
                <div className="h-5 bg-light-border dark:bg-dark-border rounded w-10"></div>
                <div className="h-5 bg-light-border dark:bg-dark-border rounded w-10"></div>
            </div>
        </div>
    </div>
  );

  return (
    <Section id="projects">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Projetos</h2>
        <p className="text-lg text-light-subtext dark:text-dark-subtext mt-2">
          Uma seleção dos meus trabalhos de código aberto.
        </p>
        <p className="text-sm text-light-subtext dark:text-dark-subtext mt-2">
          Projetos são sincronizados diretamente da API do GitHub a cada 4 horas.
        </p>
        {isReposStale && (
            <div className="mt-4 max-w-2xl mx-auto p-3 text-sm text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-lg dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-500/30" role="alert">
              Atenção: Não foi possível buscar os dados mais recentes. A lista de projetos pode estar desatualizada.
            </div>
        )}
      </div>

      {isLoadingRepos ? (
        <>
            <div className="mb-16">
                <h3 className="text-2xl font-bold text-center mb-8">Projetos em Destaque</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
            </div>
        </>
      ) : (
        <>
          {featuredRepos.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-8">Projetos em Destaque</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {featuredRepos.map((repo, index) => (
                  <ProjectCard key={repo.id} repo={repo} onCardClick={handleCardClick} index={index} />
                ))}
              </div>
            </div>
          )}

          <div>
             {allRepos.length > 0 && (
                <h3 className="text-2xl font-bold text-center mb-8">Outros Projetos</h3>
             )}
            <div className="flex justify-center flex-wrap items-center gap-2 mb-10">
              {languages.map(lang => (
                <button
                  key={lang}
                  onClick={() => handleLangToggle(lang)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 active:scale-95 ${
                    selectedLangs.includes(lang)
                      ? 'bg-light-accent text-white dark:bg-dark-accent ring-2 ring-offset-2 ring-light-accent/50 dark:ring-dark-accent/50 ring-offset-light-bg dark:ring-offset-dark-bg'
                      : 'bg-light-card dark:bg-dark-card hover:bg-light-border dark:hover:bg-dark-border'
                  }`}
                >
                  {lang}
                </button>
              ))}
              {selectedLangs.length > 0 && (
                  <button
                      onClick={handleClearFilters}
                      className="px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 text-light-accent dark:text-dark-accent hover:bg-light-accent/10 dark:hover:bg-dark-accent/20 flex items-center gap-1.5 active:scale-95"
                      aria-label="Limpar filtros"
                  >
                      <X className="w-4 h-4" />
                      Limpar
                  </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRepos.map((repo, index) => (
                <ProjectCard key={repo.id} repo={repo} onCardClick={handleCardClick} index={index} />
              ))}
            </div>
          </div>
        </>
      )}

      {isModalOpen && selectedRepo && (
        <ProjectModal 
          repo={selectedRepo}
          onClose={handleCloseModal}
          readmeContent={readmeContent}
          isLoadingReadme={isLoadingReadme}
        />
      )}
    </Section>
  );
};

export default Projects;