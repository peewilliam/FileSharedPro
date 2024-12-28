// Sample data store
export const sampleData = {
  files: [
    {
      id: '1',
      name: 'Relatório Mensal.pdf',
      size: 3.2 * 1024 * 1024,
      type: 'application/pdf',
      downloads: 28,
      code: 'ABC123',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      name: 'Imagens Projeto.zip',
      size: 15.7 * 1024 * 1024,
      type: 'application/zip',
      downloads: 12,
      code: 'XYZ789',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
};