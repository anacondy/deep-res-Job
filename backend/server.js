const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ONLINE',
        message: 'Deep Research Job Portal API is running',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// Job search endpoint
app.post('/api/search', async (req, res) => {
    try {
        const { query, location } = req.body;

        if (!query) {
            return res.status(400).json({
                error: 'Search query is required'
            });
        }

        // In production, this would integrate with Google Gemini API
        // For now, return mock data
        const jobs = generateMockJobs(query, location);

        res.json({
            success: true,
            count: jobs.length,
            query,
            location: location || 'All locations',
            jobs
        });

    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

// Get job by ID endpoint
app.get('/api/jobs/:id', (req, res) => {
    const { id } = req.params;
    
    // Mock job detail
    const job = {
        id,
        title: 'Senior Software Engineer',
        company: 'Tech Innovations Inc.',
        location: 'Remote',
        description: 'Exciting opportunity for an experienced software engineer to join our dynamic team.',
        requirements: [
            '5+ years of experience',
            'Strong problem-solving skills',
            'Team player',
            'Excellent communication'
        ],
        salary: '$100,000 - $150,000',
        posted: new Date().toISOString()
    };

    res.json(job);
});

// Helper function to generate mock jobs
function generateMockJobs(query, location) {
    const companies = [
        'Tech Innovations Inc.',
        'Global Solutions Corp',
        'StartUp Ventures',
        'Enterprise Systems Ltd',
        'Remote Work Hub',
        'Digital Dynamics',
        'Future Tech Labs',
        'Cloud Computing Co.'
    ];

    const locations = location ? [location] : [
        'Remote',
        'San Francisco, CA',
        'New York, NY',
        'Austin, TX',
        'Seattle, WA',
        'Boston, MA'
    ];

    const jobTypes = ['Senior', 'Junior', 'Lead', 'Principal', 'Staff'];

    const jobs = [];
    const numJobs = Math.floor(Math.random() * 5) + 3; // 3-7 jobs

    for (let i = 0; i < numJobs; i++) {
        jobs.push({
            id: `job-${Date.now()}-${i}`,
            title: `${jobTypes[i % jobTypes.length]} ${query}`,
            company: companies[i % companies.length],
            location: locations[i % locations.length],
            description: `Exciting opportunity for ${query.toLowerCase()} role. Join our team and work on innovative projects with cutting-edge technology.`,
            posted: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            salary: `$${(60 + Math.floor(Math.random() * 100)) * 1000} - $${(100 + Math.floor(Math.random() * 100)) * 1000}`
        });
    }

    return jobs;
}

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   DEEP RESEARCH JOB PORTAL - BACKEND SERVER              ║
║                                                           ║
║   Status: ONLINE                                          ║
║   Port: ${PORT}                                              ║
║   Version: 1.0.0                                          ║
║   Powered by: Google Gemini AI                            ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
        `);
    });
}

module.exports = app;
