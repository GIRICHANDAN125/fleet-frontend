import { NavLink, Outlet } from "react-router-dom";
import AdminProfileMenu from "./AdminProfileMenu";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-5 border-b border-slate-700">
          <h1 className="text-xl font-bold tracking-tight">FleetLite</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {/* active class will automatically highlight the current page */}
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-700 text-slate-300'}`
            }
          >
            Dashboard
          </NavLink>
          
          <NavLink to="/vehicles" className={({ isActive }) => `block px-3 py-2 rounded transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-700 text-slate-300'}`}>Vehicles</NavLink>
          <NavLink to="/drivers" className={({ isActive }) => `block px-3 py-2 rounded transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-700 text-slate-300'}`}>Drivers</NavLink>
          <NavLink to="/trips" className={({ isActive }) => `block px-3 py-2 rounded transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-700 text-slate-300'}`}>Trips</NavLink>
          <NavLink to="/tracking" className={({ isActive }) => `block px-3 py-2 rounded transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-700 text-slate-300'}`}>Tracking</NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white px-6 py-3 flex justify-between items-center shadow-sm border-b">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Fleet Management System</h2>
            <p className="text-xs text-gray-500">Logistics Control Panel</p>
          </div>
          
          {/* The new Profile Menu goes here */}
          <AdminProfileMenu />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}