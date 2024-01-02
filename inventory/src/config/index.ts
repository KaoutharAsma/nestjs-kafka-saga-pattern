export default () => ({
  broker: process.env.BROKER ?? 'broker:9092',
  services: {
    inventory: {
      clientId: 'inventory',
      groupId: 'inventory',
      name: 'inventory-kafka-client',
    },
  },
});
