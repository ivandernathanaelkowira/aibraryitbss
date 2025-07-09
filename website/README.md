# AIBRARY Website Frontend

Folder ini berisi semua file frontend untuk aplikasi AIBRARY.

## Struktur File

```
website/
├── index.html         # Halaman utama (landing page)
├── search.html        # Halaman pencarian AI tools (memerlukan login)
├── auth.html          # Halaman login/registrasi
├── admin.html         # Halaman admin panel (admin only)
├── script.js          # JavaScript untuk animasi dan interaksi umum
├── style.css          # Styling CSS untuk seluruh aplikasi
└── aiToolsData.js     # Database AI tools dengan kategori dan informasi
```

## Deskripsi File

### HTML Files
- **`index.html`**: Landing page dengan informasi tentang AIBRARY
- **`search.html`**: Halaman pencarian AI tools dengan card yang menarik
- **`auth.html`**: Halaman login dan registrasi user
- **`admin.html`**: Panel admin untuk mengelola user

### JavaScript Files
- **`script.js`**: Script umum untuk animasi dan interaksi
- **`aiToolsData.js`**: Database 20 AI tools dengan informasi lengkap

### CSS Files
- **`style.css`**: Styling untuk seluruh aplikasi dengan animasi modern

## Fitur Frontend

### 1. Responsive Design
- Mobile-first approach
- Bootstrap 5 framework
- Custom CSS untuk styling khusus

### 2. Modern Animations
- CSS animations dan transitions
- Hover effects pada card
- Stagger animations untuk loading
- Smooth scrolling

### 3. Interactive Components
- Search functionality
- Category filtering
- User authentication status
- Admin panel interface

### 4. AI Tools Cards
- Modern card design dengan gradient
- Feature tags
- Rating system
- Price indicators
- Direct links ke website resmi

## Teknologi yang Digunakan

- **HTML5**: Semantic markup
- **CSS3**: Modern styling dengan gradients dan animations
- **JavaScript (ES6+)**: Interaktivitas dan data management
- **Bootstrap 5**: UI framework
- **Font Awesome**: Icons
- **Animate.css**: Animation library

## Cara Penggunaan

1. File-file ini dilayani oleh server Node.js
2. Akses melalui `http://localhost:3000`
3. Semua routing dihandle oleh `server.js` di root folder
4. Static files dilayani dari folder `website/`

## Development

Untuk mengembangkan frontend:
1. Edit file di folder `website/`
2. Server akan otomatis reload jika menggunakan nodemon
3. Perubahan akan langsung terlihat di browser

## Notes

- Semua file frontend harus berada di folder `website/`
- Server diatur untuk melayani static files dari folder ini
- Pastikan semua path di HTML mengarah ke file yang benar 