import { useEffect, useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import type { ColumnDef } from "../components/ui/GenericTable";
import GenericTable from "../components/ui/GenericTable";
import Modal from "../components/ui/Modal";
import TableSkeleton from "../components/ui/TableSkeleton";
import { useUsers } from "../hooks/useUsers";
import type { UserResponse } from "../types/userTypes";
import UserForm from "../components/users/UserForm";
import { useAuth } from "../hooks/useAuth";

const UsersPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { users, error, fetchUsers, loading } = useUsers();
  const { registerAdmin } = useAuth();
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleOpenModal = (user: UserResponse | null) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  // Wrapper untuk handle submit dari form
  const handleRegisterSubmit = async (
    name: string,
    email: string,
    password: string
  ) => {
    await registerAdmin(email, password, name);
    fetchUsers();
  };

  if (error && !users) {
    return <div>Error fetching data. Please try again later.</div>;
  }

  const columns: ColumnDef<UserResponse>[] = [
    { header: "Name", accessorKey: "name" },
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
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          {/* Memperbaiki teks judul */}
          <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
          <p className="mt-1 text-gray-500">
            Kelola semua data pengguna dan admin.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal(null)}
          className="flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          <Plus size={16} /> Add User
        </button>
      </div>

      <div className="mt-6">
        {loading && !users?.length ? ( // Tampilkan skeleton hanya saat loading awal
          <TableSkeleton />
        ) : (
          <GenericTable columns={columns} data={users || []} />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedUser ? "Edit User" : "Add New User"}
      >
        {/* Teruskan fungsi onRegister dan data awal ke form */}
        <UserForm
          onClose={handleCloseModal}
          onRegister={handleRegisterSubmit}
          initialData={selectedUser}
        />
      </Modal>
    </div>
  );
};

export default UsersPage;
