import React, { useState, useMemo, useEffect } from 'react';
import { GithubRepo } from '../types';
import { ReadmeAnalyzer, CategoryInfo } from '../services/readmeAnalyzer';

interface ProjectSearchProps {
  repos: GithubRepo[];
  repoKeywords: any[]; // Array de RepoKeywords do ReadmeAnalyzer
  onFilteredResults: (filtered: GithubRepo[]) => void;
  onSearchStateChange: (isActive: boolean) => void;
}

type SortOption = 'relevance' | 'stars' | 'updated' | 'name' | 'commits';

const ProjectSearch: React.FC<ProjectSearchProps> = ({ 
  repos, 
  repoKeywords,
  onFilteredResults, 
  onSearchStateChange 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Obter categorias ativas (que têm projetos)
  const activeCategories = useMemo(() => {
    return ReadmeAnalyzer.getActiveCategoriesFromRepos(repoKeywords);
  }, [repoKeywords]);

  // Obter sugestões de busca
  const suggestions = useMemo(() => {
    return ReadmeAnalyzer.getSearchSuggestions(repoKeywords, searchTerm);
  }, [repoKeywords, searchTerm]);

  // Processar e filtrar repos usando o sistema inteligente
  const filteredAndSorted = useMemo(() => {
    if (!repos || repos.length === 0) return [];

    // Usar o sistema de busca inteligente do ReadmeAnalyzer
    const matchedKeywords = ReadmeAnalyzer.searchProjects(repoKeywords, searchTerm, selectedCategories);
    
    // Mapear de volta para os repos originais
    const repoMap = new Map(repos.map(repo => [repo.name, repo]));
    let filtered = matchedKeywords
      .map(kw => repoMap.get(kw.repoName))
      .filter(repo => repo) as GithubRepo[];

    // Se não há filtros, mostrar todos os repos
    if (!searchTerm && selectedCategories.length === 0) {
      filtered = [...repos];
    }

    // Ordenar resultados
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          // Ordenar por prioridade (repos com mais palavras-chave técnicas primeiro)
          const aKeywords = repoKeywords.find(kw => kw.repoName === a.name);
          const bKeywords = repoKeywords.find(kw => kw.repoName === b.name);
          const aPriority = aKeywords?.priority || 3;
          const bPriority = bKeywords?.priority || 3;
          if (aPriority !== bPriority) return aPriority - bPriority;
          return b.stargazers_count - a.stargazers_count;
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'updated':
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'commits':
          return (b.commit_count || 0) - (a.commit_count || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [repos, repoKeywords, searchTerm, selectedCategories, sortBy]);

  // Notificar mudanças
  useEffect(() => {
    onFilteredResults(filteredAndSorted);
    onSearchStateChange(searchTerm.trim() !== '' || selectedCategories.length > 0);
  }, [filteredAndSorted, onFilteredResults, onSearchStateChange, searchTerm, selectedCategories]);

  // Estatísticas dos resultados
  const stats = useMemo(() => {
    const total = repos.length;
    const filtered = filteredAndSorted.length;
    const analyzed = repoKeywords.filter(repo => repo.keywords?.length > 0).length;
    
    return { total, filtered, analyzed };
  }, [repos, filteredAndSorted, repoKeywords]);

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSortBy('relevance');
  };

  const selectSuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="mb-8 space-y-6">
      {/* Barra de busca principal */}
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-subtext dark:text-dark-subtext" />
        <input
          type="text"
          placeholder="Buscar por tecnologias, conceitos, arquitetura... (ex: REST API, CRUD, Docker)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-full pl-12 pr-12 py-4 text-lg border border-light-border dark:border-dark-border rounded-2xl bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text placeholder-light-subtext dark:placeholder-dark-subtext focus:outline-none focus:border-light-accent dark:focus:border-dark-accent focus:ring-2 focus:ring-light-accent/20 dark:focus:ring-dark-accent/20 transition-all duration-200"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-light-border dark:hover:bg-dark-border transition-colors"
            aria-label="Limpar busca"
          >
            <X className="w-4 h-4 text-light-subtext dark:text-dark-subtext" />
          </button>
        )}

        {/* Sugestões de busca */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl shadow-lg z-10">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => selectSuggestion(suggestion)}
                className="w-full px-4 py-3 text-left text-light-text dark:text-dark-text hover:bg-light-border/50 dark:hover:bg-dark-border/50 transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                <SearchIcon className="inline w-4 h-4 mr-2 text-light-subtext dark:text-dark-subtext" />
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Categorias ativas */}
      {activeCategories.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-light-text dark:text-dark-text flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtrar por categoria técnica:
          </h3>
          <div className="flex flex-wrap gap-2">
            {activeCategories.map(category => (
              <button
                key={category.name}
                onClick={() => toggleCategory(category.name)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 flex items-center gap-2 ${
                  selectedCategories.includes(category.name)
                    ? 'bg-light-accent dark:bg-dark-accent text-white border-light-accent dark:border-dark-accent'
                    : 'bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text border-light-border dark:border-dark-border hover:border-light-accent dark:hover:border-dark-accent'
                }`}
              >
                <span className="text-base">{category.icon}</span>
                <span>{category.displayName}</span>
                <span className="px-2 py-0.5 bg-black/10 dark:bg-white/10 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Controles de ordenação */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text focus:outline-none focus:border-light-accent dark:focus:border-dark-accent transition-colors"
          >
            <option value="relevance">🎯 Mais relevantes</option>
            <option value="stars">⭐ Mais populares</option>
            <option value="updated">🕒 Mais recentes</option>
            <option value="commits">📝 Mais commits</option>
            <option value="name">📝 A-Z</option>
          </select>
        </div>

        {/* Botão limpar */}
        {(searchTerm || selectedCategories.length > 0) && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium rounded-lg text-light-accent dark:text-dark-accent hover:bg-light-accent/10 dark:hover:bg-dark-accent/20 transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Limpar filtros
          </button>
        )}
      </div>

      {/* Indicadores de resultados */}
      <div className="flex flex-wrap gap-4 text-sm">
        <span className="text-light-subtext dark:text-dark-subtext">
          <span className="font-semibold text-light-accent dark:text-dark-accent">
            {stats.filtered}
          </span> de {stats.total} projetos
          {searchTerm && ` para "${searchTerm}"`}
        </span>
        
        <span className="text-light-subtext dark:text-dark-subtext">
          • <span className="font-semibold">{stats.analyzed}</span> com análise técnica
        </span>

        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {selectedCategories.map(cat => {
              const category = activeCategories.find(c => c.name === cat);
              return category ? (
                <span key={cat} className="px-2 py-1 bg-light-accent/10 dark:bg-dark-accent/20 text-light-accent dark:text-dark-accent rounded-full text-xs font-medium flex items-center gap-1">
                  {category.icon} {category.displayName}
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>

      {/* Sugestões populares quando não há busca */}
      {!searchTerm && selectedCategories.length === 0 && suggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-light-text dark:text-dark-text flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Tecnologias encontradas nos seus projetos:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.slice(0, 12).map(suggestion => (
              <button
                key={suggestion}
                onClick={() => setSearchTerm(suggestion)}
                className="px-3 py-1 text-xs bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-full hover:bg-light-accent/10 dark:hover:bg-dark-accent/20 hover:text-light-accent dark:hover:text-dark-accent hover:border-light-accent dark:hover:border-dark-accent transition-all duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Ícones
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const X: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Filter: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
  </svg>
);

const Lightbulb: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 21h6"></path>
    <path d="M12 3C8.5 3 5.5 6 5.5 9.5c0 3.8 2.2 5.4 3.2 6.5.5.5.3 1.5.3 1.5h6c0 0-.2-1 .3-1.5 1-1.1 3.2-2.7 3.2-6.5C18.5 6 15.5 3 12 3z"></path>
  </svg>
);

export default ProjectSearch;