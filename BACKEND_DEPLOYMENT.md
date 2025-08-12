# 🚀 Backend Deployment Guide - Render

## **Step 1: Go to Render Dashboard**

1. Visit [render.com](https://render.com)
2. Sign up/Login with your GitHub account
3. Click "New +" and select "Web Service"

## **Step 2: Connect Your Repository**

1. Connect your GitHub repository: `dipta1994/e-commerce`
2. Render will auto-detect it's a Node.js project

## **Step 3: Configure the Service**

**Name**: `ecommerce-website` (or any name you prefer)

**Environment**: `Node`

**Region**: Choose closest to your users

**Branch**: `master`

**Build Command**: `npm run install-client && npm run build`

**Start Command**: `npm start`

## **Step 4: Environment Variables**

Add these environment variables:
- `NODE_ENV` = `production`
- `PORT` = `10000`

## **Step 5: Deploy**

Click "Create Web Service" and wait for deployment.

## **Step 6: Get Your Backend URL**

Once deployed, you'll get a URL like:
`https://your-app-name.onrender.com`

## **Step 7: Update Frontend API URL**

Update `client/src/utils/api.js` with your actual Render URL:

```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-actual-render-url.onrender.com' // Replace with your URL
  : 'http://localhost:5000';
```

## **Step 8: Test Your Backend**

Test these endpoints:
- `https://your-app-name.onrender.com/api/test`
- `https://your-app-name.onrender.com/api/products`
- `https://your-app-name.onrender.com/api/products/categories/all`

## **Step 9: Redeploy Frontend**

After backend is working, redeploy frontend:
```bash
npm run deploy:netlify
```

## **Troubleshooting**

### **CORS Issues**
If you still get CORS errors, make sure your backend URL is in the CORS configuration in `server.js`.

### **404 Errors**
- Check if Render deployment was successful
- Verify the build and start commands
- Check Render logs for errors

### **Environment Variables**
Make sure all required environment variables are set in Render dashboard.

## **Current Status**

✅ **Frontend**: Deployed to Netlify with fallback data
🔄 **Backend**: Needs manual deployment to Render
✅ **CORS**: Fixed in code
✅ **API Routes**: All implemented

## **Quick Test Commands**

```bash
# Test backend (replace with your actual URL)
curl https://your-app-name.onrender.com/api/test

# Test products endpoint
curl https://your-app-name.onrender.com/api/products

# Test categories endpoint
curl https://your-app-name.onrender.com/api/products/categories/all
```
