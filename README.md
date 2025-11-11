# Deep Research Job Portal 🚀

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A retro-styled job search portal powered by Google Gemini AI for deep research capabilities. Experience the future of job hunting with a nostalgic twist!

## 🎮 Retro Interface

Our application features a stunning retro terminal design inspired by classic computing aesthetics:

![Retro Interface Screenshot](Screenshot%20(482).png)
*The original retro interface inspiration*

## ✨ Features

- **🤖 AI-Powered Search**: Leverages Google Gemini AI for intelligent job matching
- **🎨 Retro Terminal UI**: Beautiful CRT-style interface with scanline effects
- **⚡ Real-time Results**: Fast and responsive job search experience
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🎯 Smart Filtering**: Advanced search with location-based filtering
- **💾 Mock Data Mode**: Fully functional demo mode for testing

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom retro styling with animations
- **Vanilla JavaScript**: Pure ES6+ with no framework dependencies
- **Fonts**: VT323 & Press Start 2P for authentic retro feel

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Testing
- **Jest**: Testing framework
- **Supertest**: HTTP testing

## 📁 Project Structure

```
deep-res-Job/
├── frontend/
│   ├── index.html              # Main HTML file
│   ├── css/
│   │   └── retro-style.css     # Retro styling
│   ├── js/
│   │   └── app.js              # Frontend application logic
│   └── assets/                 # Static assets
├── backend/
│   ├── server.js               # Express server
│   └── package.json            # Backend dependencies
├── tests/
│   ├── api.test.js             # API endpoint tests
│   └── frontend.test.js        # Frontend functionality tests
├── Screenshot (482).png        # Retro interface reference
├── Google Gemini.pdf           # Documentation
├── frontendGemini.pdf          # Frontend documentation
├── gemini research link        # Research link
├── .gitignore                  # Git ignore rules
├── LICENSE                     # MIT License
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/anacondy/deep-res-Job.git
cd deep-res-Job
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Start the server**
```bash
npm start
```

4. **Open your browser**
```
Navigate to: http://localhost:3000
```

### Development Mode

Run the server with auto-reload:
```bash
cd backend
npm run dev
```

## 📸 Screenshots

### Main Interface
The application features a retro terminal design with green phosphor styling and CRT effects:

![Main Interface - Initial State](https://github.com/user-attachments/assets/78d2f2b5-da82-47bc-b873-93e0aa11c363)
*Initial state of the Deep Research Job Portal with retro terminal styling*

### Search Functionality in Action
Users can search for jobs by entering a query and optional location. Here's the application showing search results:

![Search Results Display](https://github.com/user-attachments/assets/d528c985-076c-48b1-a359-35a531827d41)
*Search results for "Software Engineer" showing 5 job listings with full details*

### Key Features Demonstrated

#### 🎯 Search Panel
- Clean input fields with retro styling
- Animated cursor and blinking effects
- Keyboard shortcuts (Ctrl/Cmd + K to focus)
- Real-time status updates during search

#### 📊 Results Display
- Job cards with hover effects
- Company, location, and description
- Interactive "View Details" buttons
- Smooth animations and transitions

#### ℹ️ Info Panel
- System status monitoring
- Job count tracker
- Feature highlights

## 🧪 Testing

### Run All Tests
```bash
cd backend
npm test
```

### Test Coverage

#### API Tests (`tests/api.test.js`)
- ✅ Health check endpoint
- ✅ Job search functionality
- ✅ Error handling
- ✅ Query validation
- ✅ Job detail retrieval

#### Frontend Tests (`tests/frontend.test.js`)
- ✅ Component initialization
- ✅ Search query validation
- ✅ Result display
- ✅ UI interactions
- ✅ Job card generation

### Manual Testing

1. **Search Functionality**
   - Enter "Software Engineer" in search field
   - Click "INITIATE DEEP SEARCH"
   - Verify results display correctly

2. **Location Filtering**
   - Enter a job query
   - Add location "Remote"
   - Verify location appears in results

3. **Error Handling**
   - Try searching with empty query
   - Verify error message displays

4. **Responsive Design**
   - Resize browser window
   - Verify layout adapts to different sizes

## 🎨 Design Features

### Retro Aesthetic
- **CRT Effect**: Subtle scanline animation
- **Phosphor Glow**: Green text with glow effects
- **Terminal Style**: Monospace fonts and command-line interface
- **Glitch Effects**: Animated text effects on hover
- **Blinking Cursor**: Classic terminal cursor animation

### Color Scheme
- **Primary**: `#00ff00` (Classic green phosphor)
- **Background**: `#0a0a0a` (Deep black)
- **Accent**: Glowing shadows and borders
- **Interactive**: Hover effects with color transitions

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=3000
GEMINI_API_KEY=your_api_key_here
NODE_ENV=development
```

### Customization

#### Change Color Theme
Edit `frontend/css/retro-style.css`:
```css
:root {
    --primary-color: #00ff00;  /* Change to your color */
    --bg-dark: #0a0a0a;
    --text-color: #00ff00;
}
```

#### Modify Search Results
Edit `backend/server.js` `generateMockJobs()` function to customize job data.

## 📚 API Documentation

### Endpoints

#### GET `/api/health`
Check API health status

**Response:**
```json
{
  "status": "ONLINE",
  "message": "Deep Research Job Portal API is running",
  "version": "1.0.0",
  "timestamp": "2025-11-11T03:39:47.752Z"
}
```

#### POST `/api/search`
Search for jobs

**Request Body:**
```json
{
  "query": "Software Engineer",
  "location": "Remote"
}
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "query": "Software Engineer",
  "location": "Remote",
  "jobs": [
    {
      "id": "job-123",
      "title": "Senior Software Engineer",
      "company": "Tech Innovations Inc.",
      "location": "Remote",
      "description": "...",
      "posted": "2025-11-10T12:00:00.000Z",
      "salary": "$100,000 - $150,000"
    }
  ]
}
```

#### GET `/api/jobs/:id`
Get job details by ID

**Response:**
```json
{
  "id": "123",
  "title": "Senior Software Engineer",
  "company": "Tech Innovations Inc.",
  "location": "Remote",
  "description": "...",
  "requirements": [...],
  "salary": "$100,000 - $150,000",
  "posted": "2025-11-10T12:00:00.000Z"
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- Mock data is currently used instead of real Gemini API integration
- Job links are placeholders
- No database persistence yet

## 🗺️ Roadmap

- [ ] Integrate real Google Gemini API
- [ ] Add user authentication
- [ ] Implement job application tracking
- [ ] Add saved searches feature
- [ ] Email notifications for new jobs
- [ ] Advanced filtering options
- [ ] Mobile app version

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Anuj Meena** - [@anacondy](https://github.com/anacondy)

## 🙏 Acknowledgments

- Google Gemini AI for inspiration
- Retro computing community
- All contributors and testers

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

**⚡ Powered by Google Gemini AI | Made with 💚 in Retro Style**