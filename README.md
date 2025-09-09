# 🏠 Home Connect - Cleaning Services Marketplace

A comprehensive marketplace platform connecting employers with trusted cleaning professionals in Quintana Roo, Mexico.

## 🚀 Quick Deploy to GitHub + Vercel

### Step 1: Upload to GitHub
1. Go to your GitHub repo: [homeconnect-frontend](https://github.com/Vladizilla/homeconnect-frontend)
2. Click **"Add file" → "Upload files"**
3. Upload this entire `homeconnect-frontend.zip` file
4. GitHub will automatically unpack and show all files

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **"New Project"**
4. Select your `homeconnect-frontend` repository
5. Click **"Deploy"** (Vercel auto-detects React)
6. Your site will be live at: `https://homeconnect.vercel.app`

### Step 3: Configure Environment Variables (Optional)
In Vercel dashboard → Settings → Environment Variables:
```
REACT_APP_API_URL=https://homeconnect-api.onrender.com
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

---

## 🎯 Features Included

### 🏠 **Marketplace Dashboard**
- Job posting for employers
- Bid submission for maids
- Escrow payment system
- Job completion workflow
- Dual review system

### 🏆 **Leaderboard**
- Top 100 maids with ratings
- Do Not Hire safety list
- City/community filtering
- Direct job offers

### 💬 **Community Forum**
- Discussion topics by community
- Threaded replies
- User reputation system
- Sticky posts and moderation

### 🔔 **Notification System**
- In-app notification feed
- Email/SMS preferences
- Real-time updates
- External API integration ready

### 👤 **User Profiles**
- Complete user information
- Review history
- Badge system
- Contact options

### 🛡️ **Moderator Panel**
- Audit logs
- User management actions
- Report handling
- Community safety tools

---

## 🧪 Demo Data

The app comes pre-loaded with realistic demo data:

### Users
- **Employers**: You (Premium), Juan Pérez
- **Maids**: María González (Top Rated), Luis Hernández, Rosa Martínez (Elite), Carmen López, Ana Rodríguez

### Sample Jobs
- Deep Clean 3-Bedroom House (Puerto Cancún, $1200)
- Weekly Office Maintenance (Playa del Carmen, $800)
- Move-out Cleaning Service (Tulum, $950)

### Forum Topics
- Best Maids in Playa del Carmen - Recommendations
- Safety Tips for Employers - Avoid Scams
- Fair Pricing Discussion

---

## 🔧 Local Development

If you want to run locally:

```bash
npm install
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

---

## 🌐 Backend Integration

This frontend is pre-configured to connect to your backend API at:
```
https://homeconnect-api.onrender.com
```

### API Endpoints Ready
- `/api/sendEmail` - Email notifications
- `/api/sendSMS` - SMS notifications  
- `/api/users` - User management
- `/api/jobs` - Job posting/bidding
- `/api/reviews` - Review system
- `/api/disputes` - Dispute resolution
- `/api/forum` - Community discussions

---

## 📱 Mobile Responsive

The app is fully responsive and optimized for:
- 📱 Mobile phones (primary usage)
- 💻 Desktop computers
- 📟 Tablets

---

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6) - Trust, reliability
- **Success**: Green (#10B981) - Completed jobs, positive actions
- **Warning**: Yellow (#F59E0B) - Pending items, premium features
- **Danger**: Red (#EF4444) - Disputes, warnings, bans

### Components
- Clean card-based layout
- Consistent button styles
- Responsive navigation
- Status badges and indicators

---

## 🔐 Security Features

- Input validation on all forms
- XSS protection
- Safe profile viewing
- Escrow payment protection
- Community reporting system

---

## 📈 Next Steps

### Phase 1: Launch MVP
- [x] Deploy frontend to Vercel
- [ ] Deploy backend API to Render
- [ ] Configure SendGrid + Twilio
- [ ] Test with real users

### Phase 2: Growth
- [ ] Mobile app (React Native)
- [ ] Payment processing (Stripe)
- [ ] Advanced search filters
- [ ] Multi-language support

### Phase 3: Scale
- [ ] Expand to other cities
- [ ] Background check integration
- [ ] Insurance partnerships
- [ ] Business analytics

---

## 🆘 Support

If you encounter any issues:

1. **Frontend Issues**: Check browser console for errors
2. **API Issues**: Verify backend is running on Render
3. **Deployment Issues**: Check Vercel build logs

---

## 📄 License

This project is for demonstration purposes. All rights reserved.

---

**🏠 Home Connect** - Connecting you with trusted cleaning professionals in Quintana Roo

Built with ❤️ using React, Tailwind CSS, and modern web technologies.