import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDO3zW_rQohD-ktTXkrrrILsV_e1-HjB5w",
  authDomain: "insan-cemerlang-8b943.firebaseapp.com",
  projectId: "insan-cemerlang-8b943",
  storageBucket: "insan-cemerlang-8b943.appspot.com",
  messagingSenderId: "1037716880990",
  appId: "1:1037716880990:web:5bb29cf4b27b53ccff7ecf",
  measurementId: "G-ZHPLRWYEQB"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarAbsensi() {
  const refDokumen = collection(db, "apsensi");
  const kueri = query(refDokumen, orderBy("Nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      Tanggal: dok.data().Tanggal,
      Nis: dok.data().Nis,
      Nama: dok.data().Nama,
      Alamat: dok.data().Alamat,
      NoTlpn: dok.data().NoTlpn,
      Kelas: dok.data().Kelas,
      Keterangan: dok.data().Keterangan,
      
    });
  });



  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "apsensi");
}

export async function tambahAbsensi(tanggal, nis, nama, alamat, noTlpn, kelas, keterangan) {
  try {
    const dokRef = await addDoc(collection(db, 'apsensi'), {
      Tanggal: Tanggal,
      Nis: Nodeis,
      Nama: Nama,
      Alamat: Alamat,
      NoTlpn: NoTlpn,
      Kelas: Kelas,
      Keterangan: Keterangan
    });
    console.log('berhasil menembah ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah ' + e);
  }
}

export async function hapusAbsensi(docId) {
  await deleteDoc(doc(db, "apsensi", docId));
}

export async function ubahPembeli(docId, nama, alamat, noTlpn) {
  await updateDoc(doc(db, "apsensi", docId), {
    nama: nama,
    alamat: alamat,
    noTlpn: noTlpn
  });
}

export async function ambilPembeli(docId) {
  const docRef = await doc(db, "apsensi", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}