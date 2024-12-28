export class SampleDataService {
    generateSampleFiles() {
        const files = [
            {
                id: 1,
                name: 'Relatório Mensal.pdf',
                size: 3.2 * 1024 * 1024,
                type: 'pdf',
                downloads: 28,
                shared: true,
                code: 'ABC123',
                lastAction: {
                    type: 'download',
                    date: new Date(Date.now() - 25 * 60 * 1000)
                }
            },
            {
                id: 2,
                name: 'Imagens Projeto.zip',
                size: 15.7 * 1024 * 1024,
                type: 'archive',
                downloads: 12,
                shared: true,
                code: 'XYZ789',
                lastAction: {
                    type: 'share',
                    date: new Date(Date.now() - 2 * 60 * 60 * 1000)
                }
            },
            {
                id: 3,
                name: 'Planilha Dados.xlsx',
                size: 1.8 * 1024 * 1024,
                type: 'excel',
                downloads: 45,
                shared: false,
                code: 'DEF456',
                lastAction: {
                    type: 'upload',
                    date: new Date()
                }
            }
        ];

        localStorage.setItem('files', JSON.stringify(files));
        return files;
    }

    generateSampleActivities() {
        const activities = [
            {
                type: 'upload',
                file: 'Planilha Dados.xlsx',
                time: 'Agora mesmo'
            },
            {
                type: 'share',
                file: 'Imagens Projeto.zip',
                time: '2 horas atrás'
            },
            {
                type: 'download',
                file: 'Relatório Mensal.pdf',
                time: '25 minutos atrás'
            }
        ];

        localStorage.setItem('activities', JSON.stringify(activities));
        return activities;
    }

    initializeSampleData() {
        if (!localStorage.getItem('files')) {
            this.generateSampleFiles();
            this.generateSampleActivities();
        }
    }
}

export const sampleDataService = new SampleDataService();