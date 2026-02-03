import {
  Company,
  ContactInfo,
  About,
  Post,
  OpeningHours,
  Event,
  Team,
  Employee,
  CompanySettings,
  LandingPageData,
  DomainInfo,
} from "@/app/types";
import { cache } from "react";
import {BASE_URL, DOMAIN_API_URL} from "@/config/index";

// Cache duration for Next.js fetch cache (ISR-like behavior)
const REVALIDATE_TIME = 300; // 5 minutes

// ============================================
// API FUNCTIONS - Using Next.js fetch cache
// ============================================

export async function getCompanyByDomain(domain: string): Promise<DomainInfo> {
  const response = await fetch(`${DOMAIN_API_URL}/${domain}`, {
    next: { revalidate: 3600 }, // 1 hour for domain
  });
  if (!response.ok) throw new Error("Failed to fetch company from domain");
  return response.json();
}

export async function getCompany(companyId: string): Promise<Company> {
  const response = await fetch(`${BASE_URL}/${companyId}`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!response.ok) throw new Error("Failed to fetch company data");
  return response.json();
}

export async function getContactInfo(companyId: string): Promise<ContactInfo> {
  const response = await fetch(`${BASE_URL}/${companyId}/contactInfo/`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!response.ok) throw new Error("Failed to fetch contact info");
  return response.json();
}

export async function getAbout(companyId: string): Promise<About> {
  const response = await fetch(`${BASE_URL}/${companyId}/about/`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!response.ok) throw new Error("Failed to fetch about info");
  return response.json();
}

export async function getPosts(companyId: string): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/${companyId}/posts/`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
}

export async function getOpeningHours(companyId: string): Promise<OpeningHours> {
  const response = await fetch(`${BASE_URL}/${companyId}/openingHours/`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!response.ok) throw new Error("Failed to fetch opening hours");
  return response.json();
}

export async function getEvents(companyId: string): Promise<Event[]> {
  const response = await fetch(`${BASE_URL}/${companyId}/events/`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!response.ok) throw new Error("Failed to fetch events");
  return response.json();
}

export async function getTeams(companyId: string): Promise<Team[]> {
  const response = await fetch(`${BASE_URL}/${companyId}/teams/`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!response.ok) throw new Error("Failed to fetch teams");
  return response.json();
}

export async function getEmployees(companyId: string): Promise<Employee[]> {
  const response = await fetch(`${BASE_URL}/${companyId}/employees/`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!response.ok) throw new Error("Failed to fetch employees");
  return response.json();
}

export async function getCompanySettings(companyId: string): Promise<CompanySettings> {
  const response = await fetch(`${BASE_URL}/${companyId}/company-settings/`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!response.ok) throw new Error("Failed to fetch company settings");
  return response.json();
}

// ============================================
// AGGREGATED DATA FUNCTION
// ============================================

// Helper to safely call an API and return fallback on error
async function safeApiCall<T>(apiCall: Promise<T>, fallback: T, name: string): Promise<T> {
  try {
    return await apiCall;
  } catch (error) {
    console.warn(`API call ${name} failed, using fallback:`, error);
    return fallback;
  }
}

// React cache() deduplicates calls within the same request
// Next.js fetch cache handles caching across requests (no 2MB limit)
export const getAllLandingPageData = cache(
  async (companyId: string): Promise<LandingPageData> => {
    const [
      company,
      contactInfo,
      about,
      posts,
      openingHours,
      events,
      teams,
      employees,
      settings,
    ] = await Promise.all([
      safeApiCall(getCompany(companyId), {} as Company, 'getCompany'),
      safeApiCall(getContactInfo(companyId), {} as ContactInfo, 'getContactInfo'),
      safeApiCall(getAbout(companyId), {} as About, 'getAbout'),
      safeApiCall(getPosts(companyId), [] as Post[], 'getPosts'),
      safeApiCall(getOpeningHours(companyId), {} as OpeningHours, 'getOpeningHours'),
      safeApiCall(getEvents(companyId), [] as Event[], 'getEvents'),
      safeApiCall(getTeams(companyId), [] as Team[], 'getTeams'),
      safeApiCall(getEmployees(companyId), [] as Employee[], 'getEmployees'),
      safeApiCall(getCompanySettings(companyId), {} as CompanySettings, 'getCompanySettings'),
    ]);

    return {
      company,
      contactInfo,
      about,
      posts,
      openingHours,
      events,
      teams,
      employees,
      settings,
    };
  }
);


// Alias for metadata
export const getCachedCompany = cache(getCompany);

// ============================================
// CONTACT FORM (No caching - POST request)
// ============================================

export interface ContactRequestData {
  name: string;
  email: string;
  message: string;
  // token: string;
  companyId: string;
}

export async function sendContactMessage(
  companyId: string,
  data: ContactRequestData
): Promise<void> {
  const response = await fetch(`${BASE_URL}/${companyId}/contact-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    if (response.status === 403) {
      throw new Error(errorData.error || "Authorization failed");
    }
    if (response.status === 409) {
      throw new Error("Please fill in all required fields");
    }
    if (response.status === 404) {
      throw new Error("Company not found");
    }

    throw new Error(errorData.error || "Failed to send message");
  }
}
