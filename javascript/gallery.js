import { JustifiedGallery } from 'https://cdn.jsdelivr.net/npm/justified-gallery@4.0.2/+esm';

const galleryGrid = document.getElementById('gallery-grid');
let lightboxInitialized = false;

function resolveImagePath(path) {
    if (!path) {
        return '';
    }

    return path.startsWith('../') || path.startsWith('/') || path.startsWith('http')
        ? path
        : `../${path}`;
}

function createGalleryLink(id, item) {
    const title = item.name || id;
    const imagePath = resolveImagePath(item['cover-art']);
    const link = document.createElement('a');
    const image = document.createElement('img');

    link.className = 'gallery-link';
    link.href = imagePath;
    link.dataset.title = title;
    link.dataset.description = item.blurb || '';
    link.setAttribute('aria-label', `Open ${title}`);

    image.src = imagePath;
    image.alt = title;
    image.loading = 'lazy';

    link.appendChild(image);
    return link;
}

function initializeLightbox() {
    if (lightboxInitialized) {
        return;
    }

    if (typeof window.GLightbox !== 'function') {
        window.addEventListener('load', initializeLightbox, { once: true });
        return;
    }

    window.GLightbox({
        selector: '.gallery-link',
        descPosition: 'right'
    });
    lightboxInitialized = true;
}

function initializeJustifiedGallery() {
    const justifiedGallery = new JustifiedGallery(galleryGrid, {
        rowHeight: 480,
        margins: 16
    });
    justifiedGallery.init();
}

if (galleryGrid) {
    fetch('../assets/json/gallery.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load gallery: ${response.status}`);
            }
            return response.json();
        })
        .then((gallery) => {
            const entries = Object.entries(gallery);

            if (!entries.length) {
                galleryGrid.innerHTML = '<p class="gallery-empty">No gallery images available yet.</p>';
                return;
            }

            entries.forEach(([id, item]) => {
                galleryGrid.appendChild(createGalleryLink(id, item));
            });

            initializeJustifiedGallery();
            initializeLightbox();
        })
        .catch((error) => {
            console.error(error);
            galleryGrid.innerHTML = '<p class="gallery-empty">Unable to load the gallery right now.</p>';
        });
}
