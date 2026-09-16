const pageRoot = window.location.pathname.includes('/pages/') ? '../' : './';

const sharedStyles = `
    body {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    #navbar {
        background-color: #1C1C1C;
        color: #FFFFFF;
        display: flex;
        min-height: 12vh;
        font-size: 4vh;
        justify-content: space-around;
        align-items: center;
        border: none;
        margin: 0;
        width: 100vw;
        box-sizing: border-box;
    }

    #navbar a {
        color: #FFFFFF;
        text-decoration: none;
    }

    #footer {
        background-color: #1C1C1C;
        color: #FFFFFF;
        display: flex;
        min-height: 6vh;
        font-size: 2vh;
        justify-content: space-around;
        align-items: center;
        border: none;
        margin: auto 0 0;
        width: 100vw;
        box-sizing: border-box;
        flex-shrink: 0;
    }

    #footer a {
        color: #FFFFFF;
        text-decoration: none;
    }

    .instagram-link {
        display: inline-flex;
        align-items: center;
        gap: 0.35em;
    }

    .instagram-link img {
        width: 1em;
        height: 1em;
        margin: 0;
    }
`;

const header = `
    <header id="navbar">
        <a href="${pageRoot}index.html">Home</a>
        <a href="${pageRoot}pages/about.html">About</a>
        <a href="${pageRoot}pages/gallery.html">Gallery</a>
        <a href="${pageRoot}pages/book.html">Upcoming Release</a>
        <a href="${pageRoot}pages/contact.html">Contact Us</a>
    </header>
`;

const footer = `
    <footer id="footer">
        <p>&copy; 2023 Airoso Stories. All rights reserved.</p>
        <p><a class="instagram-link" href="https://www.instagram.com/airosostories/" target="_blank" rel="noopener noreferrer"><img src="${pageRoot}assets/images/insta-white.png" alt="">Follow us on Instagram</a></p>
        <p><a href="https://github.com/c-plus-plus-young/">Developed by c-plus-plus-young</a></p>
    </footer>
`;

const layoutStyle = document.createElement('style');
layoutStyle.textContent = sharedStyles;
document.head.appendChild(layoutStyle);
document.body.insertAdjacentHTML('afterbegin', header);
document.body.insertAdjacentHTML('beforeend', footer);