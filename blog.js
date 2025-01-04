// Function to show a specific page
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.style.display = 'block';
    }
}

// Function to show the Home page
function showHomePage() {
    showPage('home-page');
    loadBlogs(); // Load blog posts dynamically
}

// Function to show the Sign Up page
function showSignUpPage() {
    showPage('signup-page');
}

// Function to show the Login page
function showLoginPage() {
    showPage('login-page');
}

// Function to show the Profile page
function showProfilePage() {
    showPage('profile-page');
    loadUserBlogs(); // Load the user's blog posts
}

// Dummy data for blogs
const blogs = [
    { title: "First Blog Post", content: "This is the content of the first blog post." },
    { title: "Second Blog Post", content: "Content for the second blog post goes here." }
];

// Function to load blogs on the homepage
function loadBlogs() {
    const blogList = document.getElementById('blog-list');
    blogList.innerHTML = ''; // Clear the previous content

    blogs.forEach(blog => {
        const blogItem = document.createElement('div');
        blogItem.classList.add('blog-item');
        blogItem.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
        `;
        blogList.appendChild(blogItem);
    });
}

// Function to create new blog
function createNewBlog() {
    const title = prompt('Enter blog title');
    const content = prompt('Enter blog content');
    blogs.push({ title, content });
    loadBlogs(); // Reload blog list
}

// Handle the Sign Up form submission
document.getElementById('signup-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (localStorage.getItem(username)) {
        alert('Username already exists!');
    } else {
        localStorage.setItem(username, password);
        alert('Account created successfully!');
        showLoginPage();
    }
});

// Handle the Login form submission
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (localStorage.getItem(username) === password) {
        localStorage.setItem('loggedInUser', username);
        showProfilePage();
    } else {
        alert('Invalid credentials!');
    }
});

// Load the logged-in user's blogs
function loadUserBlogs() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const userBlogs = blogs.filter(blog => blog.author === loggedInUser);
        const userBlogsContainer = document.getElementById('user-blogs');
        userBlogsContainer.innerHTML = ''; // Clear the previous content
        userBlogs.forEach(blog => {
            const blogItem = document.createElement('div');
            blogItem.classList.add('blog-item');
            blogItem.innerHTML = `
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>
            `;
            userBlogsContainer.appendChild(blogItem);
        });
    } else {
        alert('You need to login first.');
    }
}

// Show the home page by default
showHomePage();
