# 🚀 Deployment Guide - Free Hosting Options

This guide will help you deploy your e-commerce website to free hosting platforms.

## 📋 Prerequisites

1. **GitHub Account** - Free
2. **Node.js** - Installed locally
3. **Git** - Installed locally

## 🎯 Option 1: Render (Recommended - Easiest)

### Step 1: Prepare Your Code
```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy to Render
1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `ecommerce-website`
   - **Environment**: `Node`
   - **Build Command**: `npm run install-client && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Click "Create Web Service"
6. Wait for build to complete (5-10 minutes)

### Step 3: Get Your URL
- Your app will be available at: `https://your-app-name.onrender.com`
- The first request might take 30 seconds (free tier limitation)

## 🌟 Option 2: Vercel (Great for Frontend)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy Frontend Only
```bash
cd client
vercel --prod
```

### Step 3: Deploy Backend
```bash
cd ..
vercel --prod
```

## 🚂 Option 3: Railway

### Step 1: Sign Up
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

### Step 2: Deploy
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Railway will auto-detect Node.js and deploy

## ☁️ Option 4: Heroku

### Step 1: Install Heroku CLI
```bash
npm install -g heroku
```

### Step 2: Deploy
```bash
heroku create your-app-name
git push heroku main
```

## 🔧 Environment Variables

Set these in your hosting platform:

```env
NODE_ENV=production
JWT_SECRET=your-secret-key-here
PORT=10000
```

## 📱 Testing Your Deployment

1. **Frontend**: Visit your deployed URL
2. **Backend**: Test API endpoints like `/api/products`
3. **Authentication**: Try logging in with test credentials:
   - Email: `john@example.com`
   - Password: `password`

## 🚨 Common Issues & Solutions

### Issue: Build Fails
**Solution**: Check that all dependencies are in `package.json`

### Issue: App Shows "Cannot GET /"
**Solution**: Ensure `NODE_ENV=production` is set

### Issue: API Calls Fail
**Solution**: Check CORS settings and API base URL

### Issue: Static Files Not Loading
**Solution**: Verify build folder exists and is served correctly

## 💡 Pro Tips

1. **Use Environment Variables** for sensitive data
2. **Test Locally First** with `npm run build`
3. **Monitor Logs** in your hosting platform
4. **Set Up Auto-Deploy** from GitHub main branch
5. **Use Custom Domain** (if needed)

## 🔄 Updating Your App

```bash
# Make changes locally
git add .
git commit -m "Update app"
git push origin main

# Most platforms auto-deploy from GitHub
# Or manually trigger deployment
```

## 📊 Performance Monitoring

- **Render**: Built-in metrics
- **Vercel**: Analytics dashboard
- **Railway**: Resource usage
- **Heroku**: Add-on monitoring

## 🆘 Need Help?

- **Render**: [docs.render.com](https://docs.render.com)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Deploy to Render**
   - Go to [render.com](https://render.com) and sign up
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: `ecommerce-website`
     - **Environment**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
   - Click "Create Web Service"
   - Wait for deployment (usually 5-10 minutes)

3. **Set Environment Variables**
   - In your Render dashboard, go to "Environment"
   - Add:
     - `NODE_ENV`: `production`
     - `JWT_SECRET`: Generate a random string
     - `PORT`: `10000`

4. **Update Frontend API URL**
   - Once deployed, copy your Render URL (e.g., `https://your-app.onrender.com`)
   - Update `client/src/store/slices/authSlice.js`, `productSlice.js`, and `orderSlice.js`
   - Replace `http://localhost:5000` with your Render URL

## Option 2: Vercel (Frontend) + Render (Backend)

### Frontend (Vercel)

1. **Deploy Frontend to Vercel**
   ```bash
   cd client
   npm install -g vercel
   vercel
   ```
   - Follow the prompts
   - Choose "React" framework
   - Deploy to production

2. **Update API Base URL**
   - In Vercel dashboard, go to "Settings" → "Environment Variables"
   - Add `REACT_APP_API_URL` with your backend URL

### Backend (Render)
- Follow the same steps as Option 1 for the backend

## Option 3: Netlify (Frontend) + Cyclic (Backend)

### Frontend (Netlify)

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign up
   - Drag and drop your `client/build` folder
   - Or connect your GitHub repository

### Backend (Cyclic)

1. **Deploy to Cyclic**
   - Go to [cyclic.sh](https://cyclic.sh) and sign up
   - Connect your GitHub repository
   - Deploy automatically

## Environment Variables Setup

Create a `.env` file in your root directory:

```env
NODE_ENV=production
PORT=10000
JWT_SECRET=your_super_secret_jwt_key_here
```

## Important Notes

### 1. **CORS Configuration**
Your backend already has CORS configured, but you might need to update it for production:

```javascript
// In server.js
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:3000'],
  credentials: true
}));
```

### 2. **Database Considerations**
- Current setup uses dummy data in memory
- For production, consider using MongoDB Atlas (free tier available)
- Update the data files to use actual database connections

### 3. **File Uploads**
- Current setup doesn't handle file uploads
- For production, consider using AWS S3 or similar for product images

### 4. **Security**
- Change default JWT secret
- Implement rate limiting
- Add input sanitization
- Use HTTPS in production

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Ensure all dependencies are in `package.json`

2. **CORS Errors**
   - Verify CORS configuration
   - Check frontend API URL

3. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match exactly

4. **Port Issues**
   - Render uses port 10000 by default
   - Update your code to use `process.env.PORT`

## Performance Optimization

1. **Enable Gzip compression**
2. **Use CDN for static assets**
3. **Implement caching headers**
4. **Optimize images**

## Monitoring

1. **Set up logging**
2. **Monitor response times**
3. **Set up error tracking**
4. **Monitor resource usage**

## Cost Considerations

- **Render**: Free tier includes 750 hours/month
- **Vercel**: Generous free tier for personal projects
- **Netlify**: Free tier includes 100GB bandwidth/month
- **Cyclic**: Free tier with limitations

## Next Steps After Deployment

1. **Test all functionality**
2. **Set up custom domain (optional)**
3. **Implement monitoring**
4. **Add SSL certificate**
5. **Set up backups**

## Support

If you encounter issues:
1. Check the service's documentation
2. Review error logs in the service dashboard
3. Check GitHub issues for similar problems
4. Consider upgrading to paid plans for better support

---

**Remember**: Free hosting services are great for demos and small projects, but for production use, consider paid services with better reliability and support.
