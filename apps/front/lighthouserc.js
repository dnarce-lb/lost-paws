const baseURL = 'http://localhost:3000';

module.exports = {
  ci: {
    collect: {
      settings: { chromeFlags: '--no-sandbox' },
      startServerCommand: 'yarn start',
      startServerReadyPattern: 'Ready in',
      url: [baseURL],
      numberOfRuns: 1,
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:best-seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    server: {},
  },
};
