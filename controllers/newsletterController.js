const axios = require("axios");
const { apiKey, serverPrefix, listId } = require("../configuration/mailchimp");

const subscribeUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const response = await axios.post(
      `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        email_address: email,
        status: "pending",
        merge_fields: { FNAME: name },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    res
      .status(200)
      .json({ message: "Successfully subscribed!", data: response.data });
  } catch (error) {
    console.error("Error subscribing user:", error);
    res
      .status(500)
      .json({ message: "Subscription failed.", error: error.message });
  }
};

module.exports = {
  subscribeUser,
};
