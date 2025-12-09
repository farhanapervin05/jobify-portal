# Deployment Guide - Jobify Platform

## 🚀 Deploying to Vercel (Frontend) & Render (Backend)

This guide will help you deploy your Jobify platform with the frontend on Vercel and backend on Render.

---

## Part 1: Deploy Backend to Render

### Step 1: Prepare MongoDB Atlas (if not already done)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for Render access
5. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/jobify?retryWrites=true&w=majority
   ```

### Step 2: Deploy to Render

1. **Go to [Render](https://render.com)** and sign up/login

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repository:**
   - Select `jobify-portal`
   - Click "Connect"

4. **Configure the service:**
   ```
   Name: jobify-backend
   Region: Choose closest to you
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

5. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable"
   
   ```
   PORT=5001
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   ADMIN_CODE=ADMIN2024
   NODE_ENV=production
   ```

6. **Select Free Plan** (or paid if you prefer)

7. **Click "Create Web Service"**

8. **Wait for deployment** (5-10 minutes)

9. **Copy your backend URL:**
   ```
   https://jobify-backend-xxxx.onrender.com
   ```

### Step 3: Update CORS in Backend

After deployment, you'll need to update your backend to allow requests from your Vercel frontend.

The backend should already have CORS configured, but make sure it allows your Vercel domain.

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Vercel

1. **Go to [Vercel](https://vercel.com)** and sign up/login with GitHub

2. **Click "Add New..." → "Project"**

3. **Import your repository:**
   - Find `jobify-portal`
   - Click "Import"

### Step 2: Configure the Project

1. **Framework Preset:** Vite (should auto-detect)

2. **Root Directory:** `client`

3. **Build Settings:**
   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables:**
   Click "Environment Variables" and add:
   
   ```
   VITE_API_URL=https://jobify-backend-xxxx.onrender.com/api/v1
   ```
   
   ⚠️ **Important:** Replace `jobify-backend-xxxx.onrender.com` with your actual Render backend URL!

5. **Click "Deploy"**

6. **Wait for deployment** (2-5 minutes)

7. **Your app will be live at:**
   ```
   https://jobify-portal-xxxx.vercel.app
   ```

---

## Part 3: Update Backend CORS

After getting your Vercel URL, update your backend to allow requests from it:

### Option 1: Update via Render Dashboard

1. Go to your Render service
2. Environment → Add Environment Variable:
   ```
   FRONTEND_URL=https://jobify-portal-xxxx.vercel.app
   ```
3. Redeploy

### Option 2: Update server.js (if needed)

Make sure your `server/server.js` has proper CORS configuration:

```javascript
import cors from 'cors';

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions));
```

---

## Part 4: Testing Your Deployment

### 1. Test Backend
Visit: `https://your-backend.onrender.com/api/v1/jobs`

You should see a response (might be empty array or error if not authenticated)

### 2. Test Frontend
Visit: `https://your-frontend.vercel.app`

- Try registering a new user
- Try logging in
- Create a job (as recruiter)
- Test search and filtering

### 3. Check Browser Console
- Open Developer Tools (F12)
- Check Console for any errors
- Check Network tab to see API calls

---

## 🔧 Troubleshooting

### Backend Issues

**Problem:** "Application failed to respond"
- Check Render logs
- Verify MongoDB connection string
- Ensure all environment variables are set

**Problem:** CORS errors
- Add your Vercel URL to CORS configuration
- Check CORS middleware in server.js

### Frontend Issues

**Problem:** API calls failing
- Verify `VITE_API_URL` environment variable
- Check if backend is running
- Look for CORS errors in browser console

**Problem:** Build fails
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify build command is correct

### Common Fixes

1. **Clear Vercel cache:**
   - Go to Vercel dashboard
   - Settings → Clear Cache
   - Redeploy

2. **Restart Render service:**
   - Go to Render dashboard
   - Manual Deploy → Clear build cache & deploy

3. **Check environment variables:**
   - Ensure no typos
   - No trailing slashes in URLs
   - Proper MongoDB connection string format

---

## 📝 Post-Deployment Checklist

- [ ] Backend is accessible and responding
- [ ] Frontend loads without errors
- [ ] User registration works
- [ ] Login/logout works
- [ ] Job creation works (for recruiters)
- [ ] Search and filtering work
- [ ] All API calls succeed
- [ ] No CORS errors
- [ ] MongoDB is connected
- [ ] Environment variables are set correctly

---

## 🎯 Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### For Render (Backend):
1. Go to Service Settings → Custom Domains
2. Add your custom domain
3. Update DNS records

---

## 💡 Tips

1. **Free Tier Limitations:**
   - Render free tier sleeps after 15 minutes of inactivity
   - First request after sleep takes ~30 seconds
   - Consider upgrading for production use

2. **Environment Variables:**
   - Never commit .env files
   - Use different values for production
   - Keep JWT_SECRET very secure

3. **Monitoring:**
   - Check Render logs regularly
   - Monitor Vercel analytics
   - Set up error tracking (optional)

4. **Updates:**
   - Push to GitHub main branch
   - Both Vercel and Render auto-deploy
   - Check deployment logs for errors

---

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

**Need Help?** Check the logs first:
- Vercel: Project → Deployments → Click deployment → View Function Logs
- Render: Service → Logs tab

Good luck with your deployment! 🚀
