import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { Webhook } from "svix";

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return res.status(500).json({ error: "Webhook secret not configured!" });
  }

  
  const headers = {
    "svix-id": req.headers["svix-id"],
    "svix-timestamp": req.headers["svix-timestamp"],
    "svix-signature": req.headers["svix-signature"]
  }
  const payload = req.body;
  

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
    console.log("✅ Verified event:", evt.type);

  } catch (err) {
    console.error("Webhook verification failed:", err);
    res.status(400).json({
      message: "Webhook verification failed!",
    });
  }

  if (!evt) {
    console.log("empty evt")
    return res.status(400).json({ error: "No event parsed after verification" });

  };

  if (evt.type === "user.created") {
    console.log("User created event data:", evt.data);
    const newUser = new User({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_img_url,
    });

    try {
      await newUser.save();
      res.status(201).json(
        {
            success:true,
            event:evt.type,
            msg:"UserSaved"
        
        })
      console.log("userSaved")
    } catch (err) {
     
      res.status(400).json("error in creating user ", err)
    }  }

  if (evt.type === "user.deleted") {
    const deletedUser = await User.findOneAndDelete({
      clerkUserId: evt.data.id,
    });

    await Post.deleteMany({user:deletedUser._id})
    await Comment.deleteMany({user:deletedUser._id})
    res.status(200).json({
      success:true,
      event:evt.type,
      msg:"deleteduser",
    })
  }

  // return res.status(200).json({
  //   message: "Webhook received",
  // });
};