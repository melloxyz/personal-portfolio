// config-loader.ts
import portfolioConfig from './portfolio-config.json';

/**
 * 🔧 CARREGADOR DE CONFIGURAÇÃO DO PORTFÓLIO
 * 
 * Este arquivo carrega e valida as configurações do portfolio-config.json
 * Fornece fallbacks seguros caso alguma configuração esteja ausente
 */

// Tipos para validação
interface PortfolioConfig {
  informacoesPessoais: {
    nome: string;
    titulo: string;
    biografiaCompleta: string;
    email: string;
  };
  github: {
    usuario: string;
    projetosDestacados: string[];
    repositoriosIgnorados: string[];
    mostrarEstatisticas: boolean;
    mostrarProjetosRecentes: boolean;
    quantidadeProjetosRecentes: number;
  };
  redesSociais: Record<string, string>;
  habilidades: {
    linguagens: string[];
    frontend: string[];
    ferramentas: string[];
  };
  formacaoAcademica: {
    formacoes: Array<{
      instituicao: string;
      curso: string;
      periodo: string;
      logoUrl: string;
      status: string;
      disciplinasPrincipais: string[];
      tecnologias: string[];
    }>;
  };
  certificacoes: {
    certificados: Array<{
      titulo: string;
      emissor: string;
      logoEmisor: string;
      data: string;
      urlVerificacao: string;
    }>;
  };
  tema: {
    coresPrimarias: {
      gradientePrincipal: string[];
      corPrimaria: string;
      corSecundaria: string;
      corDeDestaque: string;
    };
    animacoes: {
      habilitarOrbsAnimados: boolean;
      habilitarAnimacoesHover: boolean;
      velocidadeAnimacao: string;
      habilitarGradientes: boolean;
    };
    layout: {
      mostrarBackgroundOrbs: boolean;
      estiloBotoes: string;
      estiloCards: string;
    };
  };
}

/**
 * Valida se uma URL é válida
 */
function isValidUrl(url: string): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Valida se um email é válido (básico)
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Carrega e valida a configuração do portfólio
 */
function loadAndValidateConfig(): PortfolioConfig {
  const config = portfolioConfig as any;
  
  // Validações básicas
  if (!config.informacoesPessoais?.nome) {
    console.warn('⚠️ Nome não configurado no portfolio-config.json');
  }
  
  if (!config.github?.usuario) {
    console.error('❌ Username do GitHub é obrigatório! Configure em portfolio-config.json');
  }
  
  if (!isValidEmail(config.informacoesPessoais?.email)) {
    console.warn('⚠️ Email inválido no portfolio-config.json');
  }
  
  // Valida URLs de certificações
  config.certificacoes?.certificados?.forEach((cert: any, index: number) => {
    if (!isValidUrl(cert.urlVerificacao)) {
      console.warn(`⚠️ URL de verificação inválida na certificação ${index + 1}: ${cert.titulo}`);
    }
  });
  
  return config;
}

// Carrega a configuração validada
export const CONFIG = loadAndValidateConfig();

// Exporta valores específicos para compatibilidade
export const GITHUB_USERNAME = CONFIG.github.usuario;
export const PERSONAL_INFO = {
  name: CONFIG.informacoesPessoais.nome,
  title: CONFIG.informacoesPessoais.titulo,
  bio: CONFIG.informacoesPessoais.biografiaCompleta,
  extendedBio: CONFIG.informacoesPessoais.biografiaCompleta,
  email: CONFIG.informacoesPessoais.email
};

export const FEATURED_PROJECTS = CONFIG.github.projetosDestacados;

export const SKILLS = [
  ...CONFIG.habilidades.linguagens,
  ...CONFIG.habilidades.frontend,
  ...CONFIG.habilidades.ferramentas
];

// Transforma formação acadêmica para o formato esperado
export const ACADEMIC_FORMATION = CONFIG.formacaoAcademica.formacoes.map(formacao => ({
  institution: formacao.instituicao,
  course: formacao.curso,
  period: formacao.periodo,
  logoUrl: formacao.logoUrl,
  mainSubjects: formacao.disciplinasPrincipais,
  toolsAndLanguages: formacao.tecnologias
}));

// Transforma certificações para o formato esperado
export const CERTIFICATIONS = CONFIG.certificacoes.certificados.map(cert => ({
  title: cert.titulo,
  issuer: cert.emissor,
  issuerLogoUrl: cert.logoEmisor,
  date: cert.data,
  verifyUrl: cert.urlVerificacao
}));

/**
 * 🎨 CONFIGURAÇÕES DE TEMA
 */
export const THEME_CONFIG = {
  primaryGradient: CONFIG.tema.coresPrimarias.gradientePrincipal,
  primaryColor: CONFIG.tema.coresPrimarias.corPrimaria,
  secondaryColor: CONFIG.tema.coresPrimarias.corSecundaria,
  accentColor: CONFIG.tema.coresPrimarias.corDeDestaque,
  animations: CONFIG.tema.animacoes,
  layout: CONFIG.tema.layout
};

/**
 * 🌐 REDES SOCIAIS FILTRADAS (remove vazias)
 */
export const SOCIAL_LINKS = Object.entries(CONFIG.redesSociais)
  .filter(([_, url]) => url && url.trim() !== '')
  .reduce((acc, [key, url]) => ({ ...acc, [key]: url }), {});

console.log('✅ Configuração do portfólio carregada com sucesso!');
console.log(`👤 Portfólio de: ${PERSONAL_INFO.name}`);
console.log(`🔗 GitHub: ${GITHUB_USERNAME}`);
console.log(`🎨 Tema: ${THEME_CONFIG.primaryGradient.join(' → ')}`);