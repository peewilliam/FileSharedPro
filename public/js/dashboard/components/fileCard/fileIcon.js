export function FileIcon({ type }) {
    const getIconClass = (type) => {
        if (type.includes('image')) return 'image';
        if (type.includes('pdf')) return 'pdf';
        if (type.includes('word')) return 'word';
        if (type.includes('excel')) return 'excel';
        return 'file';
    };

    const getIcon = (type) => {
        if (type.includes('image')) return 'bi-file-image';
        if (type.includes('pdf')) return 'bi-file-pdf';
        if (type.includes('word')) return 'bi-file-word';
        if (type.includes('excel')) return 'bi-file-excel';
        return 'bi-file-earmark';
    };

    return `
        <div class="file-icon ${getIconClass(type)}">
            <i class="bi ${getIcon(type)}"></i>
        </div>
    `;
}