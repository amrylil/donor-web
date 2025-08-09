const DonationForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <form>
      <div className="space-y-4">
        <div>
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="donorName"
          >
            Nama Pendonor
          </label>
          <input
            type="text"
            id="donorName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
        <div>
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="bloodType"
          >
            Golongan Darah
          </label>
          <select
            id="bloodType"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          >
            <option>A+</option>
            <option>O-</option>
            {/* ...opsi lain */}
          </select>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};
export default DonationForm;
