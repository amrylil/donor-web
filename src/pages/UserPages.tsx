import { useEffect, useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import type { ColumnDef } from "../components/ui/GenericTable";
import GenericTable from "../components/ui/GenericTable";
import Modal from "../components/ui/Modal";
import { useQuery } from "@tanstack/react-query";
import TableSkeleton from "../components/ui/TableSkeleton";
import { useUsers } from "../hooks/useUsers";
import type { UserResponse } from "../types/userTypes";
import UserForm from "../components/users/UserForm";

const UsersPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { users, error, fetchUsers, loading } = useUsers();
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    fetchUsers();
    console.log("Users data:", users);
  }, []);

  const handleOpenModal = (donation: UserResponse | null) => {
    setSelectedUser(donation);
    setModalOpen(true);
  };

  if (error) {
    return <div>Error fetching data. Please try again later.</div>;
  }

  // Definisikan kolom untuk GenericTable
  const columns: ColumnDef<UserResponse>[] = [
    {
      header: "Name",
      accessorKey: "name",
      // cell: (row) => (
      //   <div className="flex items-center gap-3">
      //     <img
      //       src={row.donor.avatar}
      //       alt={row.donor.name}
      //       className="h-9 w-9 rounded-full object-cover"
      //     />
      //     <div>
      //       <p className="font-medium text-gray-900">{row.donor.name}</p>
      //       <p className="text-gray-500">{row.id}</p>
      //     </div>
      //   </div>
      // ),
    },
    { header: "Email", accessorKey: "email" },
    { header: "Role", accessorKey: "role" },

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
        {loading ? (
          <TableSkeleton />
        ) : (
          <GenericTable columns={columns} data={users || []} />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedUser ? "Edit Donation" : "Add New Donation"}
      >
        <UserForm onClose={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default UsersPage;
