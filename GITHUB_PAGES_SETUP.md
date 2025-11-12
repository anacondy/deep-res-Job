# GitHub Pages Setup Guide

This guide will help you deploy the Deep Research Job Portal frontend to GitHub Pages.

## 🎯 Overview

The repository is configured to deploy the `docs` directory to GitHub Pages, which contains:
- `index.html` - Main HTML file
- `css/retro-style.css` - Styling
- `js/app.js` - Frontend JavaScript
- `.nojekyll` - Bypasses Jekyll processing
- `_config.yml` - GitHub Pages configuration

## 🚀 Setup Instructions

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/anacondy/deep-res-Job`
2. Click on **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Source**: `GitHub Actions` (recommended) OR `Deploy from a branch`
   - If using branch deployment, select branch `main` and folder `/docs`
5. Click **Save**

### Step 2: Verify GitHub Actions Workflow

The repository includes a GitHub Actions workflow (`.github/workflows/static.yml`) that automatically deploys to GitHub Pages when you push to the `main` branch.

**To trigger deployment:**
- Merge this PR to the `main` branch
- The workflow will automatically run and deploy the site
- Check the **Actions** tab to monitor deployment progress

**Manual deployment:**
- Go to the **Actions** tab
- Select "Deploy static content to Pages" workflow
- Click "Run workflow" button

### Step 3: Access Your Live Site

Once deployed, your site will be available at:
```
https://anacondy.github.io/deep-res-Job/
```

## 🔧 How It Works

### GitHub Actions Workflow
The workflow (`.github/workflows/static.yml`):
1. Triggers on push to `main` branch or manual trigger
2. Checks out the repository
3. Sets up GitHub Pages
4. Uploads the `docs` directory as an artifact
5. Deploys to GitHub Pages

### What Gets Deployed
Only the contents of the `docs` folder are deployed:
- ✅ Frontend HTML, CSS, JavaScript
- ✅ Static assets
- ❌ Backend code (stays private in repository)
- ❌ Tests, configuration files

## 📋 Verification Checklist

After deployment, verify:
- [ ] Site loads at `https://anacondy.github.io/deep-res-Job/`
- [ ] Retro styling appears correctly
- [ ] Search form is visible and styled properly
- [ ] Info panel displays on the side
- [ ] Console shows no 404 errors for CSS/JS files
- [ ] Mobile responsive design works

## 🐛 Troubleshooting

### Issue: 404 Error on GitHub Pages
- **Solution**: Ensure GitHub Pages is enabled in Settings → Pages
- Check that the source is set to GitHub Actions or `main` branch with `/docs` folder

### Issue: CSS/JS Not Loading
- **Solution**: All asset paths in `docs/index.html` should be relative (e.g., `css/retro-style.css`, not `/css/retro-style.css`)
- Already verified: ✅ All paths are correct

### Issue: Workflow Not Running
- **Solution**: 
  - Check the **Actions** tab for any error messages
  - Ensure GitHub Actions is enabled in Settings → Actions → General
  - Verify the workflow file has correct permissions

### Issue: Site Shows Old Content
- **Solution**: 
  - Wait 1-2 minutes for deployment to complete
  - Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
  - Clear browser cache

## 🎨 Customization

To update the live site:
1. Make changes to files in the `docs` directory
2. Commit and push to `main` branch
3. GitHub Actions will automatically redeploy
4. Changes will be live in 1-2 minutes

## 📱 Testing Locally

Before deploying, test the docs directory locally:

```bash
# Using Python 3
cd docs
python3 -m http.server 8000

# OR using Node.js
npx serve docs

# Then open: http://localhost:8000
```

## 🔒 Security Notes

- The GitHub Actions workflow has the minimum required permissions
- Only the `docs` directory is publicly accessible
- Backend code and API keys remain private
- The deployed site is a static demo (no backend functionality)

## ✅ Next Steps

1. Merge this PR to `main` branch
2. GitHub Actions will automatically deploy
3. Visit `https://anacondy.github.io/deep-res-Job/` to see your live site
4. Share the link with users!

---

**Need help?** Open an issue on the repository or check the GitHub Pages documentation.
