import { MoreHorizontal } from "lucide-react";
import type { Donation } from "../../data/mockDonation";

// Komponen kecil untuk badge status
const StatusBadge = ({ status }: { status: Donation["status"] }) => {
  const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
  const statusClasses = {
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Canceled: "bg-red-100 text-red-800",
  };
  return (
    <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>
  );
};

type DonationsTableProps = {
  donations: Donation[];
};

const DonationsTable = ({ donations }: DonationsTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead>
          <tr>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-900">
              Donor
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-900">
              Gol. Darah
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-900">
              Tanggal Donasi
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-900">
              Lokasi
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-900">
              Status
            </th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {donations.map((donation) => (
            <tr key={donation.id}>
              <td className="whitespace-nowrap px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={donation.donor.avatar}
                    alt={donation.donor.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {donation.donor.name}
                    </p>
                    <p className="text-gray-500">{donation.id}</p>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-800">
                {donation.bloodType}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                {donation.donationDate}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                {donation.location}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <StatusBadge status={donation.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <button className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                  <MoreHorizontal size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationsTable;
