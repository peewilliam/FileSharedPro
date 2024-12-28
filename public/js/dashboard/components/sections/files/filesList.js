import { createFileCard } from './fileCard.js';

export function renderFilesList(files) {
    return `
        <div class="files-grid">
            ${files.map(file => createFileCard(file)).join('')}
        </div>`;
}