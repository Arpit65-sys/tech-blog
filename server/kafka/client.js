import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "blog-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "blog-group" });

export { kafka, producer, consumer };