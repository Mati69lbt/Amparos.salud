const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];
const STORAGE_PREFIX = "amparo_salud_";

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
};

export const captureAttribution = () => {
  try {
    const params = new URLSearchParams(window.location.search);

    [...UTM_KEYS, "fbclid"].forEach((key) => {
      const value = params.get(key);
      if (value) {
        localStorage.setItem(`${STORAGE_PREFIX}${key}`, value);
      }
    });
  } catch {
    // noop
  }
};

export const getAttribution = () => {
  const attribution = {};

  try {
    [...UTM_KEYS, "fbclid"].forEach((key) => {
      attribution[key] = localStorage.getItem(`${STORAGE_PREFIX}${key}`) ?? "";
    });
  } catch {
    UTM_KEYS.forEach((key) => {
      attribution[key] = "";
    });
    attribution.fbclid = "";
  }

  attribution.fbp = getCookie("_fbp");
  attribution.fbc = getCookie("_fbc");

  return attribution;
};

export const trackLead = (eventId) => {
  try {
    window.fbq?.("track", "Lead", {}, { eventID: eventId });
  } catch {
    // noop
  }
};
