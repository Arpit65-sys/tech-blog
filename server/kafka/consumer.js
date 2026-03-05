import { consumer } from "./client.js";

const runConsumer = async (io) => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: "query-topic",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const data = JSON.parse(message.value.toString());
        console.log("Received from Kafka:", data);
        io.emit("New Query", data);
        
      },
    });
  } catch (error) {
    console.error("Kafka consumer error:", error);
  }
};

export default runConsumer;