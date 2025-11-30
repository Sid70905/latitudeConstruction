# Quick Deployment Commands

## For Developers Using Command Line

### Option 1: Deploy to Netlify (Easiest)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir .

# Or drag-drop at https://app.netlify.com
```

---

### Option 2: Deploy via FTP (Using lftp)

```bash
# Connect to FTP
lftp -u username,password ftp.yourdomain.com

# Upload all files
mirror -R . /public_html/

# Quit
quit
```

---

### Option 3: Deploy via SSH (VPS/Cloud)

```bash
# Connect to server
ssh user@your-server-ip

# Navigate to web root
cd /var/www/latitudeconstruction.com/public_html

# Clone or upload your files
git clone https://github.com/yourrepo/latitude-construction .

# Set permissions
chmod 755 .
chmod 644 *.html *.css *.js
chmod 755 assets
```

---

### Option 4: Docker Deployment

Create a `Dockerfile` in your project root:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name latitudeconstruction.com;
    root /usr/share/nginx/html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

Deploy:

```bash
docker build -t latitude-construction .
docker run -d -p 80:80 latitude-construction
```

---

### Option 5: Simple HTTP Server (Testing Locally)

```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

---

## DNS Configuration (After Hosting Setup)

### Update your domain registrar with these nameservers:

#### Netlify:
```
NS1: dns1.p01.nsone.net
NS2: dns2.p01.nsone.net
NS3: dns3.p01.nsone.net
NS4: dns4.p01.nsone.net
```

#### Common Hosting Providers:
- **Hostinger**: ns1.hostinger.com, ns2.hostinger.com
- **Bluehost**: ns1.bluehost.com, ns2.bluehost.com
- **GoDaddy**: ns1.secureserver.net, ns2.secureserver.net
- **HostGator**: ns1.hostgator.com, ns2.hostgator.com

---

## Verify Deployment

```bash
# Check DNS propagation
nslookup latitudeconstruction.com

# Check HTTP headers
curl -I https://latitudeconstruction.com

# Test SSL
openssl s_client -connect latitudeconstruction.com:443
```

---

## File Permissions (Unix/Linux)

```bash
# Directories: 755 (rwxr-xr-x)
find . -type d -exec chmod 755 {} \;

# Files: 644 (rw-r--r--)
find . -type f -exec chmod 644 {} \;

# Executable scripts: 755
chmod 755 *.sh
```

---

## Enable Gzip Compression (Apache)

Add to `.htaccess`:

```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

---

## Enable Browser Caching (Apache)

Add to `.htaccess`:

```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/x-icon "access plus 1 year"
</IfModule>
```

---

## Monitor Performance

### Google PageSpeed Insights
https://pagespeed.web.dev

### GTmetrix
https://gtmetrix.com

### WebPageTest
https://www.webpagetest.org

---

## Update Website Content

When you update files locally, redeploy:

```bash
# Git (if using GitHub)
git add .
git commit -m "Update: [description]"
git push origin main

# Netlify will auto-deploy

# Or FTP manually:
lftp -u user,pass ftp.yourdomain.com
mirror -R --delete . /public_html/
quit
```

---

## Domain Email Setup (Common Providers)

### Gmail
1. Settings → Forwarding and POP/IMAP
2. Use credentials: info@latitudeconstruction.com
3. SMTP: smtp.gmail.com:587

### Office 365
1. Add domain to Microsoft 365
2. Configure MX records
3. Create mailbox for info@latitudeconstruction.com

### cPanel Email
- Hostname: yourdomain.com or mail.yourdomain.com
- Port: 993 (IMAP) / 465 (SMTP)
- Username: info@latitudeconstruction.com

---

## Security Checklist

- [ ] Enable HTTPS/SSL certificate
- [ ] Update DNS nameservers
- [ ] Set file permissions (644 files, 755 folders)
- [ ] Remove debug info from code
- [ ] Update contact info if needed
- [ ] Test all links and forms
- [ ] Test on mobile devices
- [ ] Enable firewall on hosting
- [ ] Backup files regularly
- [ ] Monitor uptime (use UptimeRobot)

---

**🚀 You're ready to deploy Latitude Construction!**
