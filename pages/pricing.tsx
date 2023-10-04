
import React from 'react';
import Navbar from '../components/navbar';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    return (
        <form>
            <PaymentElement />
            <button>Submit</button>
        </form>
    );
};

export async function getServerSideProps(context) {
    const stripePromise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    return {
        props: {
            stripePromise
        }
    }
}

const Pricing = (props) => {
    console.log(props);

    const options = {
        clientSecret: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    };
    return (
        <div>
            <Navbar heading={true} />
            <div className="flex flex-col items-center justify-center">
                <Elements stripe={props.stripePromise} options={options}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Pricing;
