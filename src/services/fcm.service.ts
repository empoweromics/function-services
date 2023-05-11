import { getMessaging, Message } from "firebase-admin/messaging";

const handleFcmPromise = async (promise: Promise<unknown>) => {
  try {
    const info = await promise;
    return { result: info, error: null };
  } catch (err) {
    console.error("Error in FCM, ", err);
    return {
      error: err,
      result: null
    };
  }
};

export const sendByToken = (
  token: string,
  body: string,
  data: Record<string, string>
) => {
  const message: Message = {
    // this may vary according to the message type (single recipient, multicast, topic, et cetera)
    token: token,
    // collapse_key: 'your_collapse_key',
    notification: {
      title: "Empoweromics",
      body: body
    },
    data
  };
  return handleFcmPromise(getMessaging().send(message));
};

export const SubscribeToTopic = (tokens = [], topic: string) => {
  handleFcmPromise(getMessaging().subscribeToTopic(tokens, topic));
};

export const UnsubscribeToTopic = (tokens = [], topic: string) => {
  handleFcmPromise(getMessaging().unsubscribeFromTopic(tokens, topic));
};
