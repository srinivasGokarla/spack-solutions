
const User = require('../models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getContent = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const content = {
    Basic: 'Basic Content',
    Standard: 'Standard Content',
    Premium: 'Premium Content',
  };

  res.status(200).json({ content: content[user.subscriptionPlan] });
};

exports.updateSubscription = async (req, res) => {
  const { plan } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const priceIdMap = {
      Basic: 'price_basic',  // replace with actual price ID from Stripe
      Standard: 'price_standard', // replace with actual price ID from Stripe
      Premium: 'price_premium' // replace with actual price ID from Stripe
    };

    const priceId = priceIdMap[plan];
    if (!priceId) return res.status(400).json({ message: 'Invalid plan' });

    let subscription;
    if (user.stripeCustomerId) {
      const customer = await stripe.customers.retrieve(user.stripeCustomerId);
      const existingSubscription = customer.subscriptions.data[0];
      if (existingSubscription) {
        subscription = await stripe.subscriptions.update(existingSubscription.id, {
          items: [{ price: priceId }]
        });
      } else {
        subscription = await stripe.subscriptions.create({
          customer: user.stripeCustomerId,
          items: [{ price: priceId }],
        });
      }
    } else {
      const customer = await stripe.customers.create({ email: user.email });
      subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
      });
      user.stripeCustomerId = customer.id;
    }

    user.subscriptionPlan = plan;
    await user.save();

    res.status(200).json({ message: 'Subscription updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
