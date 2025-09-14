// Serviço para análise de READMEs e extração de palavras-chave técnicas
export interface TechKeyword {
  term: string;
  category: 'language' | 'framework' | 'database' | 'api' | 'architecture' | 'tool' | 'concept' | 'cloud' | 'testing' | 'mobile' | 'devops' | 'security';
  aliases: string[];
  priority?: number; // Para priorizar termos mais importantes
}

// Base de conhecimento expandida de termos técnicos
export const TECH_KEYWORDS: TechKeyword[] = [
  // Linguagens de Programação
  { term: 'JavaScript', category: 'language', aliases: ['javascript', 'js', 'ecmascript'], priority: 1 },
  { term: 'TypeScript', category: 'language', aliases: ['typescript', 'ts'], priority: 1 },
  { term: 'Python', category: 'language', aliases: ['python', 'py', 'python3'], priority: 1 },
  { term: 'Node.js', category: 'language', aliases: ['nodejs', 'node.js', 'node js', 'node'], priority: 1 },
  { term: 'Java', category: 'language', aliases: ['java', 'openjdk'], priority: 1 },
  { term: 'C#', category: 'language', aliases: ['c#', 'csharp', 'c sharp', 'dotnet', '.net'], priority: 1 },
  { term: 'Go', category: 'language', aliases: ['go', 'golang'], priority: 1 },
  { term: 'Rust', category: 'language', aliases: ['rust', 'rustlang'], priority: 1 },
  { term: 'PHP', category: 'language', aliases: ['php'], priority: 1 },
  { term: 'Ruby', category: 'language', aliases: ['ruby', 'rails', 'ruby on rails'], priority: 1 },
  { term: 'C++', category: 'language', aliases: ['c++', 'cpp', 'cplusplus'], priority: 1 },
  { term: 'C', category: 'language', aliases: ['c language', 'clang'], priority: 1 },
  { term: 'Swift', category: 'language', aliases: ['swift', 'swiftlang'], priority: 1 },
  { term: 'Kotlin', category: 'language', aliases: ['kotlin'], priority: 1 },
  { term: 'Dart', category: 'language', aliases: ['dart', 'dartlang'], priority: 1 },

  // APIs e Protocolos
  { term: 'REST API', category: 'api', aliases: ['rest', 'restful', 'api rest', 'rest api', 'restful api'], priority: 2 },
  { term: 'GraphQL', category: 'api', aliases: ['graphql', 'graph ql', 'apollo'], priority: 2 },
  { term: 'WebSocket', category: 'api', aliases: ['websocket', 'web socket', 'ws', 'socket.io'], priority: 2 },
  { term: 'gRPC', category: 'api', aliases: ['grpc', 'grpc-web', 'protocol buffers', 'protobuf'], priority: 2 },
  { term: 'JSON API', category: 'api', aliases: ['json api', 'jsonapi', 'json'], priority: 2 },
  { term: 'SOAP', category: 'api', aliases: ['soap', 'wsdl'], priority: 2 },
  { term: 'OpenAPI', category: 'api', aliases: ['openapi', 'swagger', 'api documentation'], priority: 2 },

  // Bancos de Dados
  { term: 'MySQL', category: 'database', aliases: ['mysql', 'my sql'], priority: 2 },
  { term: 'PostgreSQL', category: 'database', aliases: ['postgresql', 'postgres', 'pg'], priority: 2 },
  { term: 'MongoDB', category: 'database', aliases: ['mongodb', 'mongo', 'mongoose'], priority: 2 },
  { term: 'Redis', category: 'database', aliases: ['redis', 'cache'], priority: 2 },
  { term: 'SQLite', category: 'database', aliases: ['sqlite', 'sqlite3'], priority: 2 },
  { term: 'Firebase', category: 'database', aliases: ['firebase', 'firestore', 'realtime database'], priority: 2 },
  { term: 'Prisma', category: 'database', aliases: ['prisma', 'prisma orm'], priority: 2 },
  { term: 'Supabase', category: 'database', aliases: ['supabase'], priority: 2 },
  { term: 'DynamoDB', category: 'database', aliases: ['dynamodb', 'dynamo'], priority: 2 },
  { term: 'Oracle', category: 'database', aliases: ['oracle', 'oracle db'], priority: 2 },
  { term: 'SQL Server', category: 'database', aliases: ['sql server', 'mssql', 'microsoft sql'], priority: 2 },
  { term: 'Elasticsearch', category: 'database', aliases: ['elasticsearch', 'elastic', 'elk'], priority: 2 },

  // Frameworks Frontend
  { term: 'React', category: 'framework', aliases: ['react', 'reactjs', 'react.js'], priority: 1 },
  { term: 'Vue.js', category: 'framework', aliases: ['vue', 'vuejs', 'vue.js'], priority: 1 },
  { term: 'Angular', category: 'framework', aliases: ['angular', 'angularjs'], priority: 1 },
  { term: 'Svelte', category: 'framework', aliases: ['svelte', 'sveltejs'], priority: 1 },
  { term: 'Next.js', category: 'framework', aliases: ['nextjs', 'next.js', 'next'], priority: 1 },
  { term: 'Nuxt.js', category: 'framework', aliases: ['nuxt', 'nuxtjs', 'nuxt.js'], priority: 1 },
  { term: 'Gatsby', category: 'framework', aliases: ['gatsby', 'gatsbyjs'], priority: 1 },

  // Frameworks Backend
  { term: 'Express', category: 'framework', aliases: ['express', 'expressjs', 'express.js'], priority: 1 },
  { term: 'Fastify', category: 'framework', aliases: ['fastify'], priority: 1 },
  { term: 'NestJS', category: 'framework', aliases: ['nestjs', 'nest'], priority: 1 },
  { term: 'Koa', category: 'framework', aliases: ['koa', 'koajs'], priority: 1 },
  { term: 'Django', category: 'framework', aliases: ['django', 'python django'], priority: 1 },
  { term: 'Flask', category: 'framework', aliases: ['flask', 'python flask'], priority: 1 },
  { term: 'Spring Boot', category: 'framework', aliases: ['spring', 'spring boot', 'springboot'], priority: 1 },
  { term: 'Laravel', category: 'framework', aliases: ['laravel', 'php laravel'], priority: 1 },

  // CSS Frameworks
  { term: 'Tailwind CSS', category: 'framework', aliases: ['tailwind', 'tailwindcss'], priority: 1 },
  { term: 'Bootstrap', category: 'framework', aliases: ['bootstrap'], priority: 1 },
  { term: 'Material-UI', category: 'framework', aliases: ['material-ui', 'mui', 'material design'], priority: 1 },
  { term: 'Styled Components', category: 'framework', aliases: ['styled-components', 'styled components'], priority: 1 },

  // Arquitetura e Conceitos
  { term: 'CRUD', category: 'concept', aliases: ['crud', 'create read update delete'], priority: 2 },
  { term: 'MVC', category: 'architecture', aliases: ['mvc', 'model view controller'], priority: 2 },
  { term: 'MVP', category: 'architecture', aliases: ['mvp', 'model view presenter'], priority: 2 },
  { term: 'MVVM', category: 'architecture', aliases: ['mvvm', 'model view viewmodel'], priority: 2 },
  { term: 'Microservices', category: 'architecture', aliases: ['microservices', 'microservice', 'micro services'], priority: 2 },
  { term: 'Monolith', category: 'architecture', aliases: ['monolith', 'monolithic'], priority: 2 },
  { term: 'Clean Architecture', category: 'architecture', aliases: ['clean architecture', 'clean arch'], priority: 2 },
  { term: 'Hexagonal Architecture', category: 'architecture', aliases: ['hexagonal', 'ports and adapters'], priority: 2 },
  { term: 'Domain Driven Design', category: 'architecture', aliases: ['ddd', 'domain driven design'], priority: 2 },

  // Cloud e Serviços
  { term: 'AWS', category: 'cloud', aliases: ['aws', 'amazon web services'], priority: 2 },
  { term: 'Google Cloud', category: 'cloud', aliases: ['gcp', 'google cloud', 'google cloud platform'], priority: 2 },
  { term: 'Azure', category: 'cloud', aliases: ['azure', 'microsoft azure'], priority: 2 },
  { term: 'Vercel', category: 'cloud', aliases: ['vercel'], priority: 2 },
  { term: 'Netlify', category: 'cloud', aliases: ['netlify'], priority: 2 },
  { term: 'Heroku', category: 'cloud', aliases: ['heroku'], priority: 2 },
  { term: 'DigitalOcean', category: 'cloud', aliases: ['digitalocean', 'digital ocean'], priority: 2 },

  // DevOps e Ferramentas
  { term: 'Docker', category: 'devops', aliases: ['docker', 'containerization', 'containers'], priority: 1 },
  { term: 'Kubernetes', category: 'devops', aliases: ['kubernetes', 'k8s'], priority: 2 },
  { term: 'Git', category: 'tool', aliases: ['git', 'version control'], priority: 1 },
  { term: 'GitHub Actions', category: 'devops', aliases: ['github actions', 'gh actions'], priority: 2 },
  { term: 'Jenkins', category: 'devops', aliases: ['jenkins'], priority: 2 },
  { term: 'CI/CD', category: 'devops', aliases: ['ci/cd', 'continuous integration', 'continuous deployment'], priority: 2 },
  { term: 'Terraform', category: 'devops', aliases: ['terraform', 'infrastructure as code'], priority: 2 },

  // Ferramentas de Build e Bundling
  { term: 'Webpack', category: 'tool', aliases: ['webpack', 'bundler'], priority: 1 },
  { term: 'Vite', category: 'tool', aliases: ['vite', 'vitejs'], priority: 1 },
  { term: 'Rollup', category: 'tool', aliases: ['rollup', 'rollupjs'], priority: 1 },
  { term: 'ESBuild', category: 'tool', aliases: ['esbuild'], priority: 1 },
  { term: 'Babel', category: 'tool', aliases: ['babel', 'babeljs'], priority: 1 },

  // Testing
  { term: 'Jest', category: 'testing', aliases: ['jest', 'jestjs'], priority: 2 },
  { term: 'Cypress', category: 'testing', aliases: ['cypress', 'e2e testing'], priority: 2 },
  { term: 'Playwright', category: 'testing', aliases: ['playwright'], priority: 2 },
  { term: 'Testing Library', category: 'testing', aliases: ['testing-library', 'react testing library'], priority: 2 },
  { term: 'Vitest', category: 'testing', aliases: ['vitest'], priority: 2 },
  { term: 'Unit Testing', category: 'testing', aliases: ['unit test', 'unit testing'], priority: 2 },

  // Mobile
  { term: 'React Native', category: 'mobile', aliases: ['react native', 'react-native'], priority: 1 },
  { term: 'Flutter', category: 'mobile', aliases: ['flutter'], priority: 1 },
  { term: 'Ionic', category: 'mobile', aliases: ['ionic'], priority: 1 },
  { term: 'Cordova', category: 'mobile', aliases: ['cordova', 'phonegap'], priority: 1 },
  { term: 'Expo', category: 'mobile', aliases: ['expo'], priority: 1 },

  // Segurança
  { term: 'JWT', category: 'security', aliases: ['jwt', 'json web token'], priority: 2 },
  { term: 'OAuth', category: 'security', aliases: ['oauth', 'oauth2', 'oauth 2.0'], priority: 2 },
  { term: 'SSL/TLS', category: 'security', aliases: ['ssl', 'tls', 'https'], priority: 2 },
  { term: 'HTTPS', category: 'security', aliases: ['https', 'secure http'], priority: 2 },
  { term: 'Authentication', category: 'security', aliases: ['auth', 'authentication', 'login'], priority: 2 },

  // Conceitos Gerais
  { term: 'Responsive Design', category: 'concept', aliases: ['responsive', 'mobile first', 'adaptive'], priority: 2 },
  { term: 'PWA', category: 'concept', aliases: ['pwa', 'progressive web app'], priority: 2 },
  { term: 'SPA', category: 'concept', aliases: ['spa', 'single page application'], priority: 2 },
  { term: 'SSR', category: 'concept', aliases: ['ssr', 'server side rendering'], priority: 2 },
  { term: 'SSG', category: 'concept', aliases: ['ssg', 'static site generation'], priority: 2 },

  // Linting e Formatação
  { term: 'ESLint', category: 'tool', aliases: ['eslint', 'linting'], priority: 1 },
  { term: 'Prettier', category: 'tool', aliases: ['prettier', 'code formatting'], priority: 1 },
  { term: 'Husky', category: 'tool', aliases: ['husky', 'git hooks'], priority: 1 },
];

export interface RepoKeywords {
  repoName: string;
  keywords: string[];
  categories: { [category: string]: string[] };
  lastAnalyzed: number;
  priority?: number; // Prioridade baseada nas palavras-chave encontradas
}

export interface CategoryInfo {
  name: string;
  displayName: string;
  icon: string;
  count: number;
  keywords: string[];
}

export class ReadmeAnalyzer {
  private static CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 dias em milissegundos

  // Mapeamento de nomes de categoria para exibição
  private static CATEGORY_DISPLAY_NAMES: { [key: string]: { name: string; icon: string } } = {
    language: { name: 'Linguagens', icon: '💻' },
    framework: { name: 'Frameworks', icon: '⚡' },
    database: { name: 'Bancos de Dados', icon: '🗄️' },
    api: { name: 'APIs & Protocolos', icon: '🔌' },
    architecture: { name: 'Arquitetura', icon: '🏗️' },
    tool: { name: 'Ferramentas', icon: '🔧' },
    concept: { name: 'Conceitos', icon: '💡' },
    cloud: { name: 'Cloud & Deploy', icon: '☁️' },
    testing: { name: 'Testes', icon: '🧪' },
    mobile: { name: 'Mobile', icon: '📱' },
    devops: { name: 'DevOps', icon: '🚀' },
    security: { name: 'Segurança', icon: '🔒' }
  };

  // Extrair palavras-chave técnicas de um texto com priorização
  static extractKeywords(text: string): { keywords: string[]; categories: { [category: string]: string[] }; priority: number } {
    if (!text) {
      return { keywords: [], categories: {}, priority: 0 };
    }

    const normalizedText = text.toLowerCase();
    const foundKeywords: { term: string; category: string; priority: number }[] = [];
    const categories: { [category: string]: string[] } = {};

    TECH_KEYWORDS.forEach(techKeyword => {
      const found = techKeyword.aliases.some(alias => {
        const regex = new RegExp(`\\b${alias.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        return regex.test(normalizedText);
      });

      if (found) {
        foundKeywords.push({
          term: techKeyword.term,
          category: techKeyword.category,
          priority: techKeyword.priority || 3
        });
        
        if (!categories[techKeyword.category]) {
          categories[techKeyword.category] = [];
        }
        categories[techKeyword.category].push(techKeyword.term);
      }
    });

    // Calcular prioridade total (quanto menor o número, maior a prioridade)
    const totalPriority = foundKeywords.reduce((sum, kw) => sum + kw.priority, 0) / Math.max(foundKeywords.length, 1);

    return {
      keywords: [...new Set(foundKeywords.map(kw => kw.term))], // Remove duplicatas
      categories,
      priority: totalPriority
    };
  }

  // Analisar README e cachear resultado com prioridade
  static async analyzeRepo(repoName: string, readmeContent: string): Promise<RepoKeywords> {
    const cacheKey = `readme_keywords_${repoName}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const parsed: RepoKeywords = JSON.parse(cachedData);
      if (Date.now() - parsed.lastAnalyzed < this.CACHE_DURATION) {
        return parsed;
      }
    }

    const analysis = this.extractKeywords(readmeContent);
    const result: RepoKeywords = {
      repoName,
      keywords: analysis.keywords,
      categories: analysis.categories,
      lastAnalyzed: Date.now(),
      priority: analysis.priority
    };

    localStorage.setItem(cacheKey, JSON.stringify(result));
    return result;
  }

  // Obter categorias que têm projetos (somente as que aparecem nos resultados)
  static getActiveCategoriesFromRepos(repoKeywords: RepoKeywords[]): CategoryInfo[] {
    const categoryStats: { [category: string]: { count: number; keywords: Set<string> } } = {};

    // Contar projetos por categoria
    repoKeywords.forEach(repo => {
      Object.keys(repo.categories).forEach(category => {
        if (!categoryStats[category]) {
          categoryStats[category] = { count: 0, keywords: new Set() };
        }
        categoryStats[category].count++;
        repo.categories[category].forEach(keyword => {
          categoryStats[category].keywords.add(keyword);
        });
      });
    });

    // Converter para CategoryInfo e ordenar por relevância
    return Object.entries(categoryStats)
      .map(([category, stats]): CategoryInfo => {
        const displayInfo = this.CATEGORY_DISPLAY_NAMES[category] || { name: category, icon: '📂' };
        return {
          name: category,
          displayName: displayInfo.name,
          icon: displayInfo.icon,
          count: stats.count,
          keywords: Array.from(stats.keywords).sort()
        };
      })
      .sort((a, b) => b.count - a.count); // Ordenar por quantidade de projetos
  }

  // Buscar projetos por termo de pesquisa inteligente
  static searchProjects(
    repoKeywords: RepoKeywords[], 
    searchTerm: string, 
    selectedCategories: string[] = []
  ): RepoKeywords[] {
    if (!searchTerm && selectedCategories.length === 0) {
      return repoKeywords.sort((a, b) => (a.priority || 3) - (b.priority || 3));
    }

    const normalizedSearch = searchTerm.toLowerCase().trim();
    
    return repoKeywords
      .filter(repo => {
        // Filtrar por categorias selecionadas
        if (selectedCategories.length > 0) {
          const hasSelectedCategory = selectedCategories.some(cat => repo.categories[cat]);
          if (!hasSelectedCategory) return false;
        }

        // Se não há termo de busca, retornar todos que passaram no filtro de categoria
        if (!normalizedSearch) return true;

        // Buscar no nome do repositório
        if (repo.repoName.toLowerCase().includes(normalizedSearch)) return true;

        // Buscar nas palavras-chave
        return repo.keywords.some(keyword => 
          keyword.toLowerCase().includes(normalizedSearch) ||
          // Buscar também nos aliases
          TECH_KEYWORDS.some(tech => 
            tech.term.toLowerCase() === keyword.toLowerCase() &&
            tech.aliases.some(alias => alias.toLowerCase().includes(normalizedSearch))
          )
        );
      })
      .sort((a, b) => {
        // Ordenar por relevância: primeiro por prioridade, depois por quantidade de matches
        const priorityDiff = (a.priority || 3) - (b.priority || 3);
        if (priorityDiff !== 0) return priorityDiff;

        // Se mesma prioridade, ordenar por quantidade de palavras-chave
        return b.keywords.length - a.keywords.length;
      });
  }

  // Obter sugestões de busca baseadas nas palavras-chave disponíveis
  static getSearchSuggestions(repoKeywords: RepoKeywords[], searchTerm: string = ''): string[] {
    const allKeywords = new Set<string>();
    repoKeywords.forEach(repo => {
      repo.keywords.forEach(keyword => allKeywords.add(keyword));
    });

    const suggestions = Array.from(allKeywords);
    
    if (!searchTerm) {
      // Retornar as 10 palavras-chave mais populares
      const keywordCounts: { [keyword: string]: number } = {};
      suggestions.forEach(keyword => {
        keywordCounts[keyword] = repoKeywords.filter(repo => 
          repo.keywords.includes(keyword)
        ).length;
      });
      
      return suggestions
        .sort((a, b) => keywordCounts[b] - keywordCounts[a])
        .slice(0, 10);
    }

    // Filtrar sugestões que fazem match com o termo
    const normalizedSearch = searchTerm.toLowerCase();
    return suggestions
      .filter(keyword => keyword.toLowerCase().includes(normalizedSearch))
      .sort((a, b) => a.length - b.length) // Preferir matches mais curtos
      .slice(0, 8);
  }

  // Obter palavras-chave em cache (para busca rápida)
  static getCachedKeywords(repoName: string): RepoKeywords | null {
    const cacheKey = `readme_keywords_${repoName}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const parsed: RepoKeywords = JSON.parse(cachedData);
      if (Date.now() - parsed.lastAnalyzed < this.CACHE_DURATION) {
        return parsed;
      }
    }

    return null;
  }

  // Obter todas as categorias disponíveis no sistema
  static getAllAvailableCategories(): CategoryInfo[] {
    return Object.entries(this.CATEGORY_DISPLAY_NAMES).map(([key, info]) => ({
      name: key,
      displayName: info.name,
      icon: info.icon,
      count: 0,
      keywords: this.getKeywordsByCategory(key)
    }));
  }

  // Obter palavras-chave por categoria
  static getKeywordsByCategory(category: string): string[] {
    return TECH_KEYWORDS
      .filter(keyword => keyword.category === category)
      .map(keyword => keyword.term)
      .sort();
  }

  // Limpar cache antigo (útil para desenvolvimento)
  static clearOldCache(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('readme_keywords_')) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const parsed = JSON.parse(data);
            if (Date.now() - parsed.lastAnalyzed > this.CACHE_DURATION) {
              localStorage.removeItem(key);
            }
          } catch (e) {
            localStorage.removeItem(key);
          }
        }
      }
    });
  }
}