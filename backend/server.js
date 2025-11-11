const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security Note: This is a demo application with mock data
// In production, add:
// - Rate limiting (e.g., express-rate-limit)
// - Input validation and sanitization
// - Authentication/Authorization
// - HTTPS enforcement
// - Security headers (helmet)

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
        title: 'Civil Services Officer',
        company: 'Union Public Service Commission (UPSC)',
        location: 'All India',
        description: 'Indian Administrative Service (IAS) recruitment through Civil Services Examination. One of the most prestigious government positions in India.',
        requirements: [
            'Indian citizen',
            'Graduate degree from recognized university',
            'Age: 21-32 years (relaxation for reserved categories)',
            'Pass Preliminary, Mains, and Interview stages'
        ],
        salary: '₹56,100 - ₹2,50,000 per month (7th Pay Commission) + DA & Allowances',
        posted: new Date().toISOString()
    };

    res.json(job);
});

// Helper function to generate mock jobs
// Note: Uses Math.random() for demo purposes only
// In production, use crypto.randomBytes() for any security-sensitive randomness
function generateMockJobs(query, location) {
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

    const jobTypes = ['Civil Services', 'Clerical', 'Technical', 'Officer', 'Group A/B'];

    const jobs = [];
    const numJobs = Math.floor(Math.random() * 5) + 3; // 3-7 jobs

    for (let i = 0; i < numJobs; i++) {
        jobs.push({
            id: `job-${Date.now()}-${i}`,
            title: `${jobTypes[i % jobTypes.length]} ${query}`,
            company: govtDepartments[i % govtDepartments.length],
            location: locations[i % locations.length],
            description: `Government of India recruitment notification for ${query.toLowerCase()} positions. Indian nationals eligible. Educational qualifications, age limits, and reservation policies apply as per government norms.`,
            posted: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            salary: `₹${(30 + Math.floor(Math.random() * 50)) * 1000} - ₹${(60 + Math.floor(Math.random() * 100)) * 1000} per month + DA & Allowances`
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
