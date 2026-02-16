let jumlahForm = 1;

// Tambah Form Pengeluaran
function tambahPengeluaran() {
    jumlahForm++;

    const div = document.createElement("div");
    div.className = "rowPengeluaran";
    div.innerHTML = `
        <input type="text" class="keterangan" placeholder="Keterangan (contoh: Kontrakan)">
        <input type="number" class="pengeluaran" placeholder="Jumlah">
    `;

    document.getElementById("pengeluaranList").appendChild(div);
}

// Ambil Tanggal & Waktu Realtime
function getTanggalWaktu() {
    const now = new Date();

    const tanggal = now.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    const waktu = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    return `${tanggal} - ${waktu}`;
}

// Cetak Struk
function cetakStruk() {
    const totalUang = parseInt(document.getElementById("totalUang").value) || 0;
    const pengeluaranInputs = document.querySelectorAll(".pengeluaran");
    const keteranganInputs = document.querySelectorAll(".keterangan");

    let totalPengeluaran = 0;
    let daftar = "";

    pengeluaranInputs.forEach((input, index) => {
        const nilai = parseInt(input.value) || 0;
        const ket = keteranganInputs[index].value || "Tanpa Keterangan";

        if (nilai > 0) {
            totalPengeluaran += nilai;
            daftar += `
                <p>💸 <strong>${ket}</strong><br>
                Rp ${nilai.toLocaleString('id-ID')}</p>
            `;
        }
    });

    const sisa = totalUang - totalPengeluaran;
    const tanggalWaktu = getTanggalWaktu();

    const strukHTML = `
        <div class="struk" id="strukCetak">
            <h3> STRUK KEUANGAN AYANGGG </h3>
            <p style="text-align:center;">${tanggalWaktu}</p>
            <p style="text-align:center;">✨ Struk Punya Ayang Punel ✨</p>
            <hr>
            ${daftar}
            <hr>
            <p><strong>Total Uang:</strong> Rp ${totalUang.toLocaleString('id-ID')}</p>
            <p><strong>Total Pengeluaran:</strong> Rp ${totalPengeluaran.toLocaleString('id-ID')}</p>
            <p><strong>Sisa Uang:</strong> Rp ${sisa.toLocaleString('id-ID')}</p>
            <hr>
            <p style="text-align:center;">😊 Ayang sudah bekerja keras, jangan lupa bersyukur 😊</p>
        </div>
    `;

    document.getElementById("strukArea").innerHTML = strukHTML;
}

// Download PNG Struk
function downloadPNG() {
    const struk = document.getElementById("strukCetak");

    if (!struk) {
        alert("Cetak struk dulu ya!");
        return;
    }

    html2canvas(struk).then(canvas => {
        const link = document.createElement("a");
        link.download = "struk-keuangan.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
