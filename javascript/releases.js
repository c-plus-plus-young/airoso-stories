const bookGrid = document.getElementById('book-grid');

if (bookGrid) {
    fetch('../assets/json/books.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load books: ${response.status}`);
            }
            return response.json();
        })
        .then((books) => {
            const entries = Object.entries(books);

            if (!entries.length) {
                bookGrid.innerHTML = '<p class="book-empty">No books available yet.</p>';
                return;
            }

            if (entries.length === 1) {
                bookGrid.classList.add('single-book');
            }

            entries.forEach(([id, book]) => {
                const card = document.createElement('a');
                card.className = 'book-card';
                card.href = `books/${book.url || `${id}.html`}`;
                card.setAttribute('aria-label', `Open ${book.name}`);

                const image = document.createElement('img');
                const imagePath = book['cover-art'] || '';
                image.src = imagePath.startsWith('../') || imagePath.startsWith('/')
                    ? imagePath
                    : `../${imagePath}`;
                image.alt = `${book.name} cover`;
                image.loading = 'lazy';

                const title = document.createElement('span');
                title.className = 'book-title';
                title.textContent = book.name;

                card.appendChild(image);
                card.appendChild(title);
                bookGrid.appendChild(card);
            });
        })
        .catch((error) => {
            console.error(error);
            bookGrid.innerHTML = '<p class="book-empty">Unable to load books right now.</p>';
        });
}
