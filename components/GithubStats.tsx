import React, { useMemo } from 'react';
import { GithubRepo } from '../types';
import { languageColorMapping } from './ProjectCard'; // Reutilizar o mapeamento de cores

interface GithubStatsProps {
  repos: GithubRepo[] | null;
  isLoading: boolean;
  isDataStale: boolean;
}

// Subcomponente para cards individuais de estatística
const StatCard: React.FC<{ icon: React.ReactNode; value: string | number; label: string }> = ({ icon, value, label }) => (
  <div className="bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-md flex flex-col items-center justify-center text-center">
    <div className="text-light-accent dark:text-dark-accent mb-2">{icon}</div>
    <p className="text-3xl font-bold text-light-text dark:text-dark-text">{value}</p>
    <p className="text-sm text-light-subtext dark:text-dark-subtext">{label}</p>
  </div>
);

// Skeleton para o StatCard
const StatCardSkeleton = () => (
    <div className="bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-md flex flex-col items-center justify-center text-center animate-pulse">
        <div className="w-8 h-8 bg-light-border dark:bg-dark-border rounded-full mb-2"></div>
        <div className="h-8 w-16 bg-light-border dark:bg-dark-border rounded-md mb-2"></div>
        <div className="h-4 w-24 bg-light-border dark:bg-dark-border rounded-md"></div>
    </div>
);


const GithubStats: React.FC<GithubStatsProps> = ({ repos, isLoading, isDataStale }) => {
  const stats = useMemo(() => {
    if (!repos || repos.length === 0) {
      return {
        totalStars: 0,
        topLanguages: [],
      };
    }

    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

    const languageCounts: { [key: string]: number } = {};
    repos.forEach(repo => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });

    const totalLanguageRepos = Object.values(languageCounts).reduce((acc, count) => acc + count, 0);

    const topLanguages = Object.entries(languageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([language, count]) => ({
        language,
        percentage: totalLanguageRepos > 0 ? Math.round((count / totalLanguageRepos) * 100) : 0,
      }));

    return { totalStars, topLanguages };
  }, [repos]);

  return (
    <div>
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">Estatísticas do GitHub</h3>
        {isDataStale && (
            <div className="mb-6 max-w-2xl mx-auto p-3 text-sm text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-lg dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-500/30" role="alert">
              Atenção: Não foi possível buscar os dados mais recentes. As estatísticas podem estar desatualizadas.
            </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {isLoading ? (
                <>
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                </>
            ) : (
                <>
                    <StatCard icon={<Code className="w-8 h-8" />} value={repos?.length || 0} label="Repositórios Públicos" />
                    <StatCard icon={<Star className="w-8 h-8" />} value={stats.totalStars} label="Total de Estrelas" />
                    <StatCard icon={<Heart className="w-8 h-8" />} value={stats.topLanguages[0]?.language || 'N/A'} label="Principal Linguagem" />
                </>
            )}
        </div>

        <div>
            <h4 className="text-xl font-bold mb-4 text-center">Linguagens Mais Utilizadas</h4>
            <div className="space-y-4 max-w-lg mx-auto">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                         <div key={index} className="h-10 bg-light-card dark:bg-dark-card rounded-lg animate-pulse"></div>
                    ))
                ) : (
                    stats.topLanguages.map(({ language, percentage }) => {
                        const colorClass = languageColorMapping[language] || 'bg-gray-500';
                        return (
                            <div key={language} className="w-full">
                                <div className="flex justify-between items-center mb-1 text-sm font-medium">
                                    <span className="text-light-text dark:text-dark-text">{language}</span>
                                    <span className="text-light-subtext dark:text-dark-subtext">{percentage}%</span>
                                </div>
                                <div className="w-full bg-light-border dark:bg-dark-border rounded-full h-2.5">
                                    <div 
                                        className={`${colorClass} h-2.5 rounded-full`} 
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    </div>
  );
};

// Ícones definidos inline
const Code: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);
const Star: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);
const Heart: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);


export default GithubStats;