document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && !event.target.closest('#mobileMenuToggle')) {
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Module Details Toggle
    const moduleItems = document.querySelectorAll('.module-item');
    const moduleDetails = document.querySelectorAll('.module-detail');
    const closeModuleButtons = document.querySelectorAll('.close-module');
    
    moduleItems.forEach(item => {
        item.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-module');
            const moduleDetail = document.getElementById(moduleId);
            
            // Close all other modules
            moduleDetails.forEach(detail => {
                if (detail.id !== moduleId) {
                    detail.classList.remove('visible');
                }
            });
            
            moduleItems.forEach(item => {
                if (item.getAttribute('data-module') !== moduleId) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current module
            this.classList.toggle('active');
            moduleDetail.classList.toggle('visible');
            
            // Scroll to the module detail if it's visible
            if (moduleDetail.classList.contains('visible')) {
                setTimeout(() => {
                    moduleDetail.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
    });
    
    closeModuleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moduleDetail = this.closest('.module-detail');
            moduleDetail.classList.remove('visible');
            
            // Find and deactivate the corresponding module item
            const moduleId = moduleDetail.id;
            const moduleItem = document.querySelector(`.module-item[data-module="${moduleId}"]`);
            if (moduleItem) {
                moduleItem.classList.remove('active');
            }
        });
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const answer = otherItem.querySelector('.faq-answer');
                    answer.style.maxHeight = null;
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
    
    // Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            formStatus.innerHTML = '<p style="color: var(--neon-green);">Sending message...</p>';
            
            setTimeout(() => {
                formStatus.innerHTML = '<p style="color: var(--neon-green);">Message sent successfully! We\'ll get back to you soon.</p>';
                contactForm.reset();
            }, 1500);
        });
    }
    
// Access Code Verification
const accessCodeForm = document.getElementById('accessCodeForm');
const accessMessage = document.getElementById('accessMessage');

if (accessCodeForm) {
    accessCodeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const accessCode = document.getElementById('accessCode').value.trim();
        
        accessMessage.innerHTML = '<p style="color: var(--neon-green);">Verifying code...</p>';
        
        setTimeout(() => {
            // Check for the fixed access code
            if (accessCode === '35612') {
                accessMessage.innerHTML = '<p style="color: var(--success-color);">✓ Access granted! Unlocking full course materials...</p>';
                
                // Unlock all locked content
                unlockFullCourse();
                
                // Save unlocked state to localStorage
                localStorage.setItem('courseUnlocked', 'true');
                
            } else {
                accessMessage.innerHTML = '<p style="color: var(--danger-color);">Invalid access code. Please try again or follow our Instagram for the correct code.</p>';
            }
        }, 1500);
    });
}

// Function to unlock all course content
function unlockFullCourse() {
    // Update all locked content sections
    const lockedContent = document.querySelectorAll('.locked-content');
    lockedContent.forEach(content => {
        content.innerHTML = `
            <i class="fas fa-unlock" style="color: var(--success-color);"></i>
            <p style="color: var(--success-color);">Full module content unlocked!</p>
            <a href="https://mega.nz/folder/lm5lgQxT#Qh52YqE0-kwP_-eWohMBbw/folder/R3JykLJD" class="unlock-link" target="_blank">Access Complete Module</a>
        `;
    });
    
    // Add unlock notification
    const unlockContainer = document.querySelector('.unlock-container');
    if (unlockContainer) {
        const notification = document.createElement('div');
        notification.className = 'unlock-notification';
        notification.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h3>Course Successfully Unlocked!</h3>
                <p>You now have full access to all course materials and modules.</p>
                <a href="https://mega.nz/folder/lm5lgQxT#Qh52YqE0-kwP_-eWohMBbw/folder/R3JykLJD" class="access-button" target="_blank">Start Learning Now</a>
            </div>
        `;
        unlockContainer.querySelector('.unlock-content').prepend(notification);
        
        // Scroll to notification
        setTimeout(() => {
            notification.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    }
    
    // Add a class to body to indicate unlocked state
    document.body.classList.add('course-unlocked');
}

// Check if course was previously unlocked (on page load)
function checkUnlockedStatus() {
    if (localStorage.getItem('courseUnlocked') === 'true') {
        unlockFullCourse();
    }
}

// Run unlock status check when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    checkUnlockedStatus();
    
    // Rest of your existing DOMContentLoaded code...
});

    // Interactive Terminal
    const terminalBody = document.getElementById('terminalBody');
    const userInput = document.getElementById('userInput');
    let currentInput = '';
    
    if (terminalBody && userInput) {
        // Simulate typing effect for the initial commands
        setTimeout(() => {
            addTerminalLine('kali@kali:~$', 'ls -la');
            addTerminalResponse(`total 36
drwxr-xr-x 5 kali kali 4096 Nov 5 14:30 .
drwxr-xr-x 3 root root 4096 Oct 20 09:15 ..
-rw------- 1 kali kali  567 Nov 5 14:28 .bash_history
-rw-r--r-- 1 kali kali  220 Oct 20 09:15 .bash_logout
-rw-r--r-- 1 kali kali 3526 Oct 20 09:15 .bashrc
drwxr-xr-x 3 kali kali 4096 Nov 5 13:45 .config
-rw-r--r-- 1 kali kali  807 Oct 20 09:15 .profile
drwxr-xr-x 2 kali kali 4096 Nov 5 13:40 exploit_scripts
drwxr-xr-x 2 kali kali 4096 Nov 5 13:38 recon_results`);
        }, 2000);
        
        // Handle keyboard input
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                processCommand(currentInput);
                currentInput = '';
                updateUserInput();
            } else if (e.key === 'Backspace') {
                currentInput = currentInput.slice(0, -1);
                updateUserInput();
            } else if (e.key.length === 1) {
                currentInput += e.key;
                updateUserInput();
            }
        });
    }
    
    function updateUserInput() {
        if (userInput) {
            userInput.textContent = currentInput + '_';
        }
    }
    
    function processCommand(command) {
        addTerminalLine('kali@kali:~$', command);
        
        // Simple command processing
        if (command === 'help' || command === 'h') {
            addTerminalResponse(`Available commands:
- help: Show this help message
- ls: List files in the current directory
- cd <directory>: Change directory
- cat <file>: View file contents
- whoami: Display current user
- clear: Clear the terminal
- course: Show course information`);
        } else if (command === 'ls') {
            addTerminalResponse(`exploit_scripts  recon_results  course_materials.txt  readme.md`);
        } else if (command === 'whoami') {
            addTerminalResponse('kali');
        } else if (command === 'clear') {
            clearTerminal();
        } else if (command.startsWith('cat ')) {
            const file = command.split(' ')[1];
            if (file === 'course_materials.txt') {
                addTerminalResponse(`LINUX HACKING COURSE MATERIALS
============================
1. Module 1: Linux Fundamentals & Command Line Mastery
2. Module 2: Networking Concepts & Tools
3. Module 3: Reconnaissance Techniques
4. Module 4: Vulnerability Assessment
5. Module 5: Exploitation Fundamentals

To access the full course materials, follow @crackshash_mod on Instagram!`);
            } else if (file === 'readme.md') {
                addTerminalResponse(`# Linux Hacking Course
Welcome to the most comprehensive Linux hacking course available!

## Prerequisites
- Basic computer knowledge
- Willingness to learn

## Getting Started
Follow @crackshash_mod on Instagram to unlock the full course.`);
            } else {
                addTerminalResponse(`cat: ${file}: No such file or directory`);
            }
        } else if (command === 'course') {
            addTerminalResponse(`
█▀▀ █▀█ ▄▀█ █▀▀ █▄▀ █▀ █░█ ▄▀█ █▀ █░█ ▄▄ █▀▄▀█ █▀█ █▀▄
█▄▄ █▀▄ █▀█ █▄▄ █░█ ▄█ █▀█ █▀█ ▄█ █▀█ ░░ █░▀░█ █▄█ █▄▀

Linux Hacking Course: From Basics to Advanced
Follow @crackshash_mod on Instagram to unlock the full course!
`);
        } else {
            addTerminalResponse(`Command not found: ${command}. Type 'help' to see available commands.`);
        }
    }
    
    function addTerminalLine(prompt, command) {
        if (!terminalBody) return;
        
        const line = document.createElement('div');
        line.className = 'line';
        line.innerHTML = `<span class="prompt">${prompt}</span> <span class="command">${command}</span>`;
        
        // Insert before the last line (user input line)
        terminalBody.insertBefore(line, terminalBody.lastElementChild);
        scrollTerminalToBottom();
    }
    
    function addTerminalResponse(text) {
        if (!terminalBody) return;
        
        const response = document.createElement('div');
        response.className = 'response';
        response.innerHTML = text.replace(/\n/g, '<br>');
        
        // Insert before the last line (user input line)
        terminalBody.insertBefore(response, terminalBody.lastElementChild);
        scrollTerminalToBottom();
    }
    
    function clearTerminal() {
        if (!terminalBody) return;
        
        // Keep the user input line and remove all other lines
        while (terminalBody.children.length > 1) {
            terminalBody.removeChild(terminalBody.firstChild);
        }
        scrollTerminalToBottom();
    }
    
    function scrollTerminalToBottom() {
        if (!terminalBody) return;
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    
    // Matrix Rain Effect
    function createMatrixRainEffect() {
        const matrixBackground = document.querySelector('.matrix-background');
        if (!matrixBackground) return;
        
        const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$+=<>(){}[]*/&^%$#@!";
        const numColumns = Math.floor(window.innerWidth / 10);
        
        // Clear any existing elements
        matrixBackground.innerHTML = '';
        
        for (let i = 0; i < numColumns; i++) {
            const drop = document.createElement('div');
            drop.className = 'matrix-code';
            drop.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            drop.style.left = (i * 10) + 'px';
            drop.style.top = (Math.random() * -1000) + 'px';
            drop.style.animationDuration = (Math.random() * 3 + 1) + 's';
            drop.style.animationDelay = (Math.random() * 2) + 's';
            matrixBackground.appendChild(drop);
        }
    }
    
    // Initialize matrix effect
    createMatrixRainEffect();
    
    // Recreate matrix effect on window resize
    window.addEventListener('resize', () => {
        createMatrixRainEffect();
    });
    
    // Skill Bars Animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const skillName = bar.parentNode.parentNode.querySelector('.skill-name').textContent;
            let percent = '0%';
            
            // Set specific percentages based on skill name
            if (skillName.includes('Penetration Testing')) percent = '95%';
            else if (skillName.includes('Linux Administration')) percent = '90%';
            else if (skillName.includes('Exploit Development')) percent = '85%';
            else if (skillName.includes('Network Security')) percent = '92%';
            else {
                // Default to the existing width if skill name doesn't match
                percent = bar.style.width;
            }
            
            // Animate from 0 to the target percentage
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = percent;
            }, 300);
        });
    }
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        if (!el) return false;
        
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0 &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.right >= 0
        );
    }
    
    // Handle scroll animations
    function handleScrollAnimations() {
        // Animate skill bars when about section is in view
        const aboutSection = document.getElementById('about');
        if (aboutSection && isElementInViewport(aboutSection)) {
            animateSkillBars();
        }
        
        // Animate other elements when they come into view
        const animatableElements = document.querySelectorAll('.feature-card, .step, .testimonial');
        animatableElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animated');
            }
        });
    }
    
    // Initial check for elements in viewport
    setTimeout(handleScrollAnimations, 500);
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Add CSS for the animations if not already in the stylesheet
    function addAnimationStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @keyframes matrixRain {
                0% {
                    transform: translateY(-100vh);
                    opacity: 1;
                }
                80% {
                    opacity: 0.5;
                }
                100% {
                    transform: translateY(100vh);
                    opacity: 0;
                }
            }
            
            .matrix-code {
                position: absolute;
                color: var(--neon-green);
                font-family: monospace;
                font-size: 14px;
                text-align: center;
                animation: matrixRain linear infinite;
            }
            
            .animated {
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Add animation styles
    addAnimationStyles();
});
