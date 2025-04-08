export const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-[#1E1E1E] text-white flex flex-col items-center px-6 py-10">
            <div className="max-w-4xl w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

                <div className="bg-[#2D2D2D] rounded-lg mb-8 p-8 space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold">Introduction</h2>
                        <p className="text-sm mt-3 leading-relaxed text-[#E0E0E0]">
                            At CineNiche, your privacy is of utmost importance. This Privacy Policy explains how we collect,
                            use, disclose, and safeguard your information when you visit our streaming platform. We are committed
                            to protecting your personal data and ensuring transparency regarding the information we gather.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">1. Information We Collect</h2>
                        <div className="text-sm mt-3 leading-relaxed text-[#E0E0E0]">
                            When you use CineNiche, we may collect the following types of information:
                            <ul className="list-disc list-inside mt-2">
                                <li>Personal Identification Information (Name, email address, phone number)</li>
                                <li>Account credentials and subscription details</li>
                                <li>Payment information and billing address</li>
                                <li>Device information including IP address, browser type, and operating system</li>
                                <li>Viewing history, preferences, and user interactions with content</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
                        <div className="text-sm mt-3 leading-relaxed text-[#E0E0E0]">
                            We use the information we collect to:
                            <ul className="list-disc list-inside mt-2">
                                <li>Provide, operate, and maintain CineNiche</li>
                                <li>Improve your personalized experience and recommend relevant content</li>
                                <li>Process transactions and manage subscriptions</li>
                                <li>Communicate with you about your account, updates, and marketing offers</li>
                                <li>Analyze user behavior to improve the platform</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">3. Sharing and Disclosure</h2>
                        <div className="text-sm mt-3 leading-relaxed text-[#E0E0E0]">
                            We do not sell your personal data. However, we may share your information with:
                            <ul className="list-disc list-inside mt-2">
                                <li>Trusted service providers who help us operate CineNiche</li>
                                <li>Payment processors to complete your transactions</li>
                                <li>Law enforcement or regulatory bodies when required by law</li>
                                <li>Analytics and advertising partners in anonymized and aggregated formats</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">4. Cookies and Tracking Technologies</h2>
                        <p className="text-sm mt-3 leading-relaxed text-[#E0E0E0]">
                            CineNiche uses cookies and similar tracking technologies to enhance user experience, analyze
                            trends, and deliver personalized ads. You may choose to disable cookies through your browser
                            settings, but some features of the service may not function properly.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">5. Data Security</h2>
                        <p className="text-sm mt-3 leading-relaxed text-[#E0E0E0]">
                            We implement robust security measures to protect your data. All sensitive information is encrypted
                            and transmitted using secure protocols. Access to your personal information is limited to authorized
                            personnel only.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">6. Your Rights</h2>
                        <p className="text-sm mt-3 leading-relaxed text-[#E0E0E0]">
                            You have the right to access, update, or delete your personal data at any time. You may also opt
                            out of receiving marketing communications. To exercise your rights, contact us at privacy@cineniche.com.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">7. Children's Privacy</h2>
                        <p className="text-sm mt-3 leading-relaxed text-[#E0E0E0]">
                            CineNiche is not intended for children under the age of 13. We do not knowingly collect personal
                            information from children. If we become aware that we have inadvertently collected such data,
                            we will take steps to delete it promptly.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">8. Changes to This Policy</h2>
                        <p className="text-sm mt-3 leading-relaxed text-[#E0E0E0]">
                            We may update this Privacy Policy periodically. Any changes will be posted on this page with
                            an updated revision date. Continued use of CineNiche after such changes indicates acceptance
                            of the revised policy.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">9. Contact Us</h2>
                        <p className="text-sm mt-3 leading-relaxed text-[#E0E0E0]">
                            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                        </p>
                        <p className="text-sm mt-2 leading-relaxed text-[#E0E0E0]">
                            CineNiche<br />
                            123 Streaming Lane<br />
                            Los Angeles, CA 90001<br />
                            Email: privacy@cineniche.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};