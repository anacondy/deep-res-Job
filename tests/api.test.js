const request = require('supertest');
const app = require('../backend/server');

describe('Deep Research Job Portal API Tests', () => {
    
    describe('GET /api/health', () => {
        test('should return API health status', async () => {
            const response = await request(app)
                .get('/api/health')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('status', 'ONLINE');
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('version', '1.0.0');
            expect(response.body).toHaveProperty('timestamp');
        });
    });

    describe('POST /api/search', () => {
        test('should return job results for valid query', async () => {
            const response = await request(app)
                .post('/api/search')
                .send({
                    query: 'Software Engineer',
                    location: 'Remote'
                })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('count');
            expect(response.body).toHaveProperty('jobs');
            expect(Array.isArray(response.body.jobs)).toBe(true);
            expect(response.body.jobs.length).toBeGreaterThan(0);
        });

        test('should return error for missing query', async () => {
            const response = await request(app)
                .post('/api/search')
                .send({
                    location: 'Remote'
                })
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });

        test('should handle query without location', async () => {
            const response = await request(app)
                .post('/api/search')
                .send({
                    query: 'Data Scientist'
                })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('success', true);
            expect(response.body.jobs.length).toBeGreaterThan(0);
        });
    });

    describe('GET /api/jobs/:id', () => {
        test('should return job details by ID', async () => {
            const response = await request(app)
                .get('/api/jobs/123')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('id', '123');
            expect(response.body).toHaveProperty('title');
            expect(response.body).toHaveProperty('company');
            expect(response.body).toHaveProperty('location');
            expect(response.body).toHaveProperty('description');
        });
    });

    describe('Job Search Functionality', () => {
        test('should return different results for different queries', async () => {
            const response1 = await request(app)
                .post('/api/search')
                .send({ query: 'Developer' });

            const response2 = await request(app)
                .post('/api/search')
                .send({ query: 'Designer' });

            expect(response1.body.jobs[0].title).toContain('Developer');
            expect(response2.body.jobs[0].title).toContain('Designer');
        });

        test('should return jobs with required fields', async () => {
            const response = await request(app)
                .post('/api/search')
                .send({ query: 'Engineer' });

            const job = response.body.jobs[0];
            expect(job).toHaveProperty('id');
            expect(job).toHaveProperty('title');
            expect(job).toHaveProperty('company');
            expect(job).toHaveProperty('location');
            expect(job).toHaveProperty('description');
            expect(job).toHaveProperty('posted');
        });
    });
});
