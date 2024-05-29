
// const User = require('../models/user.model');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// exports.getContent = async (req, res) => {
//   const user = await User.findById(req.user.id);
//   if (!user) return res.status(400).json({ message: 'User not found' });

//   const content = {
//     Basic: 'Basic Content',
//     Standard: 'Standard Content',
//     Premium: 'Premium Content',
//   };

//   res.status(200).json({ content: content[user.subscriptionPlan] });
// };


// exports.updateSubscription = async (req, res) => {
//   const { plan } = req.body;

//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(400).json({ message: 'User not found' });

//     const priceIdMap = {
//       Basic: 'price_basic',  // replace with actual price ID from Stripe
//       Standard: 'price_standard', // replace with actual price ID from Stripe
//       Premium: 'price_premium' // replace with actual price ID from Stripe
//     };

//     const priceId = priceIdMap[plan];
//     if (!priceId) return res.status(400).json({ message: 'Invalid plan' });

//     if (!user.stripeCustomerId) {
//       const customer = await stripe.customers.create({ email: user.email });
//       user.stripeCustomerId = customer.id;
//       await user.save();
//     }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       customer: user.stripeCustomerId,
//       line_items: [{
//         price: priceId,
//         quantity: 1,
//       }],
//       mode: 'subscription',
//       success_url: '',
//       cancel_url: '',
//     });

//     res.status(200).json({ sessionId: session.id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const User = require('../models/user.model');

exports.getContent = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const content = {
      Basic: 'Basic Content',
      Standard: 'Standard Content',
      Premium: 'Premium Content',
    };

    res.status(200).json({ content: content[user.subscriptionPlan] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSubscription = async (req, res) => {
  const { plan } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByIdAndUpdate(userId, { subscriptionPlan: plan }, { new: true });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // user.subscriptionPlan = plan;
    // await user.save();
    res.status(200).json({ user });

    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
