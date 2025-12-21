import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminProfileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();               // ✅ clear auth properly
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow hover:bg-gray-100"
      >
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
          {user?.email?.[0]?.toUpperCase() || "A"}
        </div>
        <span className="text-sm font-medium">
          {user?.name || "Admin"}
        </span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border z-50">
          <div className="p-4 border-b">
            <p className="font-semibold">{user?.name || "Admin"}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <p className="text-xs text-blue-600 mt-1 capitalize">
              {user?.role}
            </p>
          </div>

          <div className="p-2">
            {/* MY PROFILE */}
            <button
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100"
            >
              👤 My Profile
            </button>

            {/* CHANGE PASSWORD */}
            <button
              onClick={() => {
                setOpen(false);
                navigate("/change-password");
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100"
            >
              🔑 Change Password
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
