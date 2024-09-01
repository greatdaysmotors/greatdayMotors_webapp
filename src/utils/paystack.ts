// utils/paystack.ts

const paystackPayment = (
  amount: number,
  email: string,
  onSuccess: () => void
) => {
  if (!window.PaystackPop) {
    console.error("Paystack library is not loaded.");
    return;
  }

  const handler = window.PaystackPop.setup({
    key: "pk_test_7b253d342edfc96c63da319728cacdf4c862a559",
    email: email,
    amount: amount * 100, // Paystack expects the amount in kobo
    currency: "NGN",
    callback: () => {
      onSuccess();
      // Optionally, perform additional actions here, e.g., updating the backend
    },
    onClose: () => {
      console.log("Payment window closed");
    },
  });
  handler.openIframe();
};

export default paystackPayment;
