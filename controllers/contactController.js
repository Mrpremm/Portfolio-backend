import Contact from "../models/Contact.js";
import sendEmail from "../utils/sendEmail.js";

// @desc   Save contact message + send email
// @route  POST /api/contact
// @access Public
export const sendContactMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400);
      throw new Error("All fields are required");
    }

    // 1️⃣ Save to MongoDB
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    // 2️⃣ Send email to YOU
    await sendEmail({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    next(error);
  }
};
