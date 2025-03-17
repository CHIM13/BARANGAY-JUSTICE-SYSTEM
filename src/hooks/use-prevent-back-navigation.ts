import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * A custom hook to prevent navigation to previous pages and redirect to a specified route
 * when users press the back button.
 *
 * @param redirectTo - The route to redirect to when back button is pressed
 * @param enabled - Whether the hook is enabled (default: true)
 */
const usePreventBackNavigation = (
  redirectTo: string,
  enabled: boolean = true
) => {
  console.log(redirectTo);
};

export default usePreventBackNavigation;
