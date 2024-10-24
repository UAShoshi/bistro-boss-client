import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";




const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  
  return (
    <div>
      <section className="text-3xl uppercase py-4 mx-auto text-center md:w-4/12 my-8">PAYMENT</section>
      <div>
      <Elements stripe={stripePromise}>
      <CheckoutForm></CheckoutForm>
    </Elements>
      </div>
    </div>
  );
};

export default Payment;