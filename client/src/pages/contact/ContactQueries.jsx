import { useEffect, useState } from "react";
import API from "../../utils/api";
import QueryCard from "../../components/contact/QueryCard";
import Pagination from "../../components/Pagination";

export default function ContactQueries() {
  const [queries, setQueries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;
  const totalPages = Math.ceil(queries.length / pageSize);

  useEffect(() => {
    loadQueries();
  }, []);

  const loadQueries = async () => {
    try {
      const res = await API.get("/contact");
      setQueries(res.data);
    } catch (err) {
      console.error("Error loading queries", err);
    }
  };

  const handleResolve = async (id) => {
    try {
      await API.put(`/contact/seen-query/${id}`);

      // Update UI instantly
      setQueries((prev) =>
        prev.map((q) =>
          q.id === id ? { ...q, resolved: true } : q
        )
      );
    } catch (err) {
      console.error("Error resolving query", err);
    }
  };

  // Pagination Logic — slice current 5 items
  const paginatedData = queries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="max-w-5xl min-h-[25rem] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Queries</h1>

      {paginatedData.length ? (
        paginatedData.map((q) => (
          <QueryCard key={q.id} query={q} onResolve={handleResolve} />
        ))
      ) : (
        <p className="text-center text-gray-600">No queries found.</p>
      )}

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
