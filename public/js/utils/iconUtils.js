export function getActivityIcon(type) {
    switch(type) {
        case 'upload': return 'cloud-upload';
        case 'download': return 'download';
        case 'share': return 'share';
        case 'favorite': return 'star';
        default: return 'circle';
    }
}

export function getFileIconClass(filename) {
    if (filename.endsWith('.pdf')) return 'pdf';
    if (filename.endsWith('.doc') || filename.endsWith('.docx')) return 'word';
    if (filename.endsWith('.xls') || filename.endsWith('.xlsx')) return 'excel';
    if (filename.endsWith('.mp4') || filename.endsWith('.avi')) return 'video';
    return 'file';
}

export function getFileIcon(filename) {
    if (filename.endsWith('.pdf')) return 'file-pdf';
    if (filename.endsWith('.doc') || filename.endsWith('.docx')) return 'file-word';
    if (filename.endsWith('.xls') || filename.endsWith('.xlsx')) return 'file-excel';
    if (filename.endsWith('.mp4') || filename.endsWith('.avi')) return 'file-play';
    return 'file-earmark';
}