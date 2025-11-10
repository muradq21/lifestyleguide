document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery img');
    const savedDiv = document.getElementById('savedImages');
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popupImg');
    const overlay = document.getElementById('overlay');

    overlay.onclick = () => { popup.style.display = 'none'; overlay.style.display = 'none'; };

    images.forEach(img => {
        img.onclick = () => {
            popupImg.src = img.src;
            popup.style.display = 'block';
            overlay.style.display = 'block';

            if (localStorage.getItem('currentUser')) {
                if (confirm('Save this image to your collection?')) {
                    let users = JSON.parse(localStorage.getItem('users'));
                    const user = users.find(u => u.username === localStorage.getItem('currentUser'));
                    if (!user.savedImages.includes(img.src)) {
                        user.savedImages.push(img.src);
                        localStorage.setItem('users', JSON.stringify(users));
                        loadSaved();
                    }
                }
            }
        };
    });

    function loadSaved() {
        savedDiv.innerHTML = '<strong>Your Saved Images:</strong><br>';
        if (!localStorage.getItem('currentUser')) {
            savedDiv.innerHTML += 'Login to see saved images';
            return;
        }
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.username === localStorage.getItem('currentUser'));
        if (user.savedImages.length === 0) {
            savedDiv.innerHTML += 'No saved images yet';
        } else {
            user.savedImages.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                savedDiv.appendChild(img);
            });
        }
    }

    loadSaved();
});