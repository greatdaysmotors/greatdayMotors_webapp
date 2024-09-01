import Container from "@layouts/Container";
import MainLayout from "@layouts/MainLayout";

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <Container>
        <div className="flex flex-col w-full md:h-full relative mx-auto my-8 lg:my-14">
          <h1 className="text-center mb-8 text-[1.8rem] md:text-[2rem] font-[700]">
            Privacy Policy
          </h1>
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="mb-2 text-[1.6rem] lg:text-[1.8rem] font-[700]">
                1. Introduction
              </h2>
              <p className="text-[1.4rem] lg:text-[1.6rem] font-[500]">
                Great Day Motors is committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, and safeguard your
                personal information.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-[1.6rem] lg:text-[1.8rem] font-[700]">
                2. Information We Collect
              </h2>
              <p className="text-[1.4rem] lg:text-[1.6rem] font-[500]">
                We collect information that you provide directly to us, such as
                when you create an account, make a booking, or contact us. This
                may include your name, email address, phone number, and payment
                details.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-[1.6rem] lg:text-[1.8rem] font-[700]">
                3. How We Use Your Information
              </h2>
              <p className="text-[1.4rem] lg:text-[1.6rem] font-[500]">
                We use your information to provide, maintain, and improve our
                services, process transactions, send you communications, and
                comply with legal obligations.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-[1.6rem] lg:text-[1.8rem] font-[700]">
                4. Sharing of Information
              </h2>
              <p className="text-[1.4rem] lg:text-[1.6rem] font-[500]">
                We do not share your personal information with third parties
                except as necessary to provide our services, comply with legal
                obligations, or with your consent.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-[1.6rem] lg:text-[1.8rem] font-[700]">
                5. Data Security
              </h2>
              <p className="text-[1.4rem] lg:text-[1.6rem] font-[500]">
                We implement security measures to protect your information from
                unauthorized access and use. However, no method of transmission
                over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-[1.6rem] lg:text-[1.8rem] font-[700]">
                6. Your Rights
              </h2>
              <p className="text-[1.4rem] lg:text-[1.6rem] font-[500]">
                You have the right to access, update, or delete your personal
                information. You can also opt-out of receiving marketing
                communications from us.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-[1.6rem] lg:text-[1.8rem] font-[700]">
                7. Changes to this Privacy Policy
              </h2>
              <p className="text-[1.4rem] lg:text-[1.6rem] font-[500]">
                Great Day Motors reserves the right to update this Privacy
                Policy at any time. Any changes will be effective immediately
                upon posting on our website.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default PrivacyPolicy;
