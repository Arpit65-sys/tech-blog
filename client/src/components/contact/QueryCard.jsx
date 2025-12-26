export default function QueryCard({ query, onResolve }) {
  return (
    <div className="bg-white my-4 p-5 border rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold">{query.name}</h2>
      <p className="text-gray-700">{query.email}</p>
      <p className="text-gray-600 mt-2">{query.message}</p>

      <div className="flex items-center justify-between mt-4">
        <span
          className={`text-sm px-3 py-1 rounded-full 
            ${query.resolved ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}
          `}
        >
          {query.resolved ? "Resolved" : "Pending"}
        </span>

        {!query.resolved && (
          <button
            onClick={() => {
              if (confirm("Are you sure this query is resolved?")) {
                onResolve(query.id);
              }
            }}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-black"
          >
            Mark Resolved
          </button>
        )}
      </div>
    </div>
  );
}
