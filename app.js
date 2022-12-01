import { renderDashboard } from "./view-dashboard.js";
import { renderDetails } from "./view-details.js";


if (window.location.search.includes("?country=")) {
    document.querySelector(".filters").classList.add("hidden");
    renderDetails();
} else {
    renderDashboard();
}

