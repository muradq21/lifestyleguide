document.addEventListener('DOMContentLoaded', () => {
    const dailyDiv = document.getElementById('dailyRecipe');
    const form = document.getElementById('recipeForm');
    const savedDiv = document.getElementById('savedRecipes');

    const recipes = [
        "Monday Magic: Fluffy Pancakes – Mix & flip!",
        "Tuesday Treat: Fresh Greek Salad",
        "Wednesday Wonder: Creamy Pasta Carbonara",
        "Thursday Thrill: Spicy Thai Curry",
        "Friday Feast: Homemade Pizza Night",
        "Saturday Special: BBQ Ribs",
        "Sunday Sweet: Chocolate Lava Cake"
    ];

    const today = new Date().getDay();
    dailyDiv.innerHTML = `<h3>${recipes[today === 0 ? 6 : today - 1]}</h3>`;

    function checkLogin() {
        if (localStorage.getItem('currentUser')) {
            form.style.display = 'block';
            loadSaved();
        } else {
            form.style.display = 'none';
            savedDiv.innerHTML = '<p>Login to post and see your recipes</p>';
        }
    }

    form?.addEventListener('submit', e => {
        e.preventDefault();
        const title = document.getElementById('recipeTitle').value.trim();
        const desc = document.getElementById('recipeDesc').value.trim();
        if (!title || !desc) return alert('Fill all fields');

        let users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.username === localStorage.getItem('currentUser'));
        user.savedRecipes.push({ title, desc });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Recipe posted!');
        form.reset();
        loadSaved();
    });

    function loadSaved() {
        savedDiv.innerHTML = '';
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.username === localStorage.getItem('currentUser'));
        if (!user || user.savedRecipes.length === 0) {
            savedDiv.innerHTML = '<p>No recipes posted yet</p>';
            return;
        }
        user.savedRecipes.forEach(r => {
            const div = document.createElement('div');
            div.className = 'recipe';
            div.innerHTML = `<h3>${r.title}</h3><p>${r.desc}</p>`;
            savedDiv.appendChild(div);
        });
    }

    checkLogin();
});