import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#0D1117] text-[#f0f6fc] px-8 py-16 min-h-screen pt-28">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="text-lg mb-8">
          At <span className="font-semibold">GitGallery</span>, your privacy is
          important to us. This Privacy Policy outlines the types of information
          we collect, how we use it, and how we protect your data when you use
          our platform.
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email
            address, and GitHub username when you sign up or interact with
            GitGallery. Additionally, non-personal information like your IP
            address and browser type may be automatically collected for
            analytical purposes.
          </p>

          <h2 className="text-2xl font-semibold">
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside">
            <li>To display your GitHub repositories on our platform.</li>
            <li>
              To improve the functionality and user experience of GitGallery.
            </li>
            <li>
              To communicate updates, features, or relevant information about
              the platform.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold">How We Protect Your Data</h2>
          <p>
            We use industry-standard security measures to protect your data from
            unauthorized access, disclosure, or misuse. Payments and sensitive
            information are handled securely via Razorpay, ensuring compliance
            with their robust data protection protocols.
          </p>

          <h2 className="text-2xl font-semibold">Third-Party Services</h2>
          <p>
            GitGallery integrates with third-party services such as Razorpay for
            payment processing and GitHub API for repository data. These
            services have their own privacy policies, and we recommend reviewing
            them.
          </p>

          <h2 className="text-2xl font-semibold">Your Rights</h2>
          <p>
            You have the right to access, update, or delete your information
            stored on GitGallery. For assistance, please contact us via the
            details provided on the Contact Us page.
          </p>

          <h2 className="text-2xl font-semibold">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically to reflect changes in
            our practices or services. Please check back regularly to stay
            informed about how we protect your data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
