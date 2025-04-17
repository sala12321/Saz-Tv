
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-sports-dark flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
          
          <div className="prose prose-invert">
            <p className="text-gray-300 mb-4">
              At SazTV, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by SazTV and how we use it.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">1. Information We Collect</h2>
            <p className="text-gray-300 mb-4">
              When you visit our website, we may collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
            </p>
            <p className="text-gray-300 mb-4">
              Additionally, as you browse the site, we may collect information about the individual web pages that you view, what websites or search terms referred you to the site, and information about how you interact with the site.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-300 mb-4">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">3. Log Files</h2>
            <p className="text-gray-300 mb-4">
              SazTV follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">4. Cookies and Web Beacons</h2>
            <p className="text-gray-300 mb-4">
              Like any other website, SazTV uses cookies. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">5. Third Party Privacy Policies</h2>
            <p className="text-gray-300 mb-4">
              SazTV's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">6. Children's Information</h2>
            <p className="text-gray-300 mb-4">
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p className="text-gray-300 mb-4">
              SazTV does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">7. Consent</h2>
            <p className="text-gray-300 mb-4">
              By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
