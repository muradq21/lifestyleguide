document.addEventListener('DOMContentLoaded', () => {
    const navList = document.getElementById('navList');
    const currentUser = localStorage.getItem('currentUser');

    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    if (currentUser) {
        navList.innerHTML = `
            <li><a href="index.html">Home</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="recipes.html">Recipes</a></li>
            <li><a href="sitemap.html">Site Map</a></li>
            <li><a href="#" id="logoutBtn" class="btn btn-danger">Logout (${currentUser})</a></li>
        `;
        document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            alert('Logged out successfully!');
            window.location.href = 'index.html';
        });
    } else {
        navList.innerHTML = `
            <li><a href="index.html">Home</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="recipes.html">Recipes</a></li>
            <li><a href="sitemap.html">Site Map</a></li>
            <li><a href="login.html" class="btn btn-primary">Login</a></li>
            <li><a href="register.html" class="btn btn-primary">Register</a></li>
        `;
    }
});