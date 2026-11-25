# Form Registrasi

# Fields
Harus mempunyai:
1. input  Nama lengkap
2. input Email
3. input Password
4. Konfirmasi Password
5. submit

# Teknis:
- Satu useState object untuk semua field — bukan 4 useState terpisah
- Satu handleChange universal — pakai [name]: value + ...prev
- Semua input controlled — ada value={form.xxx} dan onChange={handleChange}
- Atribut name di setiap input = key di state (harus sama persis)
- onSubmit di <form> — pakai e.preventDefault()

# Validasi:

- Semua field wajib diisi — tidak boleh kosong
- Password minimal 8 karakter
- Konfirmasi password harus sama dengan password — form.password === form.confirmPassword
- Tampilkan error di bawah field yang error — conditional rendering {errors.name && <small>...</small>}
- Validasi saat blur, bukan saat ketik — biar tidak error muncul saat user baru mulai mengetik.
- Validasi per-field — fungsi validateField(name, value) yang return error message atau null.
- Email format lebih ketat — pakai regex, bukan cuma cek @.
- Password strength — minimal: 8 karakter + 1 huruf + 1 angka.
- Error hilang saat user memperbaiki input — begitu user edit field yang error, error-nya clear

# UX:

- Tombol submit akan disabled jikalau ada error atau field kosong
- Setelah submit sukses — tampilkan pesan sukses (atau console.log) dan reset form
- Console.log data saat submit — untuk verifikasi
- Toggle show/hide password — tombol mata yang mengubah type="password" ↔ type="text"
- Checkbox "Saya setuju syarat & ketentuan" — wajib dicentang sebelum submit
- Loading state saat submit — tombol berubah jadi "Loading..." dan disabled
- Simulasi async submit — pakai setTimeout 1 detik di dalam handleSubmit untuk mensimulasikan network request
- Pesan sukses yang jelas — bukan cuma console.log, tapi tampilkan "Registrasi berhasil!" atau pindah ke state "success"
- simpan registrasi di localStorage
- jika data sudah ada di localStorage berikan pengguna pilihan untuk sign in atau sign up, jika user memilih sign up, hapus data lama di localStorage dengan yang baru

# Aksesibilitas Dasar

- <label> untuk setiap input — bukan cuma placeholder
- htmlFor di label = id di input
- Error punya aria-invalid dan aria-describedby


# Contoh struktur state yang disarankan: 
```jsx
const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});
```

# UI

- tambahkan gambar untuk background form di /src/assets
- jangan gunakan UI yang terlihat generic dan hindari AI Slop
- gunakan pemilihan font yang tepat untuk standar form registrasi lalu simpan di /src/font untuk font yang dipakai

### Git Commit Identity Rules

- commit one by one for each component, feature, docs(readme) or style.
- Always use my configured Git identity as the commit author.
- Never add `Co-authored-by: Copilot` to commit messages.
- Never add any AI-generated co-author attribution unless I explicitly request it.
- Do not modify my Git author name or email.
- Use Conventional Commits format for all commit messages.
- Before committing, inspect the commit message and ensure no unwanted co-author attribution is present.
- Never include the plan.md file.

# Rules

- Use English for every word in the website.
- Add a copyright notice with the creator's name: Azriel Naufal Robie.
- Create a professional-standard README file, and be sure to include badges for the tech stack used.
- For the README file, include the creator's name, phone number: 08883838694, email: azrielnaufalr@gmail.com, GitHub: https://github.com/AzrielNaufal-Dev, and LinkedIn: https://www.linkedin.com/in/azriel-naufal-robie-1ab12b361/
- avoid unnecessary comments in every file.
- Do not add any further frameworks or libraries unless I instruct you to do so.

### NEW TASKS!! (v1.0)
- commit dan push kedalam https://github.com/AzrielNaufal-Dev/Register-Form.git
- pecah App.jsx agar tidak terlalu panjang menjadi beberapa komponen di /src/components baru sambungkan. 