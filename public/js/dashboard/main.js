import { initSidebar } from './components/sidebar.js';
import { initUploadModal } from '../components/upload/uploadModal.js';
import { FilesContainer } from '../components/files/FilesContainer.js';
import { authService } from '../services/auth/authService.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Check authentication
    if (!authService.isAuthenticated()) {
        window.location.href = '/';
        return;
    }

    // Initialize components
    initSidebar();
    initUploadModal();

    // Initialize files container
    const filesContainer = new FilesContainer('mainContent');
    await filesContainer.initialize();

    // Handle file updates
    window.addEventListener('files-updated', () => {
        filesContainer.initialize();
    });
});