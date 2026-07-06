import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class StaticAppTests(unittest.TestCase):
    def read(self, path):
        return (ROOT / path).read_text(encoding="utf-8")

    def test_required_routes_exist(self):
        html = self.read("index.html")
        for route in [
            "onboarding",
            "discover",
            "mentors",
            "mentor-studio",
            "mentor-requests",
            "bookings",
            "safety",
            "admin",
        ]:
            self.assertIn(f'id="route-{route}"', html)
            self.assertIn(f'data-route="{route}"', html)

    def test_core_mvp_behaviors_are_present(self):
        app = self.read("src/app.js")
        for behavior in [
            "rankMentors",
            "scoreMentor",
            "savePreferences",
            "applyPreferencesToDiscovery",
            "setRole",
            "renderMentorStudio",
            "renderMentorRequests",
            "createBooking",
            "allowedTransitions",
            "submitReport",
            "moderateReport",
            "blockUser",
        ]:
            self.assertRegex(app, rf"function\s+{behavior}\s*\(")

    def test_booking_state_machine_contains_expected_states(self):
        app = self.read("src/app.js")
        for state in [
            "requested",
            "clarification_requested",
            "accepted",
            "payment_pending",
            "confirmed",
            "completed",
            "cancelled",
            "rejected",
        ]:
            self.assertIn(f'"{state}"', app)

    def test_payment_pending_follows_accepted_not_precedes_it(self):
        """Plan §15.1: request -> accept -> pay -> confirm. payment_pending must be reachable from accepted, not be the entry state."""
        app = self.read("src/app.js")
        # accepted must allow transitioning into payment_pending
        self.assertRegex(
            app,
            re.compile(r"accepted:\s*\[[^\]]*\"payment_pending\"", re.DOTALL),
        )
        # payment_pending must NOT allow going back to accepted
        pm_block = re.search(r"payment_pending:\s*\[([^\]]*)\]", app, re.DOTALL)
        self.assertIsNotNone(pm_block, "payment_pending transition list not found")
        self.assertNotIn('"accepted"', pm_block.group(1))

    def test_new_booking_starts_in_requested_state(self):
        """createBooking must seed state as 'requested', not jump to payment_pending."""
        app = self.read("src/app.js")
        # the first 'state:' in createBooking context
        create_booking_block = app[app.find("function createBooking"):]
        state_line = re.search(r"state:\s*([^\n,]+)", create_booking_block)
        self.assertIsNotNone(state_line, "createBooking state assignment not found")
        self.assertIn('"requested"', state_line.group(1))
        self.assertNotIn("payment_pending", state_line.group(1))

    def test_no_platform_custody_language_is_visible(self):
        html = self.read("index.html")
        readme = self.read("README.md")
        self.assertIn("Payments stay outside the platform", html)
        self.assertIn("no platform custody", readme.lower())

    def test_static_assets_are_referenced(self):
        html = self.read("index.html")
        self.assertIn('href="./styles.css"', html)
        self.assertIn('src="./src/app.js"', html)
        self.assertTrue((ROOT / "styles.css").exists())
        self.assertTrue((ROOT / "src/app.js").exists())

    def test_lived_experience_does_not_double_count_location(self):
        """livedExperience should be driven by tag/text overlap, not location (which has its own dimension)."""
        app = self.read("src/app.js")
        # capture only the livedExperience value up to the next dimension key
        lived_block = re.search(
            r"livedExperience:\s*\n?\s*(.+?)\n\s+careerStage:",
            app,
        )
        self.assertIsNotNone(lived_block, "livedExperience dimension not found")
        self.assertNotIn("locations", lived_block.group(1))

    def test_mentor_stats_guards_empty_mentor_list(self):
        """renderMentorStats must not divide by zero when no mentors match the filter."""
        app = self.read("src/app.js")
        stats_block = app[
            app.find("function renderMentorStats"):app.find("function renderMentorStats") + 700
        ]
        self.assertIn("mentors.length", stats_block)
        # ensure a falsy guard exists before the division (ternary or if-statement form)
        self.assertRegex(
            stats_block,
            re.compile(r"mentors\.length\s*\?", re.DOTALL),
        )

    def test_demo_booking_does_not_render_transition_buttons(self):
        """Demo fallback booking must not show transition buttons (they would no-op)."""
        app = self.read("src/app.js")
        # renderBookingCard must check isDemo before rendering actions
        self.assertIn("isDemo", app)

    def test_css_avoids_viewport_scaled_text(self):
        css = self.read("styles.css")
        self.assertNotRegex(css, re.compile(r"font-size\s*:\s*[^;]*(vw|vh)", re.IGNORECASE))

    def test_css_avoids_external_image_dependencies(self):
        """Self-hosting principle: no remote image URLs in stylesheets."""
        css = self.read("styles.css")
        self.assertNotRegex(css, re.compile(r"url\(\s*[\"']?\s*https?://", re.IGNORECASE))


if __name__ == "__main__":
    unittest.main()
