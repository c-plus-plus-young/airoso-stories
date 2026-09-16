const galleryGrid = document.getElementById('gallery-grid');

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
                const galleryItem = document.createElement('article');
                const tile = document.createElement('button');
                const imagePath = item['cover-art'] || '';
                const title = item.name || id;

                galleryItem.className = 'gallery-item';
                tile.className = 'gallery-tile';
                tile.type = 'button';
                tile.setAttribute('aria-label', `Show details for ${title}`);

                const image = document.createElement('img');
                image.src = imagePath.startsWith('../') || imagePath.startsWith('/')
                    ? imagePath
                    : `../${imagePath}`;
                image.alt = title;
                image.loading = 'lazy';

                const titleElement = document.createElement('span');
                titleElement.className = 'gallery-title';
                titleElement.textContent = title;

                tile.append(image, titleElement);
                tile.addEventListener('click', () => showDetails(galleryItem, title, item.blurb || ''));
                galleryItem.appendChild(tile);
                galleryGrid.appendChild(galleryItem);
            });
        })
        .catch((error) => {
            console.error(error);
            galleryGrid.innerHTML = '<p class="gallery-empty">Unable to load the gallery right now.</p>';
        });
}

function showDetails(galleryItem, title, blurb) {
    closeDetails();

    const detail = document.createElement('aside');
    const closeButton = document.createElement('button');
    const heading = document.createElement('h2');
    const description = document.createElement('p');

    detail.className = 'gallery-detail';
    detail.dataset.galleryDetail = 'true';
    detail.setAttribute('aria-live', 'polite');

    closeButton.className = 'gallery-close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', `Close details for ${title}`);
    closeButton.textContent = 'x';
    closeButton.addEventListener('click', closeDetails);

    heading.textContent = title;
    description.textContent = blurb;
    detail.append(closeButton, heading, description);
    galleryItem.classList.add('is-expanded');
    galleryItem.appendChild(detail);
}

function closeDetails() {
    const detail = galleryGrid?.querySelector('[data-gallery-detail="true"]');
    detail?.remove();
    galleryGrid?.querySelector('.is-expanded')?.classList.remove('is-expanded');
}
