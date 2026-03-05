import { producer } from "./client.js";

const sendMessage = async (data) => {
  try {
    await producer.connect();

    await producer.send({
      topic: "query-topic",
      messages: [{ value: JSON.stringify(data) }],
    });

    console.log("Sending to Kafka:", data);
    console.log("Message sent to Kafka");
  } catch (error) {
    console.error("Kafka producer error:", error);
  }
};

export default sendMessage;