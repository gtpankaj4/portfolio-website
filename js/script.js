/*   Typing  Animation  */
var typed = new Typed(".typing", {
  strings: [
    "",
    "Web Designer",
    "Graphics Editor",
    "Computer Science Student",
    "Tech Explorer",
    "Volunteer & Mentor"
  ],
  typeSpeed: 100,
  backSpeed: 60,
  backDelay: 1000,
  startDelay: 1000,
  loop: true,
  showCursor: true,
  cursorChar: '|'
});

/*   Aside   */
const nav = document.querySelector(".nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSection = document.querySelectorAll(".section"),
  totalSection = allSection.length;
for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", function () {
    removeBackSection();
    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {
        addBackSection(j);
        //allSection[j].classList.add("back-section");
      }
      navList[j].querySelector("a").classList.remove("active");
    }
    this.classList.add("active");
    showSection(this);
    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  });
}
function removeBackSection() {
  for (let i = 0; i < totalNavList; i++) {
    allSection[i].classList.remove("back-section");
  }
}
function addBackSection(num) {
  allSection[num].classList.add("back-section");
}
function showSection(element) {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active");
  }
  const target = element.getAttribute("href").split("#")[1];
  document.querySelector("#" + target).classList.add("active");
}
function updateNav(element) {
  for (let i = 0; i < totalNavList; i++) {
    navList[i].querySelector("a").classList.remove("active");
    const target = element.getAttribute("href").split("#")[1];
    if (
      target ===
      navList[i].querySelector("a").getAttribute("href").split("#")[1]
    ) {
      navList[i].querySelector("a").classList.add("active");
    }
  }
}
document.querySelector(".hire-me").addEventListener("click", function () {
  const sectionIndex = this.getAttribute("data-section-index");
  //console.log(sectionIndex);
  showSection(this);
  updateNav(this);
  removeBackSection();
  addBackSection(sectionIndex);
});
const navTogglerBtn = document.querySelector(".nav-toggler"),
  aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
  asideSectionTogglerBtn();
});
function asideSectionTogglerBtn() {
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.toggle("open");
  }
}

// Contact Form Status Handler
document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const message = urlParams.get('message');
    
    // Check for Formspree success/error parameters
    if (window.location.search.includes('success=true')) {
        showNotification('Message sent successfully! I will get back to you soon.', 'success');
    } else if (window.location.search.includes('error=true')) {
        showNotification('There was an error sending your message. Please try again.', 'error');
    } else if (status === 'success') {
        showNotification('Message sent successfully! I will get back to you soon.', 'success');
    } else if (status === 'error') {
        const errorMsg = message || 'There was an error sending your message. Please try again.';
        showNotification(errorMsg, 'error');
    }
    
    // Add form submission handler for better UX
    const contactForm = document.querySelector('form[action*="formspree.io"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(this);
            
            // Submit form using fetch
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success
                    showNotification('Message sent successfully! I will get back to you soon.', 'success');
                    this.reset(); // Clear the form
                } else {
                    // Error
                    showNotification('There was an error sending your message. Please try again.', 'error');
                }
            })
            .catch(error => {
                // Network error
                showNotification('There was an error sending your message. Please try again.', 'error');
                console.error('Error:', error);
            })
            .finally(() => {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
    } else {
        notification.style.backgroundColor = '#f44336';
    }
    
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Blog SPA logic from scratch (dynamic, all blogs)

document.addEventListener('DOMContentLoaded', function() {
    const blogList = document.getElementById('blog-list');
    const blogArticleView = document.getElementById('blog-article-view');
    const backBtn = document.getElementById('back-to-blog-list');
    const blogArticleContent = document.getElementById('blog-article-content');
    const blogListHeading = document.getElementById('blog-list-heading');

    // All blog articles as objects (full text, subheadings use .blog-article-subheading)
    const blogs = {
        'blog-1': {
            title: 'The Threats of AI and Neuralink - Should We Be Worried?',
            meta: 'April 10, 2024 • by Pankaj Bhatta',
            date: '2024-04-10',
            img: 'bloghtml/images/ai1.jpeg',
            imgAlt: 'AI Blog',
            content: `
                <p class="blog-article-text">Man, AI has been around since like forever, like since the 1950s! And now, it's everywhere - in healthcare, finance, you name it. But hey, it's not all rainbows and butterflies. There are some serious threats lurking around.</p>
                <h4 class="blog-article-subheading">What are the threats?</h4>
                <ul>
                    <li><strong>Job Loss:</strong> Automation could replace many jobs.</li>
                    <li><strong>Bias:</strong> AI can inherit human biases and make unfair decisions.</li>
                    <li><strong>Privacy:</strong> AI can be used to track and analyze people's behavior.</li>
                    <li><strong>Superintelligence:</strong> If AI surpasses human intelligence, it could become uncontrollable.</li>
                </ul>
                <h4 class="blog-article-subheading">Should we be worried?</h4>
                <p class="blog-article-text">It's important to be cautious and responsible with AI development. With the right regulations and ethical guidelines, we can harness AI's power for good while minimizing risks.</p>
            `
        },
        'blog-2': {
            title: 'What is the current situation of Nepal - Air Pollution?',
            meta: 'April 11, 2024 • by Pankaj Bhatta',
            date: '2024-04-11',
            img: 'bloghtml/images/nepal1.jpg',
            imgAlt: 'Nepal Air Pollution',
            content: `
                <p class="blog-article-text">Lately, the air in Nepal has been really dirty. You know how sometimes you can see smoke in the air? Well, it's kind of like that, but everywhere. This dirty air is called air pollution. The sky looks hazy, and sometimes it even smells bad. People are starting to wear masks, not just for COVID, but to protect themselves from the pollution.</p>
                <h4 class="blog-article-subheading">Why is it so bad?</h4>
                <ul>
                    <li>Lots of vehicles and factories are releasing smoke.</li>
                    <li>People burn trash and leaves, adding to the pollution.</li>
                    <li>There's not enough greenery to clean the air.</li>
                </ul>
                <h4 class="blog-article-subheading">What are the effects?</h4>
                <p class="blog-article-text">People are coughing more, and those with asthma or breathing problems are having a tough time. Even healthy people feel tired and get headaches from the bad air.</p>
                <h4 class="blog-article-subheading">What can we do?</h4>
                <ul>
                    <li>Use public transport or walk when possible.</li>
                    <li>Plant more trees.</li>
                    <li>Spread awareness about the dangers of air pollution.</li>
                </ul>
                <p class="blog-article-text">Let's all do our part to make Nepal's air cleaner and safer!</p>
            `
        },
        'blog-3': {
            title: 'Latest Visiting Places in Kathmandu Valley of Nepal',
            meta: 'April 12, 2024 • by Pankaj Bhatta',
            date: '2024-04-12',
            img: 'bloghtml/images/ktm1.jpg',
            imgAlt: 'Kathmandu',
            content: `
                <p class="blog-article-text">Kathmandu Valley has always been a hub for tourists and travelers alike. Known for its rich cultural heritage, ancient temples, and bustling marketplaces, the valley is a must-visit destination for anyone looking to immerse themselves in the unique blend of history and modernity that defines Nepal.</p>
                <h4 class="blog-article-subheading">Top Places to Visit</h4>
                <ul>
                    <li><strong>Pashupatinath Temple:</strong> A sacred Hindu temple complex.</li>
                    <li><strong>Boudhanath Stupa:</strong> One of the largest stupas in the world.</li>
                    <li><strong>Patan Durbar Square:</strong> A UNESCO World Heritage Site with stunning architecture.</li>
                    <li><strong>Thamel:</strong> The tourist hotspot for shopping and nightlife.</li>
                </ul>
                <h4 class="blog-article-subheading">Why visit Kathmandu?</h4>
                <p class="blog-article-text">Whether you're a history buff, foodie, or adventurer, Kathmandu has something for everyone! The food is amazing, the people are friendly, and every street has a story to tell. Don't forget to try momos and Newari cuisine while you're here!</p>
            `
        },
        'blog-4': {
            title: 'Building the Web: From Brainstorm to Browsers!',
            meta: 'April 30, 2024 • by Pankaj Bhatta',
            date: '2024-04-30',
            img: 'bloghtml/images/web-dev1.jpg',
            imgAlt: 'Web Dev',
            content: `
                <p class="blog-article-text">Web development is more than just writing code—it's about building experiences, solving real-world problems, and bringing your creative ideas to life. Whether you're designing a personal portfolio, launching a business, or just tinkering for fun, web development gives you the power to shape the digital world.</p>
                <h4 class="blog-article-subheading">Why is it awesome?</h4>
                <ul>
                    <li><strong>Creativity:</strong> You can design and build anything you imagine.</li>
                    <li><strong>Impact:</strong> Your work can reach people all over the world.</li>
                    <li><strong>Continuous Learning:</strong> The web is always evolving, so there's always something new to discover.</li>
                    <li><strong>Career Opportunities:</strong> Developers are in high demand everywhere.</li>
                </ul>
                <h4 class="blog-article-subheading">How to Get Started?</h4>
                <ul>
                    <li>Learn HTML, CSS, and JavaScript basics.</li>
                    <li>Build small projects to practice.</li>
                    <li>Explore frameworks like React or Vue.</li>
                    <li>Keep experimenting and never stop learning!</li>
                </ul>
                <p class="blog-article-text">Web development is a journey—enjoy every step!</p>
            `
        },
        'blog-5': {
            title: 'On The Food I Rely',
            meta: 'July 5, 2024 • by Pankaj Bhatta',
            date: '2024-07-05',
            img: 'bloghtml/images/bird1.jpg',
            imgAlt: 'Poem Bird',
            content: `
                <p class="blog-article-text">
A Bird, me, fly no fear <br>
Rules? What is that I hear <br>
Far from the evils I fly <br>
On the food is what I rely<br><br>
Traveling, I see the world <br>
Not know what's money and gold <br>
Far from the cruelty I fly <br>
On the food is what I rely <br><br>
My aim is to live and feed <br>
Not destroy nature like human did <br>
Far from the destruction I fly <br>
On the food is what I rely <br><br>
Live until I satisfied <br>
Poor humans, life so mystified <br>
Far from the sadness I fly <br>
On the food is what I rely <br><br>
No anxiety No depression No Tension <br>
Home, money & jewelery they mention <br>
Far from the class division I fly <br>
On the food is what I rely <br><br>
                </p>
                <h4 class="blog-article-subheading">Poem Reflection</h4>
                <p class="blog-article-text">This poem is about freedom, survival, and the simple joys of life. Sometimes, we just need to fly away from our worries and trust that we'll find what we need.</p>
            `
        }
    };

    // Sort blog previews by date (newest first)
    const sortedBlogIds = Object.keys(blogs).sort((a, b) => new Date(blogs[b].date) - new Date(blogs[a].date));
    // Render blog previews in sorted order
    if (blogList) {
        blogList.innerHTML = sortedBlogIds.map(blogId => `
            <div class="blog-preview padd-15" data-blog="${blogId}">
                <img src="${blogs[blogId].img}" alt="${blogs[blogId].imgAlt}">
                <div class="blog-preview-content">
                    <h4 class="blog-article-title">${blogs[blogId].title}</h4>
                    <div class="blog-article-meta">${blogs[blogId].meta}</div>
                    <div class="blog-preview-excerpt">${stripHtml(blogs[blogId].content).slice(0, 120)}...</div>
                </div>
            </div>
        `).join('');
    }

    // Show article on blog preview click
    blogList.addEventListener('click', function(e) {
        const preview = e.target.closest('.blog-preview');
        if (preview) {
            const blogId = preview.getAttribute('data-blog');
            if (blogs[blogId]) {
                // Add class to all <ul> in content for color
                const contentWithListClass = blogs[blogId].content.replace(/<ul>/g, '<ul class="blog-article-list">');
                blogArticleContent.innerHTML = `
                    <h2 class="blog-article-title">${blogs[blogId].title}</h2>
                    <div class="blog-article-meta">${blogs[blogId].meta}</div>
                    <img src="${blogs[blogId].img}" alt="${blogs[blogId].imgAlt}" style="width:100%;max-width:400px;display:block;margin:0 auto 1.5rem auto;border-radius:8px;">
                    <div>${contentWithListClass}</div>
                `;
                blogList.style.display = 'none';
                blogArticleView.style.display = '';
                if (blogListHeading) blogListHeading.style.display = 'none';
                window.scrollTo({top: 0, behavior: 'smooth'});
            }
        }
    });
    // Back to blog list
    backBtn.addEventListener('click', function() {
        blogArticleView.style.display = 'none';
        blogList.style.display = '';
        if (blogListHeading) blogListHeading.style.display = '';
        blogList.scrollIntoView({behavior: 'smooth'});
    });

    // Helper to strip HTML tags for preview
    function stripHtml(html) {
        let div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }
});
