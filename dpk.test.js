const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the stringified partitionKey when partitionKey is passed as object", () => {
    const event = {partitionKey: {test: 'test'}};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(JSON.stringify(event.partitionKey));
  });

  it("Returns the hashed partitionKey when stringified partitionKey object has more length than 256", () => {
    const event = {partitionKey: {test: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen books."}};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(JSON.stringify(event.partitionKey)).digest("hex"));
  });

  it("Returns the stringified partitionKey when partitionKey is passed as string", () => {
    const event = {partitionKey: 'test'};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });

  it("Returns the hashed partitionKey when passed partitionKey string has more length than 256", () => {
    const event = {partitionKey: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum."};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(event.partitionKey).digest("hex"));
  });

  it("Returns the hashed event when partitionKey is not present in event", () => {
    const event = {test: {test: 'test'}};
    const trivialKey = deterministicPartitionKey({test: {test: 'test'}});
    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex"));
  });

  it("Returns the original hashed event when partitionKey is not present in event even if stringified event length is more than 256", () => {
    const event = {test: {test: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum."}};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex"));
  });
});
