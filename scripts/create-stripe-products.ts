import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

async function createProducts() {
  try {
    // Create Starter Product
    const starterProduct = await stripe.products.create({
      name: 'Starter Plan',
      description: 'Perfect for individuals and small projects',
    });

    const starterMonthlyPrice = await stripe.prices.create({
      product: starterProduct.id,
      unit_amount: 900, // $9.00
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
    });

    const starterYearlyPrice = await stripe.prices.create({
      product: starterProduct.id,
      unit_amount: 8600, // $86.00 (20% off)
      currency: 'usd',
      recurring: {
        interval: 'year',
      },
    });

    // Create Pro Product
    const proProduct = await stripe.products.create({
      name: 'Pro Plan',
      description: 'For growing teams and advanced features',
    });

    const proMonthlyPrice = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: 3200, // $32.00
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
    });

    const proYearlyPrice = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: 30700, // $307.00 (20% off)
      currency: 'usd',
      recurring: {
        interval: 'year',
      },
    });

    // Create Team Product
    const teamProduct = await stripe.products.create({
      name: 'Team Plan',
      description: 'For large organizations with enterprise needs',
    });

    const teamMonthlyPrice = await stripe.prices.create({
      product: teamProduct.id,
      unit_amount: 9900, // $99.00
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
    });

    const teamYearlyPrice = await stripe.prices.create({
      product: teamProduct.id,
      unit_amount: 95000, // $950.00 (20% off)
      currency: 'usd',
      recurring: {
        interval: 'year',
      },
    });

    console.log('Products and Prices created successfully!');
    console.log('\nAdd these price IDs to your .env.local file:\n');
    console.log(`STRIPE_STARTER_MONTHLY_PRICE_ID=${starterMonthlyPrice.id}`);
    console.log(`STRIPE_STARTER_YEARLY_PRICE_ID=${starterYearlyPrice.id}`);
    console.log(`STRIPE_PRO_MONTHLY_PRICE_ID=${proMonthlyPrice.id}`);
    console.log(`STRIPE_PRO_YEARLY_PRICE_ID=${proYearlyPrice.id}`);
    console.log(`STRIPE_TEAM_MONTHLY_PRICE_ID=${teamMonthlyPrice.id}`);
    console.log(`STRIPE_TEAM_YEARLY_PRICE_ID=${teamYearlyPrice.id}`);

  } catch (error) {
    console.error('Error creating products:', error);
  }
}

createProducts();