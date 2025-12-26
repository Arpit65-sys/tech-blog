import API from "../../utils/api";

export default function ExportUsersButton({ className }) {
  
  const downloadUsersCSV = async () => {
    // Confirm before exporting
    const confirmed = window.confirm("Are you sure you want to export all users?");
    if (!confirmed) return;

    try {
      const response = await API.get("/users/export", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err) {
      alert("Failed to export users.");
    }
  };

  return (
    <button
      onClick={downloadUsersCSV}
      className={className}
    >
      📄 Export Users
    </button>
  );
}
