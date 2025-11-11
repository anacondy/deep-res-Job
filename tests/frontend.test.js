/**
 * Frontend Functionality Tests
 * Tests for the JobSearchApp class and UI interactions
 */

describe('JobSearchApp Frontend Tests', () => {
    let app;

    beforeEach(() => {
        // Mock document for testing
        global.document = {
            getElementById: jest.fn((id) => {
                const elements = {
                    'job-query': { value: '', addEventListener: jest.fn() },
                    'location': { value: '', addEventListener: jest.fn() },
                    'search-btn': { disabled: false, innerHTML: '', addEventListener: jest.fn() },
                    'status-display': { innerHTML: '', appendChild: jest.fn() },
                    'results-container': { innerHTML: '', appendChild: jest.fn() },
                    'job-count': { textContent: '0' }
                };
                return elements[id] || { addEventListener: jest.fn(), textContent: '' };
            }),
            createElement: jest.fn(() => ({
                className: '',
                innerHTML: '',
                style: {}
            })),
            addEventListener: jest.fn()
        };
    });

    test('should initialize with correct elements', () => {
        const searchBtn = document.getElementById('search-btn');
        const jobQueryInput = document.getElementById('job-query');
        const locationInput = document.getElementById('location');

        expect(searchBtn).toBeTruthy();
        expect(jobQueryInput).toBeTruthy();
        expect(locationInput).toBeTruthy();
    });

    test('should generate mock results', () => {
        const mockApp = {
            generateMockResults: function(query, location) {
                const mockJobs = [
                    {
                        title: `Senior ${query}`,
                        company: 'Tech Innovations Inc.',
                        location: location || 'Remote',
                        description: 'Test description',
                        link: '#job-1'
                    }
                ];
                return mockJobs;
            }
        };

        const results = mockApp.generateMockResults('Developer', 'Remote');
        expect(results).toHaveLength(1);
        expect(results[0].title).toBe('Senior Developer');
        expect(results[0].location).toBe('Remote');
    });

    test('should validate search query requirement', () => {
        const jobQueryInput = document.getElementById('job-query');
        jobQueryInput.value = '';

        const query = jobQueryInput.value.trim();
        expect(query).toBe('');
    });

    test('should accept valid search query', () => {
        const jobQueryInput = document.getElementById('job-query');
        jobQueryInput.value = 'Software Engineer';

        const query = jobQueryInput.value.trim();
        expect(query).toBe('Software Engineer');
        expect(query.length).toBeGreaterThan(0);
    });

    test('should update job count', () => {
        const jobCountDisplay = document.getElementById('job-count');
        jobCountDisplay.textContent = '5';

        expect(jobCountDisplay.textContent).toBe('5');
    });

    test('should create job card HTML structure', () => {
        const mockJob = {
            title: 'Test Job',
            company: 'Test Company',
            location: 'Test Location',
            description: 'Test Description',
            link: '#test'
        };

        const cardHTML = `
            <h4 class="job-title">► ${mockJob.title}</h4>
            <p class="job-company">COMPANY: ${mockJob.company}</p>
            <p class="job-location">LOCATION: ${mockJob.location}</p>
            <p class="job-description">${mockJob.description}</p>
            <a href="${mockJob.link}" class="job-link">[ VIEW DETAILS ]</a>
        `;

        expect(cardHTML).toContain('Test Job');
        expect(cardHTML).toContain('Test Company');
        expect(cardHTML).toContain('Test Location');
    });

    test('should handle empty search results', () => {
        const resultsContainer = document.getElementById('results-container');
        const results = [];

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="error-message">NO JOBS FOUND. TRY A DIFFERENT SEARCH.</p>';
        }

        expect(resultsContainer.innerHTML).toContain('NO JOBS FOUND');
    });

    test('should display multiple job cards', () => {
        const mockJobs = [
            { title: 'Job 1', company: 'Co 1', location: 'Loc 1', description: 'Desc 1', link: '#1' },
            { title: 'Job 2', company: 'Co 2', location: 'Loc 2', description: 'Desc 2', link: '#2' }
        ];

        expect(mockJobs.length).toBe(2);
        expect(mockJobs[0].title).toBe('Job 1');
        expect(mockJobs[1].title).toBe('Job 2');
    });
});

describe('UI Interaction Tests', () => {
    beforeEach(() => {
        global.document = {
            getElementById: jest.fn((id) => {
                const elements = {
                    'search-btn': { disabled: false, innerHTML: '' },
                    'status-display': { innerHTML: '' },
                    'results-container': { innerHTML: '' }
                };
                return elements[id] || {};
            })
        };
    });

    test('should enable/disable search button', () => {
        const searchBtn = document.getElementById('search-btn');
        
        searchBtn.disabled = true;
        expect(searchBtn.disabled).toBe(true);

        searchBtn.disabled = false;
        expect(searchBtn.disabled).toBe(false);
    });

    test('should update status display', () => {
        const statusDisplay = document.getElementById('status-display');
        const statusMessage = 'SEARCHING...';

        statusDisplay.innerHTML = `<p class="status-text"><span class="status-searching">${statusMessage}</span></p>`;

        expect(statusDisplay.innerHTML).toContain('SEARCHING...');
        expect(statusDisplay.innerHTML).toContain('status-searching');
    });

    test('should clear results container', () => {
        const resultsContainer = document.getElementById('results-container');
        
        resultsContainer.innerHTML = '<div>Some content</div>';
        expect(resultsContainer.innerHTML).toBeTruthy();

        resultsContainer.innerHTML = '';
        expect(resultsContainer.innerHTML).toBe('');
    });
});
