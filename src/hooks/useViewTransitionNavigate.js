import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";

/**
 * Custom hook to use the View Transition API with React Router
 * @returns {Function} transitionNavigate - Function to navigate with a transition
 */
export function useViewTransitionNavigate() {
    const navigate = useNavigate();

    const transitionNavigate = (to) => {
        // Fallback for browsers that don't support View Transition API
        if (!document.startViewTransition) {
            navigate(to);
            return;
        }

        // Standard View Transition API call
        document.startViewTransition(() => {
            // flushSync ensures that React updates the DOM immediately 
            // inside the transition callback
            flushSync(() => {
                navigate(to);
            });
        });
    };

    return transitionNavigate;
}
