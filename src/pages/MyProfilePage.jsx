import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function MyProfilePage() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium">{user.name || "Admin"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Role</p>
          <p className="font-medium capitalize">{user.role}</p>
        </div>
      </div>
    </div>
  );
}
