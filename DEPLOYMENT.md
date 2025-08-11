# Deployment Guide for E-commerce Website

This guide will help you deploy your e-commerce website to free hosting services for demonstration purposes.

## Option 1: Render (Recommended - Easiest)

### Prerequisites
- GitHub account
- Git installed on your computer

### Steps

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
