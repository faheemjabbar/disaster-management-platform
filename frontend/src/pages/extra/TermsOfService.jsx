const TermsOfService = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-[#2F2F2F] mb-8">Terms of Service</h1>

        <div className="space-y-6 text-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing Revive, you agree to these Terms of Service. If you disagree with any part,
              you may not use our platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. User Responsibilities</h2>
            <p>
              Volunteers must attend confirmed campaigns. NGOs must provide accurate campaign details
              and treat volunteers professionally.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Prohibited Activities</h2>
            <p>
              Users may not post false information, harass others, or use the platform for commercial
              purposes unrelated to disaster relief.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Account Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate these terms or engage
              in harmful behavior.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Liability</h2>
            <p>
              Revive is a coordination platform. We are not responsible for incidents occurring during
              relief operations. Users participate at their own risk.
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-8">Last updated: January 2025</p>
      </div>
    </section>
  );
};

export default TermsOfService;
