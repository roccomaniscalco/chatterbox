import Pusher from "pusher";

export const getPusher = () => {
  if (!global.pusher) {
    // save pusher instance in global object for reuse
    global.pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      secret: process.env.PUSHER_SECRET,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      useTLS: true,
    });
  }

  return global.pusher;
};
