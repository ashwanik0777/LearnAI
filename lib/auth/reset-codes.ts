// Shared in-memory reset codes store
export interface ResetCodeData {
  code: string;
  expiry: Date;
  userId: number;
}

const globalForReset = globalThis as unknown as {
  resetCodesStore?: Map<string, ResetCodeData>;
};

export const resetCodesStore =
  globalForReset.resetCodesStore ?? new Map<string, ResetCodeData>();

if (process.env.NODE_ENV !== "production") {
  globalForReset.resetCodesStore = resetCodesStore;
}
