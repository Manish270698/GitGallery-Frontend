import React from "react";

const TermsConditions = () => {
  return (
    <div className="bg-[#0D1117] text-[#f0f6fc] px-8 py-16 min-h-screen pt-28">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl lg:text-4xl font-semibold mb-6 text-center">
          Terms & Conditions
        </h1>
        <p className="text-base lg:text-xl mb-8">
          Welcome to <span className="font-semibold">GitGallery</span>. By using
          our platform, you agree to comply with the following Terms &
          Conditions. Please read them carefully before proceeding.
        </p>

        <div className="space-y-6">
          <h2 className="text-lg lg:text-2xl font-semibold">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing GitGallery, you acknowledge that you have read,
            understood, and agree to be bound by these terms. If you do not
            agree, please refrain from using the platform.
          </p>

          <h2 className="text-lg lg:text-2xl font-semibold">
            2. Use of the Platform
          </h2>
          <ul className="list-disc list-inside">
            <li>You may use GitGallery for lawful purposes only.</li>
            <li>
              You are responsible for the content you upload and share through
              the platform.
            </li>
            <li>
              Unauthorized access or misuse of the platform is strictly
              prohibited.
            </li>
          </ul>

          <h2 className="text-lg lg:text-2xl font-semibold">3. Donations</h2>
          <p>
            All donations made through GitGallery are voluntary and
            non-refundable. We are committed to using contributions responsibly
            to improve the platform and support its development.
          </p>

          <h2 className="text-lg lg:text-2xl font-semibold">
            4. Intellectual Property
          </h2>
          <p>
            GitGallery and its content, including designs and code, are
            protected by intellectual property laws. You may not copy, modify,
            or redistribute any part of GitGallery without prior written
            consent.
          </p>

          <h2 className="text-lg lg:text-2xl font-semibold">
            5. Third-Party Services
          </h2>
          <p>
            GitGallery integrates with services such as Razorpay and GitHub API.
            These services have their own Terms & Conditions, and GitGallery is
            not responsible for their actions or policies.
          </p>

          <h2 className="text-lg lg:text-2xl font-semibold">
            6. Limitation of Liability
          </h2>
          <p>
            GitGallery is provided "as is" without warranties of any kind. We
            shall not be liable for any damages arising from the use of the
            platform or third-party integrations.
          </p>

          <h2 className="text-lg lg:text-2xl font-semibold">
            7. Modifications to Terms
          </h2>
          <p>
            We reserve the right to update these Terms & Conditions at any time.
            Continued use of GitGallery after changes indicates your acceptance
            of the revised terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
