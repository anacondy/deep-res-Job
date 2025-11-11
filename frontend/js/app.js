// Deep Research Job Portal - Main Application
class JobSearchApp {
    constructor() {
        this.jobCount = 0;
        this.searchBtn = document.getElementById('search-btn');
        this.jobQueryInput = document.getElementById('job-query');
        this.locationInput = document.getElementById('location');
        this.statusDisplay = document.getElementById('status-display');
        this.resultsContainer = document.getElementById('results-container');
        this.jobCountDisplay = document.getElementById('job-count');
        
        this.init();
    }

    init() {
        // Add event listeners
        this.searchBtn.addEventListener('click', () => this.performSearch());
        
        // Add Enter key support
        this.jobQueryInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });
        
        this.locationInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });

        // Initialize job count
        this.updateJobCount();

        // Add typing effect to status
        this.typeStatusMessage('SYSTEM STATUS: READY', 'status-ready');
    }

    async performSearch() {
        const query = this.jobQueryInput.value.trim();
        const location = this.locationInput.value.trim();

        if (!query) {
            this.showError('ERROR: PLEASE ENTER A JOB SEARCH QUERY');
            return;
        }

        // Update status
        this.updateStatus('SEARCHING...', 'status-searching');
        this.searchBtn.disabled = true;
        this.searchBtn.innerHTML = '<span class="loading"></span>';

        try {
            // Simulate API call delay
            await this.delay(1500);

            // Generate mock results (in production, this would call the backend API)
            const results = this.generateMockResults(query, location);

            // Display results
            this.displayResults(results);

            // Update status
            this.updateStatus(`SEARCH COMPLETE - ${results.length} JOBS FOUND`, 'status-complete');
            
            // Update job count
            this.jobCount += results.length;
            this.updateJobCount();

        } catch (error) {
            this.showError('ERROR: SEARCH FAILED - ' + error.message);
            this.updateStatus('SYSTEM STATUS: ERROR', 'status-ready');
        } finally {
            this.searchBtn.disabled = false;
            this.searchBtn.innerHTML = '<span class="button-text">[ INITIATE DEEP SEARCH ]</span>';
        }
    }

    generateMockResults(query, location) {
        // Mock job data (in production, this would come from backend API with Gemini integration)
        const mockJobs = [
            {
                title: `Senior ${query}`,
                company: 'Tech Innovations Inc.',
                location: location || 'Remote',
                description: `Exciting opportunity for an experienced ${query} to join our dynamic team. Work on cutting-edge AI projects and collaborate with industry leaders.`,
                link: '#job-1'
            },
            {
                title: `${query} Team Lead`,
                company: 'Global Solutions Corp',
                location: location || 'San Francisco, CA',
                description: `Lead a team of talented professionals in developing innovative solutions. Required: 5+ years experience in ${query.toLowerCase()}.`,
                link: '#job-2'
            },
            {
                title: `Junior ${query}`,
                company: 'StartUp Ventures',
                location: location || 'New York, NY',
                description: `Great entry-level position for aspiring ${query.toLowerCase()}s. Learn from experienced mentors and grow your career in a fast-paced environment.`,
                link: '#job-3'
            },
            {
                title: `${query} Specialist`,
                company: 'Enterprise Systems Ltd',
                location: location || 'Austin, TX',
                description: `Join our specialized team working on enterprise-level projects. Competitive salary and excellent benefits package.`,
                link: '#job-4'
            },
            {
                title: `Freelance ${query}`,
                company: 'Remote Work Hub',
                location: 'Remote - Worldwide',
                description: `Flexible freelance opportunity for experienced ${query.toLowerCase()}s. Set your own schedule and work with diverse clients globally.`,
                link: '#job-5'
            }
        ];

        return mockJobs;
    }

    displayResults(results) {
        // Clear previous results
        this.resultsContainer.innerHTML = '';

        if (results.length === 0) {
            this.resultsContainer.innerHTML = '<p class="error-message">NO JOBS FOUND. TRY A DIFFERENT SEARCH.</p>';
            return;
        }

        // Add a header
        const header = document.createElement('div');
        header.className = 'results-header';
        header.innerHTML = `
            <h3 style="font-size: 1.5rem; margin-bottom: 20px; font-family: 'Press Start+2P', monospace;">
                <span class="blink">►</span> SEARCH RESULTS
            </h3>
        `;
        this.resultsContainer.appendChild(header);

        // Display each job
        results.forEach((job, index) => {
            const jobCard = this.createJobCard(job, index);
            this.resultsContainer.appendChild(jobCard);
        });
    }

    createJobCard(job, index) {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <h4 class="job-title">► ${job.title}</h4>
            <p class="job-company">COMPANY: ${job.company}</p>
            <p class="job-location">LOCATION: ${job.location}</p>
            <p class="job-description">${job.description}</p>
            <a href="${job.link}" class="job-link">[ VIEW DETAILS ]</a>
        `;
        
        return card;
    }

    updateStatus(message, statusClass) {
        this.statusDisplay.innerHTML = `
            <p class="status-text">
                ${message.includes('SEARCHING') ? '<span class="loading"></span> ' : ''}
                <span class="${statusClass}">${message}</span>
            </p>
        `;
    }

    updateJobCount() {
        if (this.jobCountDisplay) {
            this.animateCounter(this.jobCountDisplay, this.jobCount);
        }
    }

    animateCounter(element, target) {
        const duration = 1000;
        const start = parseInt(element.textContent) || 0;
        const increment = (target - start) / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    typeStatusMessage(message, statusClass, speed = 50) {
        let index = 0;
        const type = () => {
            if (index < message.length) {
                this.statusDisplay.innerHTML = `
                    <p class="status-text">
                        <span class="${statusClass}">${message.substring(0, index + 1)}<span class="blink">_</span></span>
                    </p>
                `;
                index++;
                setTimeout(type, speed);
            } else {
                this.statusDisplay.innerHTML = `
                    <p class="status-text">
                        <span class="${statusClass}">${message}</span>
                    </p>
                `;
            }
        };
        type();
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        this.statusDisplay.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DEEP RESEARCH JOB PORTAL INITIALIZED ', 'background: #0a0a0a; color: #00ff00; font-size: 16px; padding: 10px;');
    console.log('%c ◆ Powered by Google Gemini AI ◆ ', 'background: #0a0a0a; color: #00ff00; font-size: 12px; padding: 5px;');
    
    const app = new JobSearchApp();
    
    // Add some terminal-style logging
    console.log('System Status: ONLINE');
    console.log('AI Model: GEMINI');
    console.log('Version: 1.0.0');
    console.log('Ready for job search queries...');
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus on search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('job-query').focus();
    }
});
