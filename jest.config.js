module.exports = {
  testEnvironment: "jsdom", // Define o ambiente de testes como um navegador simulado
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest", // Usa o Babel para transformar os arquivos JS/TS
  },
  moduleFileExtensions: ["ts", "tsx", "json"], // Extensões de arquivos suportadas
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Arquivo de configuração adicional após o ambiente de testes ser configurado
  collectCoverage: true, // Ativa a coleta de cobertura de testes
  collectCoverageFrom: ["src/**/*.{ts,tsx}"], // Define os arquivos para cobertura
  coverageDirectory: "coverage", // Diretório onde os relatórios de cobertura serão salvos
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy", // Mapeia arquivos de estilo para evitar erros
    "^@/(.*)$": "<rootDir>/src/$1", // Atalho para importações dentro da pasta src
  },
  testMatch: ["**/__tests__/**/*.test.(js|jsx|ts|tsx)"], // Define o padrão de nomes de arquivos de teste
};