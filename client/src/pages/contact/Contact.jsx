import { useState } from "react";
import logo from "../../assets/images/logo.png";
import API from "../../utils/api";
import ContactForm from "../../components/contact/ContactForm";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const res = await API.post("/contact", formData);
      setResponseMessage(res.data.message || "Message submitted successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message ||
          "Server error. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center bg-gradient-to-r from-gray-400 to-gray-200 p-6 rounded-xl shadow-xl mb-10">
        <img src={logo} alt="TechQeeda Logo" className="h-14 mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Contact Us
        </h1>
        <p className="text-gray-700 mt-2">
          We'd love to hear from you — whether it's feedback, support, or
          collaboration!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Info */}
        <div className="bg-white bg-opacity-60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Get in Touch
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            Our team is here to help you! We reply within{" "}
            <span className="font-semibold text-gray-800">24–48 hours.</span>
          </p>

          <div className="space-y-3">
            <p>📧 Email: techqeedasupport@gmail.com</p>
            <p>🌍 Website: www.techqeeda.com</p>
            <p>🕒 Response Time: 24-48 Hours</p>
          </div>
        </div>

        {/* Right Form Component */}
        <ContactForm
          formData={formData}
          loading={loading}
          responseMessage={responseMessage}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>

      <p className="text-center text-gray-500 text-sm mt-10">
        🌱 We appreciate your effort in reaching out. Your message matters to
        us.
      </p>
    </div>
  );
}
