## Table Of contents
* [General info](#general-info)
* [How to use](#how-to-use)
* [Setup](#setup)

## General info
This Project is just a single landing page.
I've integrated Razor pay for payment but it's only for testing purpose no real money is involved.
Just Used React for this project no backend.

Little bit of transitions are added to some components to enhance the UI.

## How To Use
1. After the project is installed and you are running it locally,
we have a simple UI that shows two products in the cart.

2. First you have to select a delivery method (without it the app will give error in payment with razor pay.)

3. The *Total price* will change according to the delivery charges of the particular method.

4. Then click on *Proceed to payment* button to open the razor pay UI.

5. If it asks you your phone number, give it will ask the OTP, submit the OTP and you're ready to go.

6. After that it will ask the *Payment method*, Just click card payment method and add this card 

7. You can trust this process as *no real money* is involved this is just for testing purpose. 

```
Card Number - 4111 1111 1111 1111
Cvv - Any random number.
Expiry date - any future date.
```

Note : If this card doesn't work just google for *Razor pay test cards* all cards will show up.

## Setup
To run this project, install or clone this Repo and run :

```
$ npm install
$ npm run start
```
