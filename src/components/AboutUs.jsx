const AboutUs = () => {
  return (
    <div className="bg-[#0D1117] text-[#f0f6fc] px-8 py-16 min-h-screen pt-28">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl lg:text-4xl font-semibold mb-6">About Us</h1>
        <p className="text-base lg:text-xl mb-8">
          Welcome to <span className="font-semibold">GitGallery</span>, the
          ultimate platform for showcasing GitHub repositories in style. We are
          passionate about empowering developers to share their work and explore
          amazing projects with ease. Our mission is to create an intuitive,
          user-friendly experience that transforms how you interact with your
          GitHub repositories.
        </p>
        <div className="text-left space-y-6">
          <h2 className="text-lg lg:text-2xl font-semibold">Our Vision</h2>
          <p>
            To become the go-to platform for developers who want to share their
            projects seamlessly and efficiently, making it easy for others to
            discover and engage with their work.
          </p>
          <h2 className="text-lg lg:text-2xl font-semibold">Our Journey</h2>
          <p>
            GitGallery was born from a desire to bridge the gap between
            developers and their audiences. With a focus on cutting-edge
            technology and user-friendly design, we’ve built a platform tailored
            to your needs.
          </p>
          <h2 className="text-lg lg:text-2xl font-semibold">
            What Sets Us Apart
          </h2>
          <ul className="list-disc list-inside">
            <li>
              Microservices architecture ensuring scalability and reliability.
            </li>
            <li>
              Seamless integration with the GitHub API to showcase repositories
              dynamically.
            </li>
            <li>
              Innovative frontend designs powered by React and TailwindCSS.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
