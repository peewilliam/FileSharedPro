export function getActivityText(activity) {
    switch(activity.type) {
        case 'upload': return `Você fez upload de ${activity.file}`;
        case 'download': return `${activity.file} foi baixado`;
        case 'share': return `Você compartilhou ${activity.file}`;
        case 'favorite': return `Você marcou ${activity.file} como favorito`;
        default: return `Ação em ${activity.file}`;
    }
}