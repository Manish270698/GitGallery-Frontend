import React from "react";

const DonateUs = () => {
  return (
    <div className="bg-[#0D1117] text-[#f0f6fc] px-8 py-16 pt-28 min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl lg:text-4xl font-semibold mb-6">
          Support GitGallery
        </h1>
        <p className="text-base lg:text-xl mb-10">
          GitGallery aims to empower developers and showcase amazing projects.
          Your support will help us improve the platform, add new features, and
          maintain a seamless user experience.
        </p>

        {/* Donation Form */}
        <div className="bg-[#161B22] max-w-md mx-auto rounded-lg p-6 shadow-lg">
          <h2 className="text-lg lg:text-2xl font-semibold mb-4">
            Make a Contribution
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-left mb-2" htmlFor="amount">
                Donation Amount (₹)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="w-full bg-[#0D1117] border border-[#5e5f61] rounded-md py-2 px-4 text-[#f0f6fc]"
                placeholder="Enter amount"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0366d6] text-white py-2 px-4 rounded-md font-semibold hover:bg-[#024aad]"
            >
              Donate Now
            </button>
          </form>
        </div>

        {/* Thank You Section */}
        <div className="mt-10 text-sm text-[#5e5f61]">
          Your contribution means the world to us. Thank you for supporting
          GitGallery and helping us grow!
        </div>
      </div>
    </div>
  );
};

export default DonateUs;
