
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Dmca = () => {
  return (
    <div className="min-h-screen bg-sports-dark flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6">DMCA Policy</h1>
          
          <div className="prose prose-invert">
            <p className="text-gray-300 mb-4">
              SazTV respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998, the text of which may be found on the U.S. Copyright Office website at http://www.copyright.gov/legislation/dmca.pdf, SazTV will respond expeditiously to claims of copyright infringement committed using our service that are reported.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">Notification of Claimed Copyright Infringement</h2>
            <p className="text-gray-300 mb-4">
              If you are a copyright owner, or are authorized to act on behalf of one, or authorized to act under any exclusive right under copyright, please report alleged copyright infringements taking place on or through the Site by completing the following DMCA Notice of Alleged Infringement and delivering it to our Designated Copyright Agent.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">DMCA Notice of Alleged Infringement ("Notice")</h2>
            <ol className="list-decimal pl-6 text-gray-300 mb-4">
              <li>Identify the copyrighted work that you claim has been infringed, or if multiple copyrighted works are covered by this Notice, you may provide a representative list of the copyrighted works that you claim have been infringed.</li>
              <li>Identify the material or link you claim is infringing (or the subject of infringing activity) and to which access is to be disabled, including at a minimum, if applicable, the URL of the link or the exact location where such material may be found.</li>
              <li>Provide your company affiliation (if applicable), mailing address, telephone number, and, if available, email address.</li>
              <li>Include both of the following statements in the body of the Notice:
                <ul className="list-disc pl-6 text-gray-300 mb-4">
                  <li>"I hereby state that I have a good faith belief that the disputed use of the copyrighted material is not authorized by the copyright owner, its agent, or the law (e.g., as a fair use)."</li>
                  <li>"I hereby state that the information in this Notice is accurate and, under penalty of perjury, that I am the owner, or authorized to act on behalf of, the owner, of the copyright or of an exclusive right under the copyright that is allegedly infringed."</li>
                </ul>
              </li>
              <li>Provide your full legal name and your electronic or physical signature.</li>
            </ol>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">Deliver this Notice, with all items completed, to our Designated Copyright Agent:</h2>
            <p className="text-gray-300 mb-4">
              Copyright Agent<br />
              SazTV<br />
              [Email Address]<br />
              [Physical Address]
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">Counter Notification</h2>
            <p className="text-gray-300 mb-4">
              If you believe that your content that was removed (or to which access was disabled) is not infringing, or that you have the authorization from the copyright owner, the copyright owner's agent, or pursuant to the law, to post and use the material in your content, you may send a counter-notification containing the following information to the Designated Copyright Agent:
            </p>
            <ul className="list-disc pl-6 text-gray-300 mb-4">
              <li>Your physical or electronic signature;</li>
              <li>Identification of the content that has been removed or to which access has been disabled and the location at which the content appeared before it was removed or disabled;</li>
              <li>A statement that you have a good faith belief that the content was removed or disabled as a result of a mistake or a misidentification of the content; and</li>
              <li>Your name, address, telephone number, and email address, a statement that you consent to the jurisdiction of the federal court in the district where you live, and a statement that you will accept service of process from the person who provided notification of the alleged infringement.</li>
            </ul>

            <p className="text-gray-300 mb-4">
              If a counter-notification is received by the Designated Copyright Agent, we may send a copy of the counter-notification to the original complaining party informing that person that it may replace the removed content or cease disabling it in 10 business days. Unless the copyright owner files an action seeking a court order against the content provider, member or user, the removed content may be replaced, or access to it restored, in 10 to 14 business days or more after receipt of the counter-notice, at our sole discretion.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dmca;
