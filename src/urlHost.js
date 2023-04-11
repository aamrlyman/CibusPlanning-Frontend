export const URL_HOST =
  process.env.NODE_ENV === "production"
    ? "https://test-proxy.megancindric.workers.dev/?targetUrl=http://cibus-planning-backend-env.eba-csys5kdh.us-west-2.elasticbeanstalk.com"
    : "http://127.0.0.1:8000";
