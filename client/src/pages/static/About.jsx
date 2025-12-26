import logo from "../../assets/images/logo.png";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto p-6 md:py-12">
      {/* Header Section */}
      <div className="text-center bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-10 rounded-2xl shadow-xl mb-12">
        <img
          src={logo}
          alt="TechQeeda Logo"
          className="h-10 md:h-16 mx-auto mb-5 drop-shadow-md"
        />
        <h1 className="text-2xl md:text-5xl font-extrabold text-white tracking-wide">
          About <span className="text-purple-400">TechQeeda</span>
        </h1>
        <p className="text-gray-300 mt-3 max-w-2xl mx-auto md:text-lg">
          Where technology, creativity, and community evolve together.
        </p>
      </div>

      {/* Content Section */}
      <div className="space-y-8 text-gray-700 md:text-lg leading-8">
        <p>
          TechQeeda was founded with a simple vision — to create a space where
          knowledge meets creativity. In today’s fast-paced tech-driven world,
          staying relevant requires continuous learning, sharing, and
          innovation. We built TechQeeda to help learners, creators, and
          professionals come together to explore and share valuable insights.
        </p>

        <p>
          Our platform allows users to publish blog posts, explore trending
          technological ideas, and grow their digital presence. Whether you are
          a student beginning your journey, a developer experimenting with tools,
          or a tech enthusiast eager to share your voice — TechQeeda is your
          home.
        </p>

        <p>
          We believe learning becomes powerful when it becomes accessible.
          That’s why our platform is free, user-friendly, and built to support
          collaboration. Over time, we aim to introduce community features,
          mentorship programs, and premium tools to empower creators globally.
        </p>
      </div>

      {/* Mission Card */}
      <div className="mt-14 bg-white shadow-lg rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
        <h2 className="text-xl md:text-3xl font-semibold text-gray-900 mb-4">
          📌 Our Mission
        </h2>
        <p className="text-gray-700 leading-7 md:text-lg">
          To inspire curiosity, enable learning, and build a digital community
          where knowledge becomes a shared experience — not a barrier.
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-300 opacity-40 my-10" />

      {/* Final Line */}
      <p className="text-center text-gray-600 text-base">
        🚀 Let’s build the future of learning, together.
      </p>
    </div>
  );
}
