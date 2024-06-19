export type CreateStreamRequest = {
  streamName: string;
  userId: string;
};

export type GenerateTokenRequest = {
  roomId: string | undefined;
  userType: string | null;
};
