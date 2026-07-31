import pathlib
import unittest


ROOT = pathlib.Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"


class GitHubPagesShowcaseTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = (DOCS / "index.html").read_text()
        cls.script = (DOCS / "app.js").read_text()

    def test_required_static_files_exist(self):
        for path in ["index.html", "styles.css", "app.js", "logo.svg", ".nojekyll"]:
            self.assertTrue((DOCS / path).exists(), path)

    def test_site_states_that_it_is_not_an_operational_service(self):
        self.assertIn("not an operational mentorship service", self.html)
        self.assertIn("Synthetic data only", self.html)
        self.assertIn("Fictional profile", self.script)

    def test_page_blocks_data_connections_and_does_not_store_input(self):
        self.assertIn("connect-src 'none'", self.html)
        for forbidden in ["fetch(", "XMLHttpRequest", "localStorage", "sessionStorage", "document.cookie"]:
            self.assertNotIn(forbidden, self.script)

    def test_demo_has_accessible_labels_and_live_results(self):
        self.assertIn('for="decision"', self.html)
        self.assertIn('aria-live="polite"', self.html)
        self.assertIn('type="submit"', self.html)


if __name__ == "__main__":
    unittest.main()
