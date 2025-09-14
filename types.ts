// Corrigir: Importar React para resolver erro 'Cannot find namespace 'React''
import React from 'react';

export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string | null;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface License {
  key: string;
  name: string;
  spdx_id: string;
  url: string | null;
  node_id: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  license: License | null;
  commit_count?: number;
}

export interface GithubReadme {
  content: string; // Conteúdo codificado em Base64
}

export interface AcademicFormation {
  institution: string;
  course: string;
  period: string;
  mainSubjects: string[];
  toolsAndLanguages: string[];
  logoUrl: string;
}

export interface Certification {
  title: string;
  issuer: string;
  issuerLogoUrl: string;
  date: string;
  verifyUrl: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export type NavSection = 'home' | 'projects' | 'about' | 'certifications' | 'contact';

export interface CachedResponse<T> {
  data: T | null;
  isStale: boolean;
  timestamp?: number;
}

export interface GithubDataState {
  user: GithubUser | null;
  repos: GithubRepo[] | null;
  isLoadingUser: boolean;
  isLoadingRepos: boolean;
  isUserStale: boolean;
  isReposStale: boolean;
  error: string | null;
}

export interface GithubContextType extends GithubDataState {
  refreshUser: () => Promise<void>;
  refreshRepos: () => Promise<void>;
  getRepoReadme: (owner: string, repoName: string) => Promise<CachedResponse<GithubReadme>>;
}
