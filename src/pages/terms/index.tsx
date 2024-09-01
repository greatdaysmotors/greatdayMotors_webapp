import Container from "@layouts/Container";
import MainLayout from "@layouts/MainLayout";

const TermAndConditions = () => {
  return (
    <MainLayout>
      <Container>
        <div className="flex flex-col w-full md:h-full relative mx-auto my-8 lg:my-14">
          <h1 className=" text-center mb-8 text-[1.8rem] md:text-[2rem] font-[700]">
            Terms and Conditions
          </h1>
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="mb-2 text-[1.6rem] lg:text-[1.8rem] font-[700]">
                1. Services Provided
              </h2>
              <p className="text-[1.4rem] lg:text-[1.6rem] font-[500]">
                Great Day Motors offers transportation services, including but
                not limited to passenger transport and freight transport.
                Services are subject to availability and may vary based on
                location.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-[1.6rem] lg:text-[1.8rem] font-[700]">
                2. Booking and Payment
              </h2>
              <p className="text-[1.4rem] lg:text-[1.6rem] font-[500]">
                All bookings must be made through our booking platform, website,
                or app. Payment must be made in full at the time of booking
                unless otherwise agreed. We accept [list accepted payment
                methods].
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-[1.6rem] lg:text-[1.8rem] font-[700]">
                3. Cancellations and Refunds
              </h2>
              <p className="text-[1.4rem] lg:text-[1.6rem] font-[500]">
                Cancellations must be made [number] hours before the scheduled
                service to receive a full refund. Late cancellations or no-shows
                will be charged in full. Refunds will be processed within
                [number] business days.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-[1.6rem] lg:text-[1.8rem] font-[700]">
                4. Passenger Responsibilities
              </h2>
              <p className="text-[1.4rem] lg:text-[1.6rem] font-[500]">
                Passengers must arrive at the pickup location on time.
                Passengers must comply with all safety regulations, including
                seatbelt usage. Any damage caused by the passenger will be the
                passenger's responsibility.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-[1.6rem] lg:text-[1.8rem] font-[700]">
                5. Company Responsibilities
              </h2>
              <p className="text-[1.4rem] lg:text-[1.6rem] font-[500]">
                We will make every effort to arrive at the scheduled pickup
                time. In the event of delays, we will notify passengers as soon
                as possible. We are not liable for delays caused by traffic,
                weather, or other factors beyond our control.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-[1.6rem] lg:text-[1.8rem] font-[700]">
                6. Liability
              </h2>
              <p className="text-[1.4rem] lg:text-[1.6rem] font-[500]">
                Great Day Motors is not responsible for loss or damage to
                personal belongings during transportation. We are not liable for
                any indirect, incidental, or consequential damages arising from
                our services.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-[1.6rem] lg:text-[1.8rem] font-[700]">
                7. Changes to Terms
              </h2>
              <p className="text-[1.4rem] lg:text-[1.6rem] font-[500]">
                Great Day Motors reserves the right to modify these terms at any
                time. Changes will be effective immediately upon posting on our
                website.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default TermAndConditions;
