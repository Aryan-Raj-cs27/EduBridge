export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('/about-bg.jpg')", // Make sure to place the image in the public folder
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark overlay */}
        <div className="relative text-center text-white">
          <h1 className="text-5xl font-bold">About Us</h1>
          <p className="text-lg mt-2">For explorers everywhere.</p>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-4xl mx-auto text-center py-12 px-6">
        <p className="text-gray-700 text-lg">
          We believe that education should be accessible to everyone. EduBridge AI helps underprivileged students learn in a personalized way, breaking barriers through adaptive learning technology.
        </p>
      </div>

      {/* Contact Info */}
      <div className="text-center pb-10">
        <p className="text-gray-600 text-lg">Customer Care: +91 9031859167</p>
      </div>
    </div>
  );
}
