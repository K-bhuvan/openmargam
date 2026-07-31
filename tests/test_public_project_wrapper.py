import pathlib
import unittest
import xml.etree.ElementTree as ET


ROOT = pathlib.Path(__file__).resolve().parents[1]


class PublicProjectWrapperTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.readme = (ROOT / "README.md").read_text()
        cls.changelog = (ROOT / "CHANGELOG.md").read_text()

    def test_readme_links_to_the_public_entry_points(self):
        self.assertIn("https://k-bhuvan.github.io/openmargam/", self.readme)
        self.assertIn("https://github.com/K-bhuvan/openmargam/discussions", self.readme)
        self.assertIn("https://github.com/K-bhuvan/openmargam/issues", self.readme)

    def test_roadmap_links_to_scoped_public_issues(self):
        for issue_number in range(7, 13):
            self.assertIn(
                f"https://github.com/K-bhuvan/openmargam/issues/{issue_number}",
                self.readme,
            )

        self.assertIn(
            "https://github.com/K-bhuvan/openmargam/issues/13",
            self.readme,
        )

    def test_showcase_release_has_an_honest_safety_boundary(self):
        self.assertIn("v0.1.0-showcase", self.changelog)
        self.assertIn("not an operational mentorship service", self.changelog)
        self.assertIn("not production-ready", self.changelog)

    def test_overview_graphic_is_valid_svg(self):
        graphic = ROOT / "docs" / "openmargam-overview.svg"
        self.assertTrue(graphic.exists())
        self.assertEqual(ET.parse(graphic).getroot().tag, "{http://www.w3.org/2000/svg}svg")


if __name__ == "__main__":
    unittest.main()
