import { useEffect, useState } from "react";
import api from "../api/axios";

const emptyForm = {
  name: "",
  phone: "",
  licenseNumber: "",
  licenseExpiry: "",
};

const DriversPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  /* =========================
     FETCH DRIVERS
     ========================= */
  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/drivers"); // ✅ correct
      setDrivers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load drivers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  /* =========================
     FORM HANDLING
     ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/drivers", form); // ✅ correct
      setForm(emptyForm);
      setShowForm(false);
      fetchDrivers();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to create driver. Try again."
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this driver?")) return;

    try {
      await api.delete(`/drivers/${id}`); // ✅ correct
      setDrivers((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete driver");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-slate-800">Drivers</h1>
        <button
          onClick={() => setShowForm((x) => !x)}
          className="px-3 py-2 rounded bg-slate-900 text-white text-sm"
        >
          {showForm ? "Close" : "Add Driver"}
        </button>
      </div>

      {/* ADD DRIVER FORM */}
      {showForm && (
        <div className="mb-4 bg-white rounded-xl border shadow p-4">
          <h2 className="text-sm font-semibold mb-3">Add New Driver</h2>

          {error && (
            <div className="mb-2 text-xs text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm"
          >
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ramesh Kumar"
              className="border rounded px-2 py-1.5"
              required
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="border rounded px-2 py-1.5"
              required
            />

            <input
              name="licenseNumber"
              value={form.licenseNumber}
              onChange={handleChange}
              placeholder="DL-2025-8899"
              className="border rounded px-2 py-1.5"
              required
            />

            <input
              type="date"
              name="licenseExpiry"
              value={form.licenseExpiry}
              onChange={handleChange}
              className="border rounded px-2 py-1.5"
            />

            <div className="md:col-span-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setForm(emptyForm);
                  setError("");
                }}
                className="px-3 py-1.5 border rounded text-xs"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-slate-900 text-white text-xs"
              >
                Save Driver
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DRIVERS TABLE */}
      {loading ? (
        <p className="text-sm text-slate-500">Loading...</p>
      ) : drivers.length === 0 ? (
        <p className="text-sm text-slate-500">
          No drivers found. Click "Add Driver" to create one.
        </p>
      ) : (
        <div className="bg-white rounded shadow border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Phone</th>
                <th className="px-3 py-2 text-left">License</th>
                <th className="px-3 py-2 text-left">Expiry</th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((d) => (
                <tr key={d._id} className="border-t">
                  <td className="px-3 py-2">{d.name}</td>
                  <td className="px-3 py-2">{d.phone}</td>
                  <td className="px-3 py-2">{d.licenseNumber}</td>
                  <td className="px-3 py-2">
                    {d.licenseExpiry
                      ? new Date(d.licenseExpiry).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => handleDelete(d._id)}
                      className="text-xs text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DriversPage;
