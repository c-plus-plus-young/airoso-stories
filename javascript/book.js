const bookContent = document.getElementById('book-content');

function getBookIdFromQuery() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('book')) {
        return params.get('book');
    }

    const queryKeys = Array.from(params.keys());
    const rawValue = queryKeys.length ? queryKeys[0] : null;

    if (!rawValue) {
        return null;
    }

    return rawValue;
}

function resolveImagePath(path) {
    if (!path) {
        return '';
    }

    return path.startsWith('../') || path.startsWith('/') || path.startsWith('http')
        ? path
        : `../${path}`;
}

if (bookContent) {
    const bookId = getBookIdFromQuery();

    fetch('../assets/json/books.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load book: ${response.status}`);
            }
            return response.json();
        })
        .then((books) => {
            const book = bookId
                ? Object.entries(books).find(([id, item]) => id === bookId || (item.query || item.name) === bookId)?.[1]
                : null;

            if (!book) {
                bookContent.innerHTML = '<p class="book-empty">Book not found.</p>';
                return;
            }

            bookContent.innerHTML = `
                <article class="book-detail">
                    <img src="${resolveImagePath(book['cover-art'])}" alt="${book.name} cover" class="book-detail-image">
                    <div class="book-detail-copy">
                        <h1>${book.name}<span class="release-date"> - <em>Release Date ${book['release-date']}</em></span></h1>
                        <p>${book.blurb}</p>
                    </div>
                </article>
            `;
        })
        .catch((error) => {
            console.error(error);
            bookContent.innerHTML = '<p class="book-empty">Unable to load book right now.</p>';
        });
}
