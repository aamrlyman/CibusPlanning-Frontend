export const URL_HOST =
  process.env.NODE_ENV === "production"
    ? "https://uos0rda7x5.execute-api.us-west-2.amazonaws.com/production"
    : "http://127.0.0.1:8000";
