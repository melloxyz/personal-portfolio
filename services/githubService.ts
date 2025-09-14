import axios from 'axios';
import { GithubUser, GithubRepo, GithubReadme, CachedResponse } from '../types';

const API_BASE_URL = 'https://api.github.com';
const CACHE_DURATION = 4 * 60 * 60 * 1000; // 4 horas em milissegundos

// Obter token de forma segura das variáveis de ambiente
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: { [key: string]: string } = {};
if (GITHUB_TOKEN) {
  headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
}

const getWithCache = async <T,>(key: string, url: string): Promise<CachedResponse<T>> => {
  const cachedItem = localStorage.getItem(key);
  let cachedData: { data: T, timestamp: number } | null = null;
  
  if (cachedItem) {
    cachedData = JSON.parse(cachedItem);
  }

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return { data: cachedData.data, isStale: false, timestamp: cachedData.timestamp };
  }

  try {
    const response = await axios.get<T>(url, { headers });
    const dataToCache = { data: response.data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(dataToCache));
    return { data: response.data, isStale: false, timestamp: dataToCache.timestamp };
  } catch (error) {
    console.error(`Error fetching data for ${key}:`, error);
    if (cachedData) {
      // API falhou, mas temos dados obsoletos
      return { data: cachedData.data, isStale: true, timestamp: cachedData.timestamp };
    }
    // API falhou e não existe cache
    return { data: null, isStale: false };
  }
};

const parseLinkHeader = (header: string): { [key: string]: string } => {
    if (!header || header.length === 0) {
        return {};
    }
    const parts = header.split(',');
    const links: { [key: string]: string } = {};
    parts.forEach(p => {
        const section = p.split(';');
        if (section.length !== 2) {
            return;
        }
        const url = section[0].replace(/<(.*)>/, '$1').trim();
        const name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
    });
    return links;
};


export const getUser = async (username: string): Promise<CachedResponse<GithubUser>> => {
  return getWithCache<GithubUser>(`github_user_${username}`, `${API_BASE_URL}/users/${username}`);
};

export const getRepos = async (username: string): Promise<CachedResponse<GithubRepo[]>> => {
  const response = await getWithCache<GithubRepo[]>(
    `github_repos_${username}`, 
    `${API_BASE_URL}/users/${username}/repos?sort=pushed&per_page=100`
  );
  
  if (response.data) {
    // Filtrar repositórios bifurcados e ordenar por estrelas
    const processedRepos = response.data
      .filter(repo => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
    return { ...response, data: processedRepos };
  }
  
  return response;
};

export const getRepoReadme = async (owner: string, repoName: string): Promise<CachedResponse<GithubReadme>> => {
  return getWithCache<GithubReadme>(
    `github_readme_${owner}_${repoName}`, 
    `${API_BASE_URL}/repos/${owner}/${repoName}/readme`
  );
};

export const getRepoCommitCount = async (owner: string, repoName: string): Promise<CachedResponse<number>> => {
    const key = `github_commits_${owner}_${repoName}`;
    const url = `${API_BASE_URL}/repos/${owner}/${repoName}/commits?per_page=1`;

    const cachedItem = localStorage.getItem(key);
    let cachedData: { data: number, timestamp: number } | null = null;

    if (cachedItem) {
      cachedData = JSON.parse(cachedItem);
    }
    
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return { data: cachedData.data, isStale: false, timestamp: cachedData.timestamp };
    }

    try {
        const response = await axios.get(url, { headers });
        let count = 0;
        
        if (response.data.length > 0) {
          const linkHeader = response.headers['link'];
          if (!linkHeader) {
            count = response.data.length; // Se não há cabeçalho link, o count é apenas os itens desta página
          } else {
            const links = parseLinkHeader(linkHeader);
            if (links.last) {
                const lastPageUrl = new URL(links.last);
                count = parseInt(lastPageUrl.searchParams.get('page') || '0', 10);
            } else {
                // Este caso lida com repos que têm exatamente `per_page` commits
                // Vamos contar os itens da página atual se não há link 'last'
                count = response.data.length; 
            }
          }
        }
        
        const dataToCache = { data: count, timestamp: Date.now() };
        localStorage.setItem(key, JSON.stringify(dataToCache));
        return { data: count, isStale: false, timestamp: dataToCache.timestamp };
    } catch (error) {
        console.error(`Error fetching commit count for ${repoName}:`, error);
        if (cachedData) {
            return { data: cachedData.data, isStale: true, timestamp: cachedData.timestamp };
        }
        return { data: null, isStale: false };
    }
};