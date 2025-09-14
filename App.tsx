import React, { useState, useEffect, createContext, useContext } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Projects from './components/Projects';
import About from './components/About';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { NavSection, GithubDataState, GithubContextType } from './types';
import { PERSONAL_INFO, GITHUB_USERNAME } from './constants';
import { getUser, getRepos, getRepoReadme, getRepoCommitCount } from './services/githubService';
import { ReadmeAnalyzer } from './services/readmeAnalyzer';

// Criar contexto do GitHub
const GithubContext = createContext<GithubContextType | null>(null);

export const useGithubContext = () => {
  const context = useContext(GithubContext);
  if (!context) {
    throw new Error('useGithubContext must be used within a GithubProvider');
  }
  return context;
};

const App: React.FC = () => {
  const validSections: NavSection[] = ['home', 'projects', 'about', 'certifications', 'contact'];
  
  const getSectionFromHash = (): NavSection => {
    const hash = window.location.hash.replace('#', '');
    if (validSections.includes(hash as NavSection)) {
        return hash as NavSection;
    }
    // Voltar para home se hash é inválido ou não está presente
    if (window.location.pathname === '/' && !hash) {
      window.history.replaceState(null, '', '#home');
    }
    return 'home';
  };

  const [activeSection, setActiveSection] = useState<NavSection>(getSectionFromHash);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [skillFilter, setSkillFilter] = useState<string | null>(null);

  // Estado global do GitHub
  const [githubState, setGithubState] = useState<GithubDataState>({
    user: null,
    repos: null,
    isLoadingUser: false,
    isLoadingRepos: false,
    isUserStale: false,
    isReposStale: false,
    error: null,
  });

  // Funções de busca de dados do GitHub
  const refreshUser = async () => {
    setGithubState(prev => ({ ...prev, isLoadingUser: true, error: null }));
    try {
      const { data, isStale } = await getUser(GITHUB_USERNAME);
      setGithubState(prev => ({ 
        ...prev, 
        user: data, 
        isUserStale: isStale, 
        isLoadingUser: false 
      }));
    } catch (error) {
      setGithubState(prev => ({ 
        ...prev, 
        error: 'Failed to fetch user data', 
        isLoadingUser: false 
      }));
    }
  };

  const refreshRepos = async () => {
    setGithubState(prev => ({ ...prev, isLoadingRepos: true, error: null }));
    try {
      const { data: repoData, isStale } = await getRepos(GITHUB_USERNAME);
      
      if (repoData) {
        // Adicionar contagem de commits aos repos
        const reposWithCommitsPromises = repoData.map(async (repo) => {
          const owner = repo.full_name.split('/')[0];
          const { data: commitCount } = await getRepoCommitCount(owner, repo.name);
          return { ...repo, commit_count: commitCount ?? undefined };
        });
        const reposWithCommits = await Promise.all(reposWithCommitsPromises);
        
        // Analisar READMEs em paralelo para extrair palavras-chave
        const reposWithKeywordsPromises = reposWithCommits.map(async (repo) => {
          // Verificar se já temos keywords em cache
          const cachedKeywords = ReadmeAnalyzer.getCachedKeywords(repo.name);
          if (cachedKeywords) {
            return {
              ...repo,
              readme_keywords: cachedKeywords.keywords,
              readme_categories: cachedKeywords.categories
            };
          }

          // Buscar README e analisar
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
              
              // Analisar e extrair palavras-chave
              const analysis = await ReadmeAnalyzer.analyzeRepo(repo.name, decodedContent);
              return {
                ...repo,
                readme_keywords: analysis.keywords,
                readme_categories: analysis.categories
              };
            } catch (e) {
              console.error(`Failed to analyze README for ${repo.name}:`, e);
              return repo;
            }
          }
          
          return repo;
        });

        const reposWithKeywords = await Promise.all(reposWithKeywordsPromises);
        
        setGithubState(prev => ({ 
          ...prev, 
          repos: reposWithKeywords, 
          isReposStale: isStale, 
          isLoadingRepos: false 
        }));
      } else {
        setGithubState(prev => ({ 
          ...prev, 
          repos: null, 
          isReposStale: isStale, 
          isLoadingRepos: false 
        }));
      }
    } catch (error) {
      setGithubState(prev => ({ 
        ...prev, 
        error: 'Failed to fetch repositories data', 
        isLoadingRepos: false 
      }));
    }
  };

  // Inicializar dados do GitHub no carregamento
  useEffect(() => {
    refreshUser();
    refreshRepos();
  }, []);

  // Criar valor do contexto
  const githubContextValue: GithubContextType = {
    ...githubState,
    refreshUser,
    refreshRepos,
    getRepoReadme, // Repassar a função do serviço
  };

  useEffect(() => {
    const handleHashChange = () => {
        setActiveSection(getSectionFromHash());
        window.scrollTo(0, 0); // Rolar para o topo na mudança de "página" para melhor UX
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Garantir que o estado inicial esteja correto
    handleHashChange();

    return () => {
        window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // SEO: Título dinâmico da página
  useEffect(() => {
    const baseTitle = `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`;
    const sectionTitles: Record<NavSection, string> = {
        home: 'Início',
        projects: 'Projetos',
        about: 'Sobre',
        certifications: 'Formação',
        contact: 'Contato'
    };
    
    document.title = sectionTitles[activeSection] 
      ? `${sectionTitles[activeSection]} | ${baseTitle}` 
      : baseTitle;
  }, [activeSection]);
  
  const handleSkillSelect = (skill: string) => {
    setSkillFilter(skill);
    window.location.hash = 'projects';
  };

  const renderSection = () => {
    switch (activeSection) {
        case 'projects':
            return <Projects initialFilter={skillFilter} onFilterApplied={() => setSkillFilter(null)} />;
        case 'about':
            return <About onSkillSelect={handleSkillSelect} />;
        case 'certifications':
            return <Certifications />;
        case 'contact':
            return <Contact />;
        case 'home':
        default:
            return <Home />;
    }
  };

  return (
    <GithubContext.Provider value={githubContextValue}>
      <div className="font-sans text-light-text dark:text-dark-text min-h-screen flex flex-col">
        <Header 
          activeSection={activeSection} 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        <main className="flex-grow">
          {renderSection()}
        </main>
        <Footer />
      </div>
    </GithubContext.Provider>
  );
};

export default App;
