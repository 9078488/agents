AWS.config.update({
    region: import.meta.env.VITE_REGION,
    accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY
  });



export default AWS;