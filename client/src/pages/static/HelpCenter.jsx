export default function HelpCenter() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:py-12">
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-6 text-gray-800">
        Help Center
      </h1>
      
      <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6">
        Welcome to the TechQeeda Help Center! Here you will find answers to common
        questions and guidance on how to use our platform.
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
            🔹 How to create an account?
          </h2>
          <p className="text-sm sm:text-base md:text-md text-gray-600">
            Click on <strong>Login / Sign Up</strong> in the navbar and follow the steps.
          </p>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
            🔹 How do I create a blog post?
          </h2>
          <p className="text-sm sm:text-base md:text-md text-gray-600">
            Login → Go to <strong>Dashboard</strong> → Click on <strong>Create Post</strong>.
          </p>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
            🔹 How can I delete or edit my post?
          </h2>
          <p className="text-sm sm:text-base md:text-md text-gray-600">
            Go to your dashboard, find your post, then click on <strong>Edit</strong> or <strong>Delete</strong>.
          </p>
        </div>
      </div>

      <p className="mt-8 md:mt-10 text-xs sm:text-sm md:text-sm text-gray-500">
        Still need help? Contact us at: 👉 <span className="text-blue-600">techqeedasupport@gmail.com</span>
      </p>
    </div>
  );
}
