# **InstaBear - Instagram Bearer Token Wizard** 🚀
**🔓 Login Tanpa Password • ⚡ One-Click Session • 🛡️ Lebih Aman**

![InstaBear - Logo](https://github.com/user-attachments/assets/e461f8bd-bad9-4489-a5f7-a61ff666caa3)

Ekstensi Chrome untuk login ke Instagram menggunakan **Bearer Token**, mengubah token menjadi cookie sesi instan tanpa perlu memasukkan password. Dibangun untuk *developers* dan *power users* yang menginginkan akses cepat dan aman ke Instagram.

## **✨ Fitur Unggulan**
Ekstensi ini menawarkan **🔍 Smart Token Parser** yang menerima token dalam **format apa pun**, termasuk `Bearer IGT:2:...` dan raw Base64 (`eyJ...`), serta otomatis menghapus karakter tidak perlu. Dengan **⚡ One-Click Login**, pengguna dapat mengonversi token menjadi cookie `sessionid` dan `ds_user_id` hanya dalam **satu klik** untuk masuk ke akun Instagram.

Keamanan terjaga dengan fitur **🔒 Lebih Aman**, yang menggunakan **token sementara** tanpa perlu menyimpan password. Fitur **🔄 Auto-Refresh Cookies** memastikan sesi login tetap aktif dengan pembaruan cookie otomatis. Terakhir, **🎨 UI Modern & Responsif** memberikan desain elegan dan animasi halus untuk pengalaman pengguna yang menyenangkan.  

## **🛠️ Cara Menggunakan**  
1. **Dapatkan Bearer Token**  
   - Dari *API Instagram* atau *developer tools*.  
   - Contoh format:  
     `Bearer IGT:2:eyJkc191c2VyX2lkIjoiNjU0OTE4NTgxNDIiLCJzZXNzaW9uaWQiOiI2NTQ5MTg1ODE0MiUzQXM1WHA2ejVEVnkzb2ZvJTNBMjAlM0FBWWR0Z04yT1A4ZzlQ...`
2. **Buka Ekstensi InstaBear**  
   - Klik ikon ekstensi di Chrome.  
3. **Tempel Token & Login**  
   - Paste token di kolom input.  
   - Klik **"Login with Token"**.  
4. **Selesai!** 🎉  
   - Instagram akan terbuka otomatis dengan sesi aktif.

## **📦 Instalasi**  
1. Clone repo ini: `git clone https://github.com/RozhakXD/InstaBear.git`  
2. Buka `chrome://extensions/` di Chrome.  
3. Aktifkan **Developer Mode**.  
4. Klik **"Load Unpacked"** dan pilih folder ekstensi.

## **🔧 Struktur Proyek**  
```
InstaBear/
├── manifest.json          # Konfigurasi ekstensi
├── background.js          # Logic pengaturan cookie
├── popup/
│   ├── popup.html         # Tampilan UI
│   ├── popup.js           # Logic utama
│   └── popup.css          # Styling
└── icons/                 # Logo ekstensi
```

## **🖼️ Tangkapan Layar**
![Images](https://github.com/user-attachments/assets/5c9e4a9a-7962-42e7-b7cf-81ba4b6e262f)

## **⚠️ Disclaimer**  
Ekstensi ini ditujukan untuk **keperluan developer** dan penggunaan yang bertanggung jawab. Instagram adalah merek dagang dari Meta Platforms, Inc. Proyek ini tidak berafiliasi dengan Instagram.  

## **📜 License**  
**MIT License** - Bebas digunakan, dimodifikasi, dan didistribusikan.  
