import { getActivityIcon } from '../../../../utils/iconUtils.js';
import { getActivityText } from '../../../../utils/textUtils.js';

export function renderActivity(activities) {
    return `
        <div class="content-card">
            <h5 class="card-title">Atividade Recente</h5>
            <div class="activity-timeline">
                ${activities.map(activity => `
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="bi bi-${getActivityIcon(activity.type)}"></i>
                        </div>
                        <div class="activity-content">
                            <p class="mb-1">
                                <strong>${getActivityText(activity)}</strong>
                            </p>
                            <small class="text-secondary">${activity.time}</small>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>`;
}