export type Donation = {
  id: string;
  donor: {
    name: string;
    avatar: string;
  };
  bloodType: string;
  donationDate: string;
  location: string;
  status: 'Completed' | 'Pending' | 'Canceled';
};

export const mockDonations: Donation[] = [
  {
    id: 'DON-001',
    donor: { name: 'Ahmad Subarjo', avatar: 'https://i.pravatar.cc/40?u=ahmad' },
    bloodType: 'A+',
    donationDate: 'Aug 1, 2025',
    location: 'PMI Makassar',
    status: 'Completed',
  },
  {
    id: 'DON-002',
    donor: { name: 'Siti Aminah', avatar: 'https://i.pravatar.cc/40?u=siti' },
    bloodType: 'O-',
    donationDate: 'Aug 2, 2025',
    location: 'Event Donor Darah',
    status: 'Completed',
  },
  {
    id: 'DON-003',
    donor: { name: 'Budi Santoso', avatar: 'https://i.pravatar.cc/40?u=budi' },
    bloodType: 'B+',
    donationDate: 'Aug 3, 2025',
    location: 'PMI Makassar',
    status: 'Pending',
  },
  {
    id: 'DON-004',
    donor: { name: 'Dewi Lestari', avatar: 'https://i.pravatar.cc/40?u=dewi' },
    bloodType: 'AB+',
    donationDate: 'Jul 28, 2025',
    location: 'Kantor Pusat',
    status: 'Canceled',
  },
  {
    id: 'DON-004',
    donor: { name: 'Dewi Lestari', avatar: 'https://i.pravatar.cc/40?u=dewi' },
    bloodType: 'AB+',
    donationDate: 'Jul 28, 2025',
    location: 'Kantor Pusat',
    status: 'Canceled',
  },
  {
    id: 'DON-004',
    donor: { name: 'Dewi Lestari', avatar: 'https://i.pravatar.cc/40?u=dewi' },
    bloodType: 'AB+',
    donationDate: 'Jul 28, 2025',
    location: 'Kantor Pusat',
    status: 'Canceled',
  },
  {
    id: 'DON-004',
    donor: { name: 'Dewi Lestari', avatar: 'https://i.pravatar.cc/40?u=dewi' },
    bloodType: 'AB+',
    donationDate: 'Jul 28, 2025',
    location: 'Kantor Pusat',
    status: 'Canceled',
  },
  {
    id: 'DON-004',
    donor: { name: 'Dewi Lestari', avatar: 'https://i.pravatar.cc/40?u=dewi' },
    bloodType: 'AB+',
    donationDate: 'Jul 28, 2025',
    location: 'Kantor Pusat',
    status: 'Canceled',
  },
  {
    id: 'DON-004',
    donor: { name: 'Dewi Lestari', avatar: 'https://i.pravatar.cc/40?u=dewi' },
    bloodType: 'AB+',
    donationDate: 'Jul 28, 2025',
    location: 'Kantor Pusat',
    status: 'Canceled',
  },
  {
    id: 'DON-004',
    donor: { name: 'Dewi Lestari', avatar: 'https://i.pravatar.cc/40?u=dewi' },
    bloodType: 'AB+',
    donationDate: 'Jul 28, 2025',
    location: 'Kantor Pusat',
    status: 'Canceled',
  },
  {
    id: 'DON-004',
    donor: { name: 'Dewi Lestari', avatar: 'https://i.pravatar.cc/40?u=dewi' },
    bloodType: 'AB+',
    donationDate: 'Jul 28, 2025',
    location: 'Kantor Pusat',
    status: 'Canceled',
  },
  // Tambahkan 5-6 data lagi dengan pola yang sama untuk mengisi tabel
];