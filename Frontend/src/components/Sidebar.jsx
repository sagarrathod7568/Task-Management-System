import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      localStorage.clear();

      await Swal.fire({
        title: "Logged Out!",
        text: "You have been logged out successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/login");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="sidebar d-flex flex-column bg-light border-end shadow-sm"
    >
      <img className="sidebar-logo" src="/task_manager_logo.png" alt="Logo" />
      <hr />

      {/* Links */}
      <div className="d-flex flex-column gap-2">
        <Link
          to="/"
          className={`btn text-start ${
            isActive("/") ? "btn-primary text-white" : "btn-outline-primary"
          }`}
        >
          <>
            📊 <span className="sidebar-text">Dashboard</span>
          </>
        </Link>

        <Link
          to="/tasks"
          className={`btn text-start ${
            isActive("/tasks")
              ? "btn-primary text-white"
              : "btn-outline-primary"
          }`}
        >
          📌{" "}
          <span className="sidebar-text">
            {user?.role === "User" ? "My Tasks" : "All Tasks"}
          </span>
        </Link>

        {user?.role === "Admin" && (
          <>
            <hr />

            <small className="text-muted">ADMIN PANEL</small>

            <Link
              to="/admin/users"
              className={`btn text-start ${
                isActive("/admin/users")
                  ? "btn-danger text-white"
                  : "btn-outline-danger"
              }`}
            >
              👤 <span className="sidebar-text">User Management</span>
            </Link>

            <Link
              to="/admin/tasks"
              className={`btn text-start ${
                isActive("/admin/tasks")
                  ? "btn-danger text-white"
                  : "btn-outline-danger"
              }`}
            >
              📋 <span className="sidebar-text">Task Monitoring</span>
            </Link>

            <Link
              to="/admin/logs"
              className={`btn text-start ${
                isActive("/admin/logs")
                  ? "btn-danger text-white"
                  : "btn-outline-danger"
              }`}
            >
              📜 <span className="sidebar-text">Activity Logs</span>
            </Link>
          </>
        )}
      </div>

      {/* Logout */}
      <div className=" pt-5 mt-5">
        <button className="btn btn-dark w-100" onClick={logout}>
          🚪 <span className="sidebar-text">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
