import React from "react";

const RefundPolicy = () => {
  return (
    <div className="bg-[#0D1117] text-[#f0f6fc] px-8 py-16 pt-28">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl lg:text-4xl font-semibold mb-6">
          Refund Policy
        </h1>
        <p className="text-base lg:text-xl mb-8">
          At <span className="font-bold">GitGallery</span>, we strive to provide
          a seamless and trustworthy experience for all users. This Refund
          Policy explains the terms under which donations or payments may be
          refunded.
        </p>

        <div className="text-left space-y-6">
          <h2 className="text-lg lg:text-2xl font-bold">1. Donations</h2>
          <p>
            Donations made through GitGallery are voluntary contributions to
            support the development and maintenance of the platform. **Refunds
            for donations are not applicable** unless explicitly specified in
            exceptional circumstances.
          </p>

          <h2 className="text-lg lg:text-2xl font-bold">
            2. Exceptional Cases
          </h2>
          <p>Refunds may be considered in exceptional cases, such as:</p>
          <ul className="list-disc list-inside">
            <li>If a duplicate payment was made unintentionally.</li>
            <li>
              If a technical issue caused an incorrect amount to be charged.
            </li>
          </ul>

          <h2 className="text-lg lg:text-2xl font-bold">
            3. Refund Request Process
          </h2>
          <p>
            To request a refund, please contact us at{" "}
            <span className="font-bold">gitgallery0@gmail.com</span> within 7
            days of the transaction. Include the payment details, such as the
            transaction ID and the reason for the refund request.
          </p>

          <h2 className="text-lg lg:text-2xl font-bold">4. Processing Time</h2>
          <p>
            Approved refunds will be processed within 14 business days. Refunds
            will be credited back to the original payment method used during the
            transaction.
          </p>

          <h2 className="text-lg lg:text-2xl font-bold">
            5. Non-Refundable Cases
          </h2>
          <p>
            Refunds will not be applicable under the following circumstances:
          </p>
          <ul className="list-disc list-inside">
            <li>
              If the donation was made intentionally and no technical issue
              occurred.
            </li>
            <li>If the refund request is made after the 7-day period.</li>
          </ul>
        </div>

        <div className="mt-10 text-sm text-[#5e5f61]">
          If you have any questions regarding this Refund Policy, please contact
          us at{" "}
          <span className="font-bold underline">gitgallery0@gmail.com</span>.
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
