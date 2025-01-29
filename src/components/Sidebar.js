import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar, handleLogout }) {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      
      <ul className="mt-4 space-y-4">
        <li>
          <a href="/students">Students</a>
        </li>
        <li>
          <a href="/login">Logout</a>
        </li>
      </ul>
    </div>
  );
}
