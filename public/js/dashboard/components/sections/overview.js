import { renderStats } from './overview/stats.js';
import { renderStorage } from './overview/storage.js';
import { renderActivity } from './overview/activity.js';
import { renderPopularFiles } from './overview/popularFiles.js';
import { statsService } from '../../../services/statsService.js';

export async function renderOverviewSection() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    // Initial render with loading state
    mainContent.innerHTML = `
        <div class="section-header">
            <h4>Visão Geral</h4>
            <p class="text-secondary">Resumo da sua conta e atividades</p>
        </div>
        <div class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Carregando...</span>
            </div>
        </div>
    `;

    try {
        // Fetch all data concurrently
        const [stats, activities, popularFiles] = await Promise.all([
            statsService.getStats(),
            statsService.getRecentActivity(),
            statsService.getPopularFiles()
        ]);

        // Render complete section
        mainContent.innerHTML = `
            <div class="section-header">
                <h4>Visão Geral</h4>
                <p class="text-secondary">Resumo da sua conta e atividades</p>
            </div>
            
            ${renderStats(stats)}
            ${renderStorage(stats.storageUsed, stats.storageLimit)}

            <div class="row g-4">
                <div class="col-md-8">
                    ${renderActivity(activities)}
                </div>
                <div class="col-md-4">
                    ${renderPopularFiles(popularFiles)}
                </div>
            </div>
        `;

        // Subscribe to updates
        const unsubscribe = statsService.subscribe(async () => {
            const updatedStats = await statsService.getStats();
            const updatedActivities = await statsService.getRecentActivity();
            const updatedPopularFiles = await statsService.getPopularFiles();

            document.querySelector('.stats-container').innerHTML = renderStats(updatedStats);
            document.querySelector('.storage-container').innerHTML = renderStorage(updatedStats.storageUsed, updatedStats.storageLimit);
            document.querySelector('.activity-container').innerHTML = renderActivity(updatedActivities);
            document.querySelector('.popular-files-container').innerHTML = renderPopularFiles(updatedPopularFiles);
        });

        // Cleanup subscription when section changes
        window.addEventListener('section-change', unsubscribe, { once: true });

    } catch (error) {
        mainContent.innerHTML = `
            <div class="alert alert-danger">
                <i class="bi bi-exclamation-triangle me-2"></i>
                Erro ao carregar dados. Por favor, tente novamente.
            </div>
        `;
    }
}