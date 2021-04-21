import React, { useMemo } from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";
import './Book.css'
import ResponsiveFont from "./ResponsiveFont";

const useOptions = () => {
    const fontSize = ResponsiveFont();
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#9e2146"
                }
            }
        }),
        [fontSize]
    );

    return options;
};

const SplitCard = ({paymentMethodSuccess}) => {
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement)
        });

        if (error) {
            console.log('[error]', error);
          } else {
            console.log('[PaymentMethod]', paymentMethod);
            paymentMethodSuccess(paymentMethod.id)
          }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column">
                <label className="stripLabel">
                    Card number
                    <CardNumberElement options={options} />
                </label>
                <label className="stripLabel">
                    Expiration date
                    <CardExpiryElement options={options} />
                </label>
                <label className="stripLabel">
                    CVC
                    <CardCvcElement options={options} />
                </label>
            </div>
            <button className="stripeBtn" type="submit" disabled={!stripe}>Pay</button>
        </form>
    );
};

export default SplitCard;