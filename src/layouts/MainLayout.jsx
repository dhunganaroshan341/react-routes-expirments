import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      {/* Navbar */}
      <nav style={{ display: "flex", gap: "10px" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <hr />

      {/* Page content will appear here */}
      <Outlet />

      <hr />

      <footer>
        <p>Footer Section</p>
      </footer>
    </div>
  );
}