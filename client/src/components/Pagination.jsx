export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center gap-2 mt-6">
      {/* Prev button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 border rounded-md disabled:opacity-40"
      >
        Prev
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md border 
            ${currentPage === page ? "bg-gray-800 text-white" : "bg-white"}
          `}
        >
          {page}
        </button>
      ))}

      {/* Next button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 border rounded-md disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
