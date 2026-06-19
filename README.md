# QuizMaster

Aplikasi kuis berbasis React + Vite dengan fitur login, timer, resume kuis, dan integrasi Open Trivia DB.

## Cara Menjalankan

### 1. Install dependencies
```bash
npm install
```

### 2. Jalankan dev server
```bash
npm run dev
```

### 3. Buka browser
```
http://localhost:5173
```

## Struktur Project

```
src/
├── App.jsx                  ← root, routing antar page
├── main.jsx                 ← entry point
├── styles/
│   └── global.css           ← semua styling
├── components/
│   ├── Topbar.jsx           ← navbar atas
│   ├── TimerRing.jsx        ← countdown ring SVG
│   └── ScoreRing.jsx        ← skor ring SVG
├── pages/
│   ├── LoginPage.jsx        ← halaman login
│   ├── SetupPage.jsx        ← pengaturan kuis
│   ├── LoadingPage.jsx      ← loading soal
│   ├── QuizPage.jsx         ← halaman soal
│   └── ResultPage.jsx       ← hasil akhir
├── hooks/
│   └── useQuiz.js           ← semua state & logic kuis
└── utils/
    └── helpers.js           ← konstanta & helper functions
```

## Fitur

- Login dengan username & password
- Pilih jumlah soal (5 / 10 / 15 / 20)
- Pilih tingkat kesulitan (Easy / Medium / Hard)
- Pilih durasi kuis (5 – 30 menit)
- Soal diambil dari https://opentdb.com
- Satu soal per halaman, auto pindah setelah memilih jawaban
- Timer countdown dengan visual ring (biru → kuning → merah)
- Live stats benar / salah selama kuis berlangsung
- Jika timer habis, otomatis tampil halaman hasil
- Resume kuis jika browser ditutup (via localStorage)
- Halaman hasil dengan skor, jumlah benar/salah/terlewat

## Palette Warna

| Nama       | Hex       | Penggunaan              |
|------------|-----------|-------------------------|
| Canvas     | #FBFBF8   | Background halaman      |
| Mist       | #DBE3E9   | Card, border, input     |
| Cornflower | #6AA6DA   | Accent utama, timer     |
| Pear       | #E1E5AC   | Resume banner, medium   |
| Black      | #000000   | Text utama, button      |
| Correct    | #3D7A5A   | Jawaban benar           |
| Wrong      | #C0392B   | Jawaban salah           |
