"use strict";

/**
 * Order.js controller
 *
 * @description: A set of functions called "actions" for managing `Order`.
 */

const stripe = require("stripe")(
  "sk_test_51IunD1IDzFABJACHXCen4DbxkAttwWCl8cn74TtIU5JXer7lk5ktIZmRTdss1Ta4RMVjhKtThM6earr8Dbun9w4D00gSUJaksu"
);

module.exports = {
  /**
   * Create a/an order record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const { address, amount, dishes, token, city, state } = JSON.parse(
      ctx.request.body
    );
    const stripeAmount = Math.floor(amount * 100);
    // charge on stripe
    const charge = await stripe.charges.create({
      // Transform cents to dollars.
      amount: stripeAmount,
      currency: "usd",
      description: `Order ${new Date()} by ${ctx.state.user._id}`,
      source: token,
    });

    // Register the order in the database
    const order = await strapi.services.order.create({
      user: ctx.state.user.id,
      charge_id: charge.id,
      amount: stripeAmount,
      address,
      dishes,
      city,
      state,
    });

    return order;
  },
};
