export default () => {
  const port = parseInt(process.env.PORT || '8080', 10) || 3000;
  const baseDomain = process.env.BASE_DOMAIN || 'http://localhost';
  const baseUrl = `${baseDomain}${baseDomain.includes('localhost') ? `:${port}` : ''}`;

  return {
    baseUrl,
    port,
  };
};
