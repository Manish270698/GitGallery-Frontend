import React from "react";

const FAQ = () => {
  return (
    <div className="bg-[#0D1117] text-[#f0f6fc] px-8 py-16 min-h-screen pt-28">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl lg:text-4xl font-semibold mb-6 text-center">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg lg:text-2xl font-semibold">
              1. What is GitGallery?
            </h2>
            <p>
              GitGallery is a platform designed to showcase GitHub repositories
              in an elegant and user-friendly way. It allows developers to
              display their work dynamically and interactively.
            </p>
          </div>

          <div>
            <h2 className="text-lg lg:text-2xl font-semibold">
              2. How do I add my GitHub repositories to GitGallery?
            </h2>
            <p>
              Simply log in to GitGallery and enter your GitHub username. The
              platform will fetch and display your repositories automatically.
            </p>
          </div>

          <div>
            <h2 className="text-lg lg:text-2xl font-semibold">
              3. What types of payments do you accept for donations?
            </h2>
            <p>
              Donations can be made securely through Razorpay. We accept
              credit/debit cards, UPI, wallets, and other payment methods
              supported by Razorpay.
            </p>
          </div>

          <div>
            <h2 className="text-lg lg:text-2xl font-semibold">
              4. Is my information safe on GitGallery?
            </h2>
            <p>
              Yes, we use industry-standard security measures to protect your
              data. Payments and sensitive information are securely handled
              through Razorpay.
            </p>
          </div>

          <div>
            <h2 className="text-lg lg:text-2xl font-semibold">
              5. Can I use GitGallery on mobile devices?
            </h2>
            <p>
              Absolutely! GitGallery is fully responsive and optimized for
              mobile, tablet, and desktop devices.
            </p>
          </div>

          <div>
            <h2 className="text-lg lg:text-2xl font-semibold">
              6. How can I contact the GitGallery team?
            </h2>
            <p>
              You can reach us through the{" "}
              <a href="/contact" className="text-[#f0f6fc] underline">
                Contact Us
              </a>{" "}
              page, or via email at{" "}
              <span className="font-semibold">support@gitgallery.com</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
