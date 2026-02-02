export const config = {
  BASE_URL:
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://me.onra.ch/api/website-business-public/companies",
  DOMAIN_API_URL:
    process.env.NEXT_PUBLIC_DOMAIN_API_URL ||
    "https://me.onra.ch/api/website-business-public/domain",
};

export const { BASE_URL, DOMAIN_API_URL } = config;
