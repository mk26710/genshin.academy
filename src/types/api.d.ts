/** Special type describing `/api` json responses */
type ZenlessJsonResponse<T = Record<string, unknown>, E = Record<string, unknown>> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    data?: E;
  };
};
