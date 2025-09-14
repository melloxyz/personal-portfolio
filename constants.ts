
/**
 * 🔗 CONSTANTS.TS - COMPATIBILIDADE COM CONFIG
 * 
 * Este arquivo agora importa as configurações do portfolio-config.json
 * Para personalizar o portfólio, edite o arquivo portfolio-config.json
 * 
 * ⚠️ NÃO EDITE ESTE ARQUIVO DIRETAMENTE ⚠️
 * Use o portfolio-config.json para todas as configurações
 */

// Importa todas as configurações do arquivo JSON
import { 
  GITHUB_USERNAME as CONFIG_GITHUB_USERNAME,
  PERSONAL_INFO as CONFIG_PERSONAL_INFO,
  FEATURED_PROJECTS as CONFIG_FEATURED_PROJECTS,
  SKILLS as CONFIG_SKILLS,
  ACADEMIC_FORMATION as CONFIG_ACADEMIC_FORMATION,
  CERTIFICATIONS as CONFIG_CERTIFICATIONS
} from './config-loader';

// Re-exporta para manter compatibilidade com código existente
export const GITHUB_USERNAME = CONFIG_GITHUB_USERNAME;
export const PERSONAL_INFO = CONFIG_PERSONAL_INFO;
export const FEATURED_PROJECTS = CONFIG_FEATURED_PROJECTS;
export const SKILLS = CONFIG_SKILLS;
export const ACADEMIC_FORMATION = CONFIG_ACADEMIC_FORMATION;
export const CERTIFICATIONS = CONFIG_CERTIFICATIONS;

console.log('📋 Constants carregadas do portfolio-config.json');
