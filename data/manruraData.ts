import type { Standard } from '../types';

export const manruraData: Standard[] = [
  {
    id: 'bab1',
    shortTitle: 'BAB I: Mutu Pelayanan',
    title: 'Standar 1: Manajemen Mutu Pelayanan Pasien (MMPP)',
    description: `Standar ini membahas mutu pelayanan di unit/ruang rawat, peran kepala ruang, staf, dan hubungan dengan profesi kesehatan lain (PPA). Kepala ruang mengatur pelayanan keperawatan dan berkoordinasi untuk memberikan pelayanan terbaik kepada pasien. Tujuannya adalah mendorong kepala ruang mengelola asuhan keperawatan sesuai metode penugasan yang ditetapkan, sehingga pasien memperoleh pelayanan terbaik berdasarkan ilmu, teknologi, dan peraturan yang berlaku.`,
    elements: [
      {
        id: 'bab1-ep1',
        title: 'EP 1. Pedoman Mutu Pelayanan Pasien',
        description: 'Setiap kepala ruang harus membuat buku pedoman yang mudah dipahami dan selalu dikembangkan sesuai temuan lapangan. Pedoman ini berisi metode penugasan yang diaplikasikan di ruang rawat, yaitu metode moduler. Kepala ruang sebagai leader bertanggungjawab mengimplementasikan, memonitor, dan mengevaluasi metode ini.',
        poin: [
          { id: '1-1-1', text: 'Setiap ruang memiliki pedoman baku metode penugasan yang digunakan sebagai acuan dalam memberikan asuhan keperawatan.', bukti: 'Buku pedoman metode penugasan' },
          { id: '1-1-2', text: 'Metode penugasan digunakan/diimplementasikan sebagai acuan dalam pembagian tugas perawat.', bukti: 'Jadwal bulanan, pembagian tugas harian, catatan dalam rekam medis' },
          { id: '1-1-3', text: 'Pedoman yang digunakan dikembangkan/selalu dilakukan perbaikan untuk dapat memberikan pelayanan yang lebih baik kepada pasien.', bukti: 'Buku Pedoman, revisi buku, sistem penjadwalan, catatan dlm rekam medis, wawancara staf.' },
          { id: '1-1-4', text: 'Terdapat gambaran hubungan tanggungjawab kepala ruang dengan PPJA, PP dan PPA dalam mengelola pelayanan.', bukti: 'Buku supervisi karu ke PPJA atau PP, catatan dalam rekam medis.' },
          { id: '1-1-5', text: 'Perencanaan / program kerja kepala ruang menggambarkan adanya monitoring dan memiliki target yang akan dicapai serta waktu pelaksanaan yang jelas.', bukti: 'Buku pedoman. Target pencapaian hasil monitoring dan evaluasi.' },
        ],
      },
      {
        id: 'bab1-ep2',
        title: 'EP 2. Pemahaman Mutu Pelayanan Oleh Staf',
        description: 'Kepala ruang melakukan sosialisasi secara menyeluruh tentang mutu pelayanan pasien, sehingga semua staf memahami tata cara dan seluruh aspek yang berkaitan dengan metode penugasan terpilih. Peran PPJA adalah sentral dan mutlak terhadap pasien yang menjadi asuhannya.',
        poin: [
          { id: '1-2-1', text: 'Setiap PPJA dan PP telah terpapar metode penugasan yang digunakan.', bukti: 'Daftar hadir. Materi sosialisasi atau bukti lain yang setara.' },
          { id: '1-2-2', text: 'Setiap PPJA dan PP telah memahami konsep metode penugasan dalam pelayanan pasien.', bukti: 'Wawancara' },
          { id: '1-2-3', text: 'Setiap PPJA dan PP memiliki tangungjawab yang jelas dan paham terhadap masalah semua pasien dalam kelolaanya.', bukti: 'Jadwal Bulanan, Jadwal harian, Rekam Medis, Wawancara Pasien' },
          { id: '1-2-4', text: 'Setiap PPJA memahami tanggungjawab koordinasi dengan PPJA lain dan PPA.', bukti: 'Wawancara, dokumen rekam medis' },
          { id: '1-2-5', text: 'Setiap perawat memahami tanggung jawab pelayanan antara PP, PPJA dan kepala ruang.', bukti: 'Wawancara, rekam medis.' },
        ],
      },
      {
        id: 'bab1-ep3',
        title: 'EP 3. Implementasi Mutu Pelayanan Pasien',
        description: 'Implementasi harian pola pembagian tugas menjadi penting, dibuktikan dengan dokumentasi harian. Setiap pasien memiliki perawat yang bertanggung jawab. Komunikasi dan dokumentasi yang berkesinambungan menjadi kunci keberhasilan pelayanan.',
        poin: [
          { id: '1-3-1', text: 'Hand over dilakukan pada setiap shift sesuai regulasi dan terdokumentasi dengan baik.', bukti: 'Dok rekam medis, Observasi' },
          { id: '1-3-2', text: 'Semua perawat mengimplementasikan komunikasi efektif terhadap PPA, pasien dan keluarga.', bukti: 'Dok rekam medis, wawancara, observasi' },
          { id: '1-3-3', text: 'Setiap pasien memiliki satu Perawat yang bertanggung jawab terhadap dirinya selama dalam perawatan.', bukti: 'Wawancara, Observasi' },
          { id: '1-3-4', text: 'Pelayanan berbentuk mandiri dan kolaboratif. Visite pasien selalu dilakukan bersama antara dokter dan perawat.', bukti: 'Wawancara, Observasi' },
          { id: '1-3-5', text: 'Kepala ruang memiliki dokumentasi pembagian kerja harian masing masing PPJA dan PP.', bukti: 'Jadwal, pembagian kerja harian, rekam medis' },
          { id: '1-3-6', text: 'Kepala ruang melakukan perencanaan, evaluasi dan Supervisi kepada setiap PPJA dalam memberikan pelayanan kepada pasien dan mengetahui perencanaan supervisi kepada PP yang dibuat oleh setiap PPJA.', bukti: 'Jadwal supervisi, dok bukti supervisi, logbook.' },
          { id: '1-3-7', text: 'Setiap temuan dalam evaluasi dan bimbingan / supervisi, ditindak lanjuti dan terdokumentasi.', bukti: 'Dok perbaikan pelayanan.' },
        ],
      },
      {
        id: 'bab1-ep4',
        title: 'EP 4. Mutu Pendokumentasian Asuhan',
        description: 'Pelayanan pasien dilakukan oleh banyak disiplin ilmu secara kolaboratif. Asuhan keperawatan yang baik dimulai dari asesmen awal dan perencanaan. Semua dokumen dalam rekam medis harus lengkap, terbaca, informatif, dan mudah dipahami.',
        poin: [
          { id: '1-4-1', text: 'Asesmen dan perencanaan dilakukan tepat waktu, sesuai kaidah, dilakukan / diketahui oleh PPJA.', bukti: 'Observasi kerapihan dan kelengkapan' },
          { id: '1-4-2', text: 'Rekam medis pasien bersifat informatif, diisi sesuai regulasi dan lengkap.', bukti: 'Observasi kelengkapan pengisian rekam medis' },
          { id: '1-4-3', text: 'Isi rekam medis mencerminkan kesinambungan asuhan keperawatan.', bukti: 'Observasi isi rekam medis' },
          { id: '1-4-4', text: 'Ada bukti PPJA bertanggungjawab terhadap semua pasien yang ada dalam asuhanya.', bukti: 'Catatan rekam medis.' },
          { id: '1-4-5', text: 'Kebutuhan materi edukasi terpenuhi.', bukti: 'Materi edukasi pasien yang sesuai' },
          { id: '1-4-6', text: 'Resume pasien pulang dilakukan verifikasi oleh kepala ruang.', bukti: 'Catatan rekamm medis' },
        ],
      },
    ],
  },
  {
    id: 'bab2',
    shortTitle: 'BAB II: Logistik',
    title: 'Standar 2: Manajemen Logistik (Obat, Alkes, B3, Alat Medis)',
    description: 'Pelayanan keperawatan memerlukan dukungan logistik yang harus dikelola dengan baik. Standar ini membahas pengelolaan logistik (obat, bahan berbahaya, peralatan medis & non-medis) untuk memastikan efektivitas, efisiensi, dan keamanan.',
    elements: [
      {
        id: 'bab2-ep1',
        title: 'EP 1. Manajemen Obat',
        description: 'Pengelolaan obat bertujuan meningkatkan mutu layanan dengan prinsip aman, efektif, dan terkoordinir. Meliputi ketersediaan referensi, perencanaan (OUDD), pemberian (7 benar), penyimpanan (suhu, HAM, LASA), evaluasi, dan Rekonsiliasi Obat.',
        poin: [
          { id: '2-1-1', text: 'Ruangan memiliki sumber referensi dalam memberikan obat.', bukti: 'Dokumen: SOP pemberian obat, Formularium, ISO/ MIMS, HAM, LASA, data Rekonsiliasi' },
          { id: '2-1-2', text: 'Ruangan memiliki perencanaan dalam pemberian obat pasien.', bukti: 'Dokumen perencanaan dan pengelolaan obat dengan OUDD, pengelolaan obat HAM, LASA, rekonsiliasi obat, dan retur obat.' },
          { id: '2-1-3', text: 'Dalam memberikan obat perawat berpedoman kepada 7 benar, melakukan pengamatan/monitoring efek samping obat dan melakukan tindakan seperlunya sesuai kompetensi perawat.', bukti: 'Pemberian obat sesuai dengan standar (7 Benar pemberian obat). Terdapat pengelolaan jika ada efek samping pemberian obat' },
          { id: '2-1-4', text: 'Obat di kelola dan disimpan sesuai dengan semestinya.', bukti: 'Dokumen pencatatan suhu, pelabelan obat, data retur obat, rekonsiliasi dan kesesuaian jumlah.' },
          { id: '2-1-5', text: 'Dilakukan evaluasi pada pasca pemberian obat.', bukti: 'Dokumen: rekam medis, rekap IKP.' },
          { id: '2-1-6', text: 'Hasil setiap evaluasi dilakukan tindak lanjut.', bukti: 'Wawancara, bukti tindaklanjut dari pengelolaan obat dan IKP' },
        ],
      },
      {
        id: 'bab2-ep2',
        title: 'EP 2. Manajemen Bahan Medis Habis Pakai (BMHP)',
        description: 'BMHP (alat kesehatan sekali pakai) dikelola dengan sistem FEFO dan FIFO. Kepala ruang memantau persediaan untuk efisiensi, mencegah kekurangan/kelebihan, kerusakan, dan kehilangan. Juga memastikan pengelolaan risiko K3 (misal: tertusuk jarum).',
        poin: [
            { id: '2-2-1', text: 'BMHP direncanakan dengan baik sesuai kebutuhan.', bukti: 'Dokumen perencanaan kebutuhan BHP.' },
            { id: '2-2-2', text: 'Penggunaan BMHP dilakukan dengan menganut prinsip efektif efisien, FEFO dan FIFO.', bukti: 'Bukti penggunaan BMHP dengan: prinsip FEFO, FIFO, efektif dan efisien' },
            { id: '2-2-3', text: 'BMHP disimpan sesuai ketentuan untuk menghindari kerusakan dan pemborosan.', bukti: 'Catatan dan observasi penyimpanan sesuai standar' },
            { id: '2-2-4', text: 'Evaluasi dilakukan secara periodik untuk memastikan pemakaian BMHP telah sesuai dan kejadian K3.', bukti: 'Dokumen evaluasi, dokumen pemakaian BMHP, laporan K3.' },
            { id: '2-2-5', text: 'Hasil evaluasi dilakukan tindak lanjut.', bukti: 'Dokumen tindak lanjut dari evaluasi.' },
        ],
      },
      {
        id: 'bab2-ep3',
        title: 'EP 3. Manajemen Bahan Berbahaya dan Beracun / B3',
        description: 'Pengelolaan B3 di ruang rawat bertujuan untuk mengendalikan dan meminimalkan risiko, terutama bahan mudah terbakar. Kepala ruang menunjuk PIC, melakukan supervisi, dan menyusun panduan pengelolaan (penyediaan, penggunaan, penyimpanan, evaluasi, penanganan tumpahan).',
        poin: [
            { id: '2-3-1', text: 'Terdapat dokumen perencanaan kebutuhan B3 dan MSDS dibuat dengan baik.', bukti: 'Dokumen kebutuhan B3 dan MSDS terkait' },
            { id: '2-3-2', text: 'Penyimpanan dan pengelolaan B3 dilakukan sesuai SOP.', bukti: 'Penyimpanan B3 di tempat aman, tidak mudah terbakar. Terdapat spilkit B3.' },
            { id: '2-3-3', text: 'Penggunaan B3 dilakukan dengan menganut prinsip safety, dilakukan dengan cara efektif dan efisien.', bukti: 'Terdapat kartu stok sebagai dokumentasi penggunaan B3, catatan keluar masuk logistik B3 dan penggunaan spill kit.' },
            { id: '2-3-4', text: 'Evaluasi dilakukan secara periodik untuk memastikan pemakaian B3 telah sesuai.', bukti: 'Dokumen evaluasi, dokumen pemakaian B3.' },
            { id: '2-3-5', text: 'Hasil evaluasi dilakukan tindak lanjut.', bukti: 'Dokumen tindak lanjut dari evaluasi.' },
        ],
      },
      {
        id: 'bab2-ep4',
        title: 'EP 4. Manajemen Alat Medis Non Medis',
        description: 'Memastikan ketersediaan peralatan Medis dan Non Medis yang siap digunakan sesuai standar. Meliputi perencanaan, inventaris, utilisasi (FIFO), perawatan, penyimpanan, monitoring, kalibrasi, dan pelaporan untuk mencegah insiden keselamatan pasien.',
        poin: [
            { id: '2-4-1', text: 'Terdapat daftar alat medis dan non medis yang sesuai.', bukti: 'Dokumen maintenance, kalibrasi dan inventory alat medis dan non medis.' },
            { id: '2-4-2', text: 'Perencanaan alat medis diperhitungkan secara efektif efisien.', bukti: 'Dokumen perencanaan alat medis dan non medis sesuai kebutuhan.' },
            { id: '2-4-3', text: 'Pemakaian alat dilakukan dengan benar sesuai dengan panduan pada masing masing alat.', bukti: 'Terdapat panduan penggunaan alat medis yang tertempel pada masing masing alat.' },
            { id: '2-4-4', text: 'Pemakaian alat medis dilakukan evaluasi secara periodik dan termonitor dengan baik utilitasnya.', bukti: 'Terdapat dokumen evaluasi dan monitoring penggunaan alat.' },
            { id: '2-4-5', text: 'Dilakukan tindak lanjut dari evaluasi yang dilakukan.', bukti: 'Terdapat dokumen tindaklanjut.' },
        ],
      },
    ],
  },
  {
    id: 'bab3',
    shortTitle: 'BAB III: Rumah Tangga',
    title: 'Standar 3: Standar Manajemen Rumah Tangga',
    description: 'Pengelolaan logistik rumah tangga meliputi linen, bahan habis pakai, pengelolaan sampah, dan penerapan prinsip 5R (Ringkas, Rapi, Resik, Rawat, Rajin) untuk mendukung pelayanan keperawatan.',
    elements: [
        {
            id: 'bab3-ep1',
            title: 'EP 1. Manajemen Linen',
            description: 'Linen adalah seluruh produk tekstil di rumah sakit. Pengelolaannya harus efektif dan efisien, meliputi siklus inventaris, perencanaan, utilisasi (FIFO), penyimpanan, pemanfaatan, dan monitoring untuk memastikan ketersediaan dan mencegah risiko infeksi.',
            poin: [
                { id: '3-1-1', text: 'Linen direncanakan dengan berpedoman pada prinsip efektif dan efisien.', bukti: 'Dokumen perencanaan' },
                { id: '3-1-2', text: 'Pengelolaan linen dilakukan dengan tepat.', bukti: 'Bukti pengelolaan linen' },
                { id: '3-1-3', text: 'Penyimpanan Linen dilakukan sesuai dengan yg seharusnya.', bukti: 'Bukti penyimpanan sesuai standar.' },
                { id: '3-1-4', text: 'Evaluasi terhadap penggunaan linen dilakukan secara periodik untuk memastikan pemakaian telah sesuai.', bukti: 'Dokumen evaluasi, dokumen pemakaian linen.' },
                { id: '3-1-5', text: 'Hasil evaluasi dilakukan tindak lanjut.', bukti: 'Dokumen tindak lanjut dari evaluasi.' }
            ]
        },
        {
            id: 'bab3-ep2',
            title: 'EP 2. Manajemen Keselamatan Kebakaran Ruang Rawat',
            description: 'Kebakaran di tempat kerja, khususnya rumah sakit, berdampak merugikan. Pencegahan (pengecekan rutin gas medis, penggunaan listrik sesuai kapasitas, tidak menumpuk stop kontak) dan penanggulangan (pemeliharaan & pelatihan APAR, pembagian jadwal code red) harus dipahami dan dilatih oleh semua staf untuk meminimalkan risiko.',
            poin: [
                { id: '3-2-1', text: 'Alat pemadam kebakaran diletakkan ditempat yang sesuai dan dilakukan pemeliharaan dengan baik.', bukti: 'Dokumentasi pemeliharaan alat, wawancara.' },
                { id: '3-2-2', text: 'Sosialisasi dilakukan dan staf mampu menggunakan alat pemadam api ringan dengan benar.', bukti: 'Bukti sosialisasi, simulasi staf.' },
                { id: '3-2-3', text: 'Simulasi evakuasi kebakaran telah dilakukan.', bukti: 'Wawancara, observasi, dokumen simulasi evakuasi.' },
                { id: '3-2-4', text: 'Kegiatan penanggulangan kebakaran dilakukan evaluasi dan tindak lanjut.', bukti: 'Terdapat hasil evalasi dan tindak lanjut dari evaluasi' },
                { id: '3-2-5', text: 'Tidak menggunakan colokan /stop kontak listrik yang membahayakan (Model T).', bukti: 'Observasi' }
            ]
        },
        {
            id: 'bab3-ep3',
            title: 'EP 3. Manajemen Lingkungan Kerja (5R) Ringkas, Rapi, Resik, Rawat dan Rajin',
            description: '5R (Ringkas, Rapi, Resik, Rawat, Rajin) adalah metode untuk mengatur tempat kerja guna meningkatkan efisiensi, kualitas, dan keselamatan. Budaya 5R menjadi investasi untuk produktivitas dan kepercayaan pelanggan. Kepala ruang bertanggung jawab atas penjelasan dan implementasi periodik budaya 5R.',
            poin: [
                { id: '3-3-1', text: 'Ringkas - Penataan area kerja dilakukan secara tepat, efektif dan efisien.', bukti: 'Observasi.' },
                { id: '3-3-2', text: 'Rapi - Penempatan barang dan alat bantu kerja dikelola secara baik.', bukti: 'Observasi' },
                { id: '3-3-3', text: 'Resik - Kebersihan selalu terjaga, di seluruh area dalam unit.', bukti: 'Observasi' },
                { id: '3-3-4', text: 'Rawat - Komitmen bersama seluruh staf dalam mengelola kebersihan dan setiap capaian.', bukti: 'Observasi, dokumen fisik.' },
                { id: '3-3-5', text: 'Rajin - Dilakukan pengembangan kebiasaan positif.', bukti: 'Dokumentasi.' },
                { id: '3-3-6', text: 'Pengelolaan sampah dilakuan dengan benar.', bukti: 'Observasi, wawancara' }
            ]
        }
    ],
  },
  {
    id: 'bab4',
    shortTitle: 'BAB IV: Perubahan',
    title: 'Standar 4: Manajemen Perubahan',
    description: 'Mendorong kepala ruang untuk berlatih, berpikir, dan bekerja menggunakan prinsip manajemen (planning, organizing, actuating, controlling) untuk mengelola perubahan secara terencana, terpantau, dan bertarget. Perubahan diimplementasikan melalui program terarah, seperti peningkatan mutu atau efisiensi, menggunakan siklus PDCA/PDSA.',
    elements: [
      {
        id: 'bab4-ep1',
        title: 'EP. 1 Perencanaan',
        description: 'Perubahan akan berhasil baik jika dilakukan perencanaan dengan baik. Perencanaan yang baik didasarkan atas data yang ada atau fenomena yang dirasakan dan dilakukan analisis. Perencanaan dibuat berdasarkan tujuan yang akan dicapai sehingga memudahkan pencapaian target, untuk menentukan strategi pencapaian, indikator yang digunakan dan cara melakukan monitoring.',
        poin: [
            { id: '4-1-1', text: 'Kepala ruang merencanakan proses bisnis yang mencerminkan inovasi atau kreatifitas yang dituangkan dalam kerangka acuan kegiatan dengan jelas dan terarah.', bukti: 'Kerangka acuan kegiatan / dokumen perencanaan' },
            { id: '4-1-2', text: 'Perencanaan melibatkan staf dilakukan secara berkelanjutan untuk melakukan modifikasi (Siklus PDCA).', bukti: 'Bukti dokumen: Notulen, absensi, Bukti dokumen temuan masalah' },
            { id: '4-1-3', text: 'Program yang ada dalam perencanaan merupakan hasil analisa dari masalah yang ada dan untuk perbaikan unit.', bukti: 'Data dan analisa data' },
            { id: '4-1-4', text: 'Tujuan dari strategi jelas, dapat dipahami dengan mudah, mencerminkan target yang dapat dicapai sesuai waktu yang ditentukan.', bukti: 'Dokumen kerangka acuan' },
            { id: '4-1-5', text: 'Dokumen perencanaan menunjukkan bahwa strategi memerlukan monitoring secara berkala dan berkelanjutan.', bukti: 'Dokumen kerangka acuan' },
            { id: '4-1-6', text: 'Indikator capaian dapat digunakan untuk evaluasi mandiri, jelas, dan dipahami oleh semua staf.', bukti: 'Dokumen kerangka acuan' },
        ]
      },
      {
        id: 'bab4-ep2',
        title: 'EP. 2 Implementasi',
        description: 'Sosialisasi program menjadi faktor penting untuk menyamakan persepsi antara kepala ruang dan seluruh staf. Keterlibatan staf dalam program ini sangat diperlukan guna mendukung proses implementasi yang diharapkan berhasil sesuai target.',
        poin: [
            { id: '4-2-1', text: 'Program telah disosialisasikan kepada seluruh staf.', bukti: 'Bukti sosialisasi' },
            { id: '4-2-2', text: 'Staf yang terlibat memahami strategi perubahan yang direncanakan.', bukti: 'Wawancara' },
            { id: '4-2-3', text: 'Kepala ruang memiliki peran aktif dalam perubahan yang dilakukan.', bukti: 'Bukti dokumen (aktifitas kepala ruang dalam implementasi program)' },
            { id: '4-2-4', text: 'Bukti kegiatan implementasi dapat diverifikasi kembali setiap saat.', bukti: 'Dokumen bukti monitoring' },
        ]
      },
      {
        id: 'bab4-ep3',
        title: 'EP. 3 Proses Monitoring dan Evaluasi',
        description: 'Monitoring yang dilakukan secara terus menerus terdokumentasi dengan baik akan memudahkan dalam melakukan evaluasi keberhasilan dari program. Kepala ruang dapat melakukan pengumpulan data dan menilai kemajuan dari program yang direncanakan sebagai landasan dalam pengambilan keputusan untuk tindakan selanjutnya.',
        poin: [
            { id: '4-3-1', text: 'Proses monitoring dilakukan oleh kepala ruang sesuai dengan perencanaan program yang telah dibuat, dilakukan secara berkelanjutan.', bukti: 'Dokumen bukti kesesuaian antara perencanaan dan monitoring' },
            { id: '4-3-2', text: 'Hasil monitoring dan evaluasi didokumentasikan.', bukti: 'Dokumentasi monitoring' },
            { id: '4-3-3', text: 'Hasil monitoring dan evaluasi dilakukan tindak lanjut.', bukti: 'Dokumen monitoring dan tindak lanjut' },
            { id: '4-3-4', text: 'Hasil monitoring dan evaluasi disosialisasikan / feedback.', bukti: 'Dokumen Sosialisasi, notulen' },
        ]
      },
      {
        id: 'bab4-ep4',
        title: 'EP. 4 Hasil',
        description: 'Sesuai dengan proses yang telah dilakukan, evaluasi harus dilakukan secara berkala. Hasil yang diharapkan adalah implementasi dari perencanaan yang telah dibuat, dibuktikan dengan progres yang dapat diamati atau melalui dokumentasi.',
        poin: [
            { id: '4-4-1', text: 'Ada korelasi antara perencanaan, monitoring dan hasil akhir.', bukti: 'Dokumen' },
            { id: '4-4-2', text: 'Pencapaian dapat dibuktikan dengan terlihat adanya progres dengan pengamatan atau bukti dokumentasi (retrograde).', bukti: 'Observasi, Dokumen' },
            { id: '4-4-3', text: 'Hasil yang diharapkan merupakan hasil kerja sama seluruh tim.', bukti: 'Observasi, Dokumen, Wawancara' },
            { id: '4-4-4', text: 'Hasil evaluasi menunjukkan adanya usaha untuk memperbaiki keadaan ruang rawat sesuai masalah yang dihadapi.', bukti: 'Dokumen' },
        ]
      }
    ],
  },
  {
    id: 'bab5',
    shortTitle: 'BAB V: SDM & KMP',
    title: 'Standar 5: Manajemen Sumber Daya Manusia, Mutu dan Keselamatan Pasien',
    description: 'Standar ini mencakup dua topik utama: A) Manajemen Sumber Daya Manusia (SDM) dan B) Manajemen Mutu dan Keselamatan Pasien (KMP). Pengelolaan SDM yang baik dan program KMP yang terstruktur sangat penting untuk meningkatkan kinerja, produktivitas, dan menjamin keselamatan pasien.',
    elements: [
        {
            id: 'bab5-epA1',
            title: 'A. MANAJEMEN SDM - EP 1. Perencanaan Kebutuhan Staf',
            description: 'Kepala ruang merencanakan kebutuhan staf (jumlah, jenis, kualifikasi) sesuai kebutuhan pasien, berkoordinasi dengan bidang/bagian terkait.',
            poin: [
                { id: '5-A-1-1', text: 'Perencanaan jumlah, jenis, dan kualifikasi staf dibuat oleh kepala ruang sesuai kebutuhan pasien.', bukti: 'Dokumen perencanaan staf.' },
                { id: '5-A-1-2', text: 'Usulan kebutuhan staf telah disampaikan kepada atasan atau bagian terkait.', bukti: 'Dokumen usulan kebutuhan staf.' },
                { id: '5-A-1-3', text: 'Ada evaluasi terhadap usulan kebutuhan staf oleh pimpinan.', bukti: 'Dokumen evaluasi usulan.' },
                { id: '5-A-1-4', text: 'Penempatan staf di ruang rawat sesuai dengan kualifikasi dan kompetensi.', bukti: 'Dokumen penempatan staf, wawancara.' }
            ]
        },
        {
            id: 'bab5-epA2',
            title: 'A. MANAJEMEN SDM - EP 2. Pengembangan Kompetensi Staf',
            description: 'Kepala ruang menyusun program pengembangan staf (orientasi, pelatihan, pendidikan berkelanjutan) dan melakukan evaluasi kinerja secara berkala.',
            poin: [
                { id: '5-A-2-1', text: 'Kepala ruang membuat program pengembangan staf di ruang rawat.', bukti: 'Dokumen program pengembangan staf.' },
                { id: '5-A-2-2', text: 'Staf diikutsertakan dalam program pelatihan dan pendidikan berkelanjutan.', bukti: 'Sertifikat pelatihan, jadwal pendidikan.' },
                { id: '5-A-2-3', text: 'Ada program orientasi bagi staf baru.', bukti: 'Dokumen program orientasi, laporan pelaksanaan.' },
                { id: '5-A-2-4', text: 'Ada evaluasi kinerja staf secara berkala.', bukti: 'Dokumen evaluasi kinerja.' }
            ]
        },
        {
            id: 'bab5-epA3',
            title: 'A. MANAJEMEN SDM - EP 3. Jenjang Karir & Reward',
            description: 'Terdapat sistem jenjang karir yang jelas serta sistem reward and punishment yang transparan untuk memotivasi staf.',
            poin: [
                { id: '5-A-3-1', text: 'Ada sistem jenjang karir yang jelas bagi staf perawat.', bukti: 'Dokumen sistem jenjang karir, wawancara.' },
                { id: '5-A-3-2', text: 'Ada sistem reward dan punishment yang diterapkan secara adil dan transparan.', bukti: 'Dokumen sistem reward/punishment, bukti pelaksanaan.' },
                { id: '5-A-3-3', text: 'Ada proses kredensial bagi staf perawat secara berkala.', bukti: 'Dokumen kredensial.' }
            ]
        },
        {
            id: 'bab5-epB1',
            title: 'B. MANAJEMEN KMP - EP 1. Program PMKP Ruang Rawat',
            description: 'Kepala ruang menyusun dan memimpin program Peningkatan Mutu dan Keselamatan Pasien (PMKP) di tingkat ruang rawat, yang selaras dengan program PMKP rumah sakit.',
            poin: [
                { id: '5-B-1-1', text: 'Ada program peningkatan mutu dan keselamatan pasien (PMKP) di ruang rawat.', bukti: 'Dokumen program PMKP ruang rawat.' },
                { id: '5-B-1-2', text: 'Kepala ruang memimpin pelaksanaan program PMKP di ruang rawat.', bukti: 'Notulen rapat, laporan kegiatan.' },
                { id: '5-B-1-3', text: 'Program PMKP disosialisasikan kepada seluruh staf.', bukti: 'Daftar hadir sosialisasi, materi sosialisasi.' },
                { id: '5-B-1-4', text: 'Kepala ruang berpartisipasi aktif dalam program PMKP tingkat rumah sakit.', bukti: 'Undangan rapat, notulen rapat PMKP RS.' }
            ]
        },
        {
            id: 'bab5-epB2',
            title: 'B. MANAJEMEN KMP - EP 2. Pengukuran Mutu / Indikator Mutu',
            description: 'Penetapan, pengumpulan, analisis, dan validasi data indikator mutu digunakan sebagai dasar untuk perbaikan pelayanan.',
            poin: [
                { id: '5-B-2-1', text: 'Indikator mutu ruang rawat telah ditetapkan.', bukti: 'Dokumen penetapan indikator mutu.' },
                { id: '5-B-2-2', text: 'Data indikator mutu dikumpulkan, dianalisis, dan divalidasi secara periodik.', bukti: 'Laporan analisis data indikator mutu, bukti validasi.' },
                { id: '5-B-2-3', text: 'Hasil analisis data indikator mutu digunakan untuk perbaikan.', bukti: 'Dokumen rencana tindak lanjut (PDSA).' }
            ]
        },
        {
            id: 'bab5-epB3',
            title: 'B. MANAJEMEN KMP - EP 3. Laporan dan Analisis IKP',
            description: 'Budaya pelaporan Insiden Keselamatan Pasien (IKP) didorong dan setiap insiden dianalisis untuk mencegah perulangan.',
            poin: [
                { id: '5-B-3-1', text: 'Staf telah diedukasi tentang sistem pelaporan insiden keselamatan pasien (IKP).', bukti: 'Bukti sosialisasi/pelatihan IKP.' },
                { id: '5-B-3-2', text: 'Ada bukti pelaporan IKP (internal dan eksternal).', bukti: 'Formulir laporan IKP, rekapitulasi laporan.' },
                { id: '5-B-3-3', text: 'Insiden dianalisis (grading, RCA/investigasi sederhana).', bukti: 'Dokumen analisis insiden.' },
                { id: '5-B-3-4', text: 'Ada rencana tindak lanjut dari hasil analisis insiden.', bukti: 'Dokumen rencana tindak lanjut.' }
            ]
        },
        {
            id: 'bab5-epB4',
            title: 'B. MANAJEMEN KMP - EP 4. Penerapan Sasaran Keselamatan Pasien (SKP)',
            description: 'Sasaran Keselamatan Pasien (SKP) diimplementasikan secara konsisten dalam pelayanan sehari-hari.',
            poin: [
                { id: '5-B-4-1', text: 'Sasaran Keselamatan Pasien (SKP) diterapkan di ruang rawat.', bukti: 'SPO penerapan SKP, observasi.' },
                { id: '5-B-4-2', text: 'Ada bukti penerapan SKP dalam rekam medis dan observasi pelayanan.', bukti: 'Rekam medis, hasil audit/observasi.' }
            ]
        },
        {
            id: 'bab5-epB5',
            title: 'B. MANAJEMEN KMP - EP 5. Manajemen Risiko',
            description: 'Manajemen risiko proaktif (FMEA) dan reaktif (risk register) diterapkan untuk mengidentifikasi dan memitigasi potensi bahaya.',
            poin: [
                { id: '5-B-5-1', text: 'Ada risk register ruang rawat yang diperbaharui secara berkala.', bukti: 'Dokumen risk register.' },
                { id: '5-B-5-2', text: 'Staf diedukasi tentang Failure Mode and Effect Analysis (FMEA).', bukti: 'Bukti sosialisasi/pelatihan FMEA.' },
                { id: '5-B-5-3', text: 'Hasil FMEA digunakan untuk perbaikan proses pelayanan.', bukti: 'Dokumen FMEA dan rencana tindak lanjut.' }
            ]
        }
    ]
  }
];