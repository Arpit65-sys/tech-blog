// components/contact/ContactForm.jsx
export default function ContactForm({
  formData,
  loading,
  responseMessage,
  handleChange,
  handleSubmit,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-6 rounded-xl shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Send Us a Message
      </h2>

      {/* Name */}
      <label className="block mb-3">
        <span className="text-gray-700 font-medium">Name *</span>
        <input
          required
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
        />
      </label>

      {/* Email */}
      <label className="block mb-3">
        <span className="text-gray-700 font-medium">Email *</span>
        <input
          required
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
        />
      </label>

      {/* Message */}
      <label className="block mb-3">
        <span className="text-gray-700 font-medium">Message *</span>
        <textarea
          required
          name="message"
          placeholder="Write your message..."
          rows="5"
          value={formData.message}
          onChange={handleChange}
          className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 outline-none resize-none"
        ></textarea>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition"
      >
        {loading ? "Submitting..." : "Submit Message"}
      </button>

      {responseMessage && (
        <p className="mt-4 text-center text-gray-700">{responseMessage}</p>
      )}
    </form>
  );
}
