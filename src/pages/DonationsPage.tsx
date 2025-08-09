import { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import type { ColumnDef } from "../components/ui/GenericTable";
import { mockDonations, type Donation } from "../data/mockDonation";
import GenericTable from "../components/ui/GenericTable";
import Modal from "../components/ui/Modal";
import DonationForm from "../components/donations/DonationsForm";
import { getDonations } from "../services/apiDonations";
import { useQuery } from "@tanstack/react-query";
import TableSkeleton from "../components/ui/TableSkeleton";

const StatusBadge = ({ status }: { status: Donation["status"] }) => {
  const statusClasses = {
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Canceled: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
};

const DonationsPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(
    null
  );

  const {
    data: donations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["donations"], // Kunci unik untuk query ini
    queryFn: getDonations, // Fungsi yang akan dijalankan untuk mengambil data
  });

  const handleOpenModal = (donation: Donation | null) => {
    setSelectedDonation(donation);
    setModalOpen(true);
  };

  // Tampilkan pesan error jika terjadi kesalahan
  if (isError) {
    return <div>Error fetching data. Please try again later.</div>;
  }

  // Definisikan kolom untuk GenericTable
  const columns: ColumnDef<Donation>[] = [
    {
      header: "Donor",
      accessorKey: "donor",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.donor.avatar}
            alt={row.donor.name}
            className="h-9 w-9 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">{row.donor.name}</p>
            <p className="text-gray-500">{row.id}</p>
          </div>
        </div>
      ),
    },
    { header: "Gol. Darah", accessorKey: "bloodType" },
    { header: "Tanggal Donasi", accessorKey: "donationDate" },
    { header: "Lokasi", accessorKey: "location" },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (row) => (
        <button
          onClick={() => handleOpenModal(row)}
          className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
        >
          <MoreHorizontal size={18} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Donations</h1>
          <p className="mt-1 text-gray-500">
            Kelola semua data donasi yang masuk.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal(null)}
          className="flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          <Plus size={16} /> Add Donation
        </button>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <TableSkeleton /> // <-- 2. Tampilkan skeleton saat loading
        ) : (
          <GenericTable columns={columns} data={donations || []} /> // <-- 3. Tampilkan tabel jika sudah selesai
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedDonation ? "Edit Donation" : "Add New Donation"}
      >
        <DonationForm onClose={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default DonationsPage;
