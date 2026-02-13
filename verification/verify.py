from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # 1. Home Page
    print("Navigating to Home Page...")
    page.goto("http://localhost:3000")
    # Wait for content to load
    page.wait_for_selector("text=Welcome to HealthInfo Blog")
    # Take screenshot of home page
    page.screenshot(path="verification/home_page.png", full_page=True)
    print("Home Page Screenshot taken.")

    # 2. Click on a post
    print("Clicking on 'The Amazing Benefits of Daily Walking'...")
    # Using text locator
    page.click("text=The Amazing Benefits of Daily Walking")
    # Wait for post page content
    page.wait_for_selector("h1")
    # Take screenshot of post page
    page.screenshot(path="verification/post_page.png", full_page=True)
    print("Post Page Screenshot taken.")
    
    # 3. About Page
    print("Navigating to About Page...")
    page.goto("http://localhost:3000/about")
    page.wait_for_selector("text=About Us")
    page.screenshot(path="verification/about_page.png", full_page=True)
    print("About Page Screenshot taken.")

    # 4. Cookie Consent
    # It should appear at the bottom
    page.wait_for_timeout(1000) # Give it a second
    if page.is_visible("text=We value your privacy"):
        print("Cookie Consent visible.")
        # Take a screenshot focusing on the bottom
        page.screenshot(path="verification/cookie_consent.png")
    else:
        print("Cookie Consent NOT visible.")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
