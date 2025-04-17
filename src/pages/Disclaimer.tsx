
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-sports-dark flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Disclaimer</h1>
          
          <div className="prose prose-invert">
            <h2 className="text-xl font-semibold text-white mt-6 mb-4">Website Disclaimer</h2>
            <p className="text-gray-300 mb-4">
              The information provided by SazTV ("we," "us," or "our") on our website is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">Content Disclaimer</h2>
            <p className="text-gray-300 mb-4">
              SazTV serves as an index and guide to streaming sports content available online. We do not host any content, we do not upload any videos, and we do not provide download options for any streams or videos. We simply provide links to content hosted elsewhere on the web.
            </p>
            <p className="text-gray-300 mb-4">
              The streaming links provided on our website direct users to content uploaded and hosted by third-party websites. We have no control over the content of these websites and we cannot take any responsibility for the content they provide.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">External Links Disclaimer</h2>
            <p className="text-gray-300 mb-4">
              The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">Fair Use Disclaimer</h2>
            <p className="text-gray-300 mb-4">
              This website contains copyrighted material the use of which has not always been specifically authorized by the copyright owner. We are making such material available in our efforts to provide sports streaming information to our visitors. We believe this constitutes a 'fair use' of any such copyrighted material as provided for in section 107 of the US Copyright Law.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">No Responsibility Disclaimer</h2>
            <p className="text-gray-300 mb-4">
              The information on the website is provided with the understanding that SazTV is not herein engaged in rendering legal, accounting, tax, or other professional advice and services. As such, it should not be used as a substitute for consultation with professional accounting, tax, legal, or other competent advisers.
            </p>
            <p className="text-gray-300 mb-4">
              In no event shall SazTV or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever arising out of or in connection with your access or use or inability to access or use the website.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">Educational Purpose</h2>
            <p className="text-gray-300 mb-4">
              This is a demo website created for educational purposes only. No real services are provided through this platform.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Disclaimer;
