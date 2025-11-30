# URL Configuration Guide

## Removing "adex-master" from URL

Your website currently shows URL like:
```
https://yourdomain.com/adex-master/index.html
```

You want:
```
https://yourdomain.com/
```

---

## Solution Based on Your Hosting

### If Using Netlify (Recommended - Easiest):
```
1. Connect your GitHub repo or upload folder
2. Set Build settings:
   - Publish directory: . (current folder)
   - Build command: (leave empty for static site)
3. Deploy
4. Your site will be at root (no /adex-master/)
```

### If Using Shared Hosting (cPanel):
```
1. Upload ENTIRE contents of project to public_html folder:
   ✅ index.html
   ✅ assets/ folder
   ✅ favicon.svg
   ✅ All other files

2. Do NOT upload the parent "adex-master" folder

3. Your site will be at: https://yourdomain.com/
```

### If Using FTP:
```
1. Connect to FTP server
2. Navigate to public_html (or www folder)
3. Upload these files directly there:
   ✅ index.html
   ✅ assets/ (entire folder)
   ✅ favicon.svg
   ✅ *.md files
   ✅ Other files

4. Directory structure should be:
   public_html/
   ├── index.html
   ├── favicon.svg
   ├── assets/
   │   ├── css/
   │   ├── js/
   │   └── images/
   └── ...other files...

5. Your site will be at: https://yourdomain.com/
```

### If Using VPS or Server:
```
1. In your web server config (nginx/Apache):
   - Set DocumentRoot/root to your project folder
   - Point to where index.html is located

2. Your site will be at: https://yourdomain.com/
```

---

## Current Structure (What You Have)

```
📁 adex-master-master1/
└── 📁 adex-master/              ← This folder name appears in URL
    ├── index.html
    ├── favicon.svg
    ├── assets/
    ├── *.md files
    └── ...
```

---

## Desired Structure (What You Want)

```
📁 public_html/ (or root folder)
├── index.html                   ← At root level
├── favicon.svg
├── assets/
├── *.md files
└── ...
```

---

## Step-by-Step: Netlify Deployment (Easiest)

### Option A: Drag & Drop (5 minutes)
```
1. Go to https://app.netlify.com
2. Drag & drop your PROJECT FOLDER (not the parent)
3. Site deployed immediately at root
4. Your URL: https://your-site-name.netlify.app/
5. Add custom domain latitudeconstruction.com
```

### Option B: Git Connected
```
1. Push your project to GitHub
2. Connect GitHub to Netlify
3. Auto-deploys on every push
4. No /adex-master/ in URL
```

---

## Step-by-Step: cPanel Deployment

### Using File Manager:
```
1. Log into cPanel
2. Go to File Manager
3. Open public_html folder
4. Upload these directly:
   - index.html
   - favicon.svg
   - assets/ folder
   - All .md files
   - Other files

5. Your site accessible at:
   https://yourdomain.com/
```

### Using FTP:
```
1. Download FileZilla (free)
2. Connect with FTP credentials
3. Navigate to public_html
4. Upload files directly (not in a folder)
5. Your site accessible at:
   https://yourdomain.com/
```

---

## Testing After Upload

After uploading, verify:

✅ Visit https://yourdomain.com/
✅ See your website load
✅ No 404 errors
✅ All images load
✅ Calculator works
✅ Contact links work
✅ WhatsApp button works
✅ "Get Detailed Quote" works

If you see 404 errors, check file structure.

---

## Troubleshooting

### Problem: Still seeing /adex-master/ in URL
**Solution:** 
- You uploaded the parent folder instead of contents
- Re-upload just the contents to root

### Problem: Images not loading
**Solution:**
- Check file paths: ./assets/images/...
- Paths should work from root

### Problem: CSS not loading
**Solution:**
- Check file paths: ./assets/css/style.css
- Should load from root

### Problem: JavaScript not working
**Solution:**
- Check file paths: ./assets/js/script.js
- Should load from root

---

## Domain Configuration

After fixing URLs, configure your domain:

### Point Domain to Hosting:
```
1. Register: latitudeconstruction.com
2. Go to domain registrar
3. Update nameservers to:
   - Your hosting provider's nameservers

4. Wait 24-48 hours for propagation
5. Your site accessible at:
   https://latitudeconstruction.com/
```

---

## Final URL Structure

After everything is set up:

**What you want:**
```
https://latitudeconstruction.com/
https://latitudeconstruction.com/index.html (redirects to /)
https://latitudeconstruction.com/#calculator (section link)
https://latitudeconstruction.com/#contact (section link)
```

**NOT:**
```
https://latitudeconstruction.com/adex-master/ ❌
https://latitudeconstruction.com/adex-master/index.html ❌
```

---

## Summary

✅ Remove folder nesting when uploading
✅ Upload file contents directly to root/public_html
✅ Configure domain nameservers
✅ Your site appears at clean root URL
✅ All paths work correctly

---

## Quick Checklist

- [ ] Uploaded files to root (not in subfolder)
- [ ] index.html is at root level
- [ ] assets/ folder exists at root level
- [ ] Website loads at https://yourdomain.com/
- [ ] No /adex-master/ in any URL
- [ ] All images load correctly
- [ ] All features work

---

**Status:** Ready to deploy at clean URL! ✅
