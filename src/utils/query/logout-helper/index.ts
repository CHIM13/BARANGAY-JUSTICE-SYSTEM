import api from "@/api/client";

// Helper function to handle logout
export const logoutHelper = async () => {
  try {
    // Make request to destroy server session
    await api.post("/account/logout");

    // Clear local storage
    localStorage.clear();

    // Clear cookies
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    // Redirect to login
    window.location.href = "/";
  } catch (error) {
    console.error("Logout error:", error);
    window.location.href = "/";
  }
};

export default logoutHelper;
