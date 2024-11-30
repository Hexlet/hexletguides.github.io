interface SocialLinks {
  links: string[];
}

interface DisqusConfig {
  ru: string;
  en: string;
}

interface AmpAnalytics {
  metrikaCounterId: string;
  googleTrackingId: string;
}

interface AmpConfig {
  analytics: AmpAnalytics;
}

interface Config {
  siteURL: string;
  title: string;
  email: string;
  timezone: string;
  repositoryUrl: string;
  siteUrl: string;
  tagline: string;
  description: string;
  social: SocialLinks;
  logo: string;
  favicon: string;
  author: string;
  disqus: DisqusConfig;
  amp: AmpConfig;
}

const config: Config = {
  siteURL: 'https://guides.hexlet.io',
  title: 'Hexlet Guides',
  email: 'support@hexlet.io',
  timezone: 'UTC',
  repositoryUrl: 'https://github.com/Hexlet/hexletguides.github.io',
  siteUrl: 'https://guides.hexlet.io',
  tagline: 'Гайды',
  description: 'Полезные статьи и гайды для разработчиков',
  social: {
    links: ['https://www.instagram.com/hexlethq/', 'https://www.facebook.com/Hexlet/', 'https://twitter.com/HexletHQ'],
  },
  logo: '/images/hexlet_logo.png',
  favicon: '/assets/images/favicons/favicon-128.png',
  author: 'Kirill Mokevnin',
  disqus: {
    ru: 'hexlet-guides',
    en: 'hexlet-guides-en',
  },
  amp: {
    analytics: {
      metrikaCounterId: '65474386',
      googleTrackingId: 'UA-1360700-62',
    },
  },
};

export default config;