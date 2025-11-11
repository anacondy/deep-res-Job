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
        // Mock Indian government job data with comprehensive details
        const govtDepartments = [
            'Union Public Service Commission (UPSC)',
            'Staff Selection Commission (SSC)',
            'Railway Recruitment Board (RRB)',
            'Institute of Banking Personnel Selection (IBPS)',
            'State Public Service Commission',
            'Defence Recruitment',
            'Central Government Ministry',
            'State Government Department'
        ];

        const locations = location ? [location] : [
            'All India',
            'Delhi',
            'Mumbai',
            'Bangalore',
            'Kolkata',
            'Chennai',
            'Hyderabad',
            'Multiple Locations'
        ];

        const jobCategories = [
            'Civil Services',
            'Clerical Cadre',
            'Technical Posts',
            'Officer Grade',
            'Group A/B/C/D'
        ];

        // Enhanced job data based on PDF research
        const mockJobs = [
            {
                title: `${query} - ${jobCategories[0]}`,
                company: govtDepartments[0],
                location: locations[0],
                description: `Applications invited for ${query} positions in ${govtDepartments[0]}. Central Government opportunity with excellent career growth and benefits. Educational qualifications and age criteria apply.`,
                eligibility: 'Graduate degree, Age: 21-32 years',
                applicationDeadline: 'Apply by: 30th December 2025',
                examDate: 'Preliminary Exam: February 2026',
                vacancies: 'Multiple vacancies across categories',
                link: '#job-1'
            },
            {
                title: `${query} Recruitment`,
                company: govtDepartments[1],
                location: location || locations[1],
                description: `Staff Selection Commission announces recruitment for ${query.toLowerCase()} posts across various departments. Online applications open. Check official notification for eligibility criteria.`,
                eligibility: '10+2/Graduate, Age: 18-30 years',
                applicationDeadline: 'Last date: 15th January 2026',
                examDate: 'Written Exam: March 2026',
                vacancies: '5000+ posts',
                link: '#job-2'
            },
            {
                title: `Junior ${query}`,
                company: govtDepartments[2],
                location: location || locations[7],
                description: `Railway Recruitment Board invites applications for Junior ${query.toLowerCase()} positions. Multiple vacancies across zones. Competitive salary and railway benefits included.`,
                eligibility: '10th/12th Pass, Age: 18-33 years',
                applicationDeadline: 'Application closes: 20th January 2026',
                examDate: 'CBT: February-March 2026',
                vacancies: '10,000+ vacancies',
                link: '#job-3'
            },
            {
                title: `${query} - Banking Sector`,
                company: govtDepartments[3],
                location: location || locations[3],
                description: `IBPS announces recruitment for ${query.toLowerCase()} in public sector banks. Nationalized bank opportunity with job security and attractive perks. Exam dates to be notified.`,
                eligibility: 'Graduate, Age: 20-30 years',
                applicationDeadline: 'Apply online: Till 25th December 2025',
                examDate: 'Prelims: January 2026, Mains: March 2026',
                vacancies: '3000+ positions in PSU banks',
                link: '#job-4'
            },
            {
                title: `State ${query} Post`,
                company: govtDepartments[4],
                location: location || locations[2],
                description: `State Public Service Commission recruitment for ${query.toLowerCase()} in state government departments. Reserved and unreserved vacancies. Apply online before deadline.`,
                eligibility: 'Graduate, Age as per state rules',
                applicationDeadline: 'Deadline: 10th January 2026',
                examDate: 'Prelim: Feb 2026, Mains: May 2026',
                vacancies: '500+ state govt positions',
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
        
        // Create elements programmatically to avoid XSS
        const title = document.createElement('h4');
        title.className = 'job-title';
        title.textContent = `► ${job.title}`;
        
        const company = document.createElement('p');
        company.className = 'job-company';
        company.textContent = `COMPANY: ${job.company}`;
        
        const location = document.createElement('p');
        location.className = 'job-location';
        location.textContent = `LOCATION: ${job.location}`;
        
        const description = document.createElement('p');
        description.className = 'job-description';
        description.textContent = job.description;
        
        // Add enhanced fields if available
        if (job.eligibility) {
            const eligibility = document.createElement('p');
            eligibility.className = 'job-eligibility';
            eligibility.style.color = 'rgba(0, 255, 0, 0.7)';
            eligibility.style.fontSize = '1.1rem';
            eligibility.style.marginTop = '5px';
            eligibility.textContent = `✓ ELIGIBILITY: ${job.eligibility}`;
            card.appendChild(title);
            card.appendChild(company);
            card.appendChild(location);
            card.appendChild(eligibility);
            card.appendChild(description);
        } else {
            card.appendChild(title);
            card.appendChild(company);
            card.appendChild(location);
            card.appendChild(description);
        }
        
        // Add application deadline
        if (job.applicationDeadline) {
            const deadline = document.createElement('p');
            deadline.className = 'job-deadline';
            deadline.style.color = '#ffff00';
            deadline.style.fontSize = '1.1rem';
            deadline.style.marginTop = '5px';
            deadline.textContent = `⏰ ${job.applicationDeadline}`;
            card.appendChild(deadline);
        }
        
        // Add exam date
        if (job.examDate) {
            const examDate = document.createElement('p');
            examDate.className = 'job-exam';
            examDate.style.color = 'rgba(0, 255, 255, 0.8)';
            examDate.style.fontSize = '1.1rem';
            examDate.style.marginTop = '3px';
            examDate.textContent = `📝 ${job.examDate}`;
            card.appendChild(examDate);
        }
        
        // Add vacancies
        if (job.vacancies) {
            const vacancies = document.createElement('p');
            vacancies.className = 'job-vacancies';
            vacancies.style.color = 'rgba(0, 255, 0, 0.6)';
            vacancies.style.fontSize = '1.1rem';
            vacancies.style.marginTop = '3px';
            vacancies.textContent = `📊 VACANCIES: ${job.vacancies}`;
            card.appendChild(vacancies);
        }
        
        const link = document.createElement('a');
        link.href = job.link;
        link.className = 'job-link';
        link.textContent = '[ VIEW DETAILS ]';
        card.appendChild(link);
        
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
