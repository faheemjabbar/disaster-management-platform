const PrivacyPolicy = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-[#2F2F2F] mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide when registering, including name, email, phone number,
              and location data. For NGOs, we also collect organization details and registration IDs.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p>
              Your information is used to connect volunteers with relief campaigns, verify identities,
              and improve our platform. We never sell your personal data to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data, including
              encrypted connections and secure database storage.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Your Rights</h2>
            <p>
              You have the right to access, modify, or delete your personal information at any time
              through your account settings or by contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Contact Us</h2>
            <p>
              For privacy concerns or questions, email us at privacy@revive.org or call +92 300 1234567.
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-8">Last updated: January 2025</p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;