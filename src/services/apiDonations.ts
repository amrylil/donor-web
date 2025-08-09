import { mockDonations, type Donation } from "../data/mockDonation";

export const getDonations = async (): Promise<Donation[]> => {
  console.log('Fetching donations data...');
  
  // Tunggu 1.5 detik untuk meniru jeda jaringan
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Di aplikasi nyata, di sinilah Anda akan menggunakan fetch() atau axios
  // untuk mengambil data dari backend Anda, contoh:
  // const response = await fetch('https://api.example.com/donations');
  // const data = await response.json();
  // return data;
  
  // Untuk sekarang, kita kembalikan data mock
  return mockDonations;
};