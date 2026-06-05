import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-5 space-y-4">
        <h2 className="text-xl font-bold">Dashboard</h2>

        <Link to="/dashboard">Home</Link>
        <br />
        <Link to="/profile">Profile</Link>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
      </div>

    </div>
  );
}