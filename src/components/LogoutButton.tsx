export default function LogoutButton() {
  function handleLogout() {
    // Remove session (could be cookie or localStorage)
    localStorage.removeItem("user");
    window.location.href = "/";
  }
  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
}
