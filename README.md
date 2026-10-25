# ECG @ VJC pages (GitHub Pages)

## How to publish
1. On github.com, create a new **public** repository called `vjc-ecg`.
2. Click **Add file → Upload files**, drag in every file from this folder (including `.nojekyll`), then click **Commit changes**.
3. Go to **Settings → Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, Branch to **main**, folder **/ (root)**, then **Save**.
4. Wait 1–2 minutes. Your pages will be live at the addresses below. Replace YOUR-USERNAME with your GitHub username.

## Embedding in Google Sites
In Google Sites: **Insert → Embed → By URL**, paste the page's address from the table, then resize the box to fill the page.

## Updating a page later
Upload the new file with the **same name** and commit. It replaces the old one, and the address stays the same.

## Page addresses
| Page | File | Address |
|---|---|---|
| Book an ECG Session | book-an-ecg-session.html | https://YOUR-USERNAME.github.io/vjc-ecg/book-an-ecg-session.html |
| ECG Calendar | ecg-calendar.html | https://YOUR-USERNAME.github.io/vjc-ecg/ecg-calendar.html |
| ECG Chatbot | ecg-chatbot.html | https://YOUR-USERNAME.github.io/vjc-ecg/ecg-chatbot.html |
| EdVantage! Fair | edvantage-fair.html | https://YOUR-USERNAME.github.io/vjc-ecg/edvantage-fair.html |
| EU, ANZ & Asia | eu-anz-asia.html | https://YOUR-USERNAME.github.io/vjc-ecg/eu-anz-asia.html |
| Events & Programmes | events-and-programmes.html | https://YOUR-USERNAME.github.io/vjc-ecg/events-and-programmes.html |
| External Links | external-links.html | https://YOUR-USERNAME.github.io/vjc-ecg/external-links.html |
| Get Started Here | get-started-here.html | https://YOUR-USERNAME.github.io/vjc-ecg/get-started-here.html |
| H2 Degree Mapping Advisor | h2-degree-mapping-advisor.html | https://YOUR-USERNAME.github.io/vjc-ecg/h2-degree-mapping-advisor.html |
| H2 Subject Eligibility Advisor | h2-subject-eligibility-advisor.html | https://YOUR-USERNAME.github.io/vjc-ecg/h2-subject-eligibility-advisor.html |
| Home | home.html | https://YOUR-USERNAME.github.io/vjc-ecg/home.html |
| Interactive Map | interactive-map.html | https://YOUR-USERNAME.github.io/vjc-ecg/interactive-map.html |
| Interview Processes | interview-processes.html | https://YOUR-USERNAME.github.io/vjc-ecg/interview-processes.html |
| JC1 Work Shadowing Programme | jc1-work-shadowing-programme.html | https://YOUR-USERNAME.github.io/vjc-ecg/jc1-work-shadowing-programme.html |
| Learning Journeys | learning-journeys.html | https://YOUR-USERNAME.github.io/vjc-ecg/learning-journeys.html |
| Local Universities | local-universities.html | https://YOUR-USERNAME.github.io/vjc-ecg/local-universities.html |
| Local University Panel Discussion | local-university-panel-discussion.html | https://YOUR-USERNAME.github.io/vjc-ecg/local-university-panel-discussion.html |
| Meet the Team | meet-the-team.html | https://YOUR-USERNAME.github.io/vjc-ecg/meet-the-team.html |
| New University Courses | new-university-courses.html | https://YOUR-USERNAME.github.io/vjc-ecg/new-university-courses.html |
| Opportunity Search Portal | opportunity-search-portal.html | https://YOUR-USERNAME.github.io/vjc-ecg/opportunity-search-portal.html |
| Overseas Education Portal | overseas-education-portal.html | https://YOUR-USERNAME.github.io/vjc-ecg/overseas-education-portal.html |
| Overseas Universities | overseas-universities.html | https://YOUR-USERNAME.github.io/vjc-ecg/overseas-universities.html |
| Partner Organisations | partner-organisations.html | https://YOUR-USERNAME.github.io/vjc-ecg/partner-organisations.html |
| Pre-U Scholarships | pre-u-scholarships.html | https://YOUR-USERNAME.github.io/vjc-ecg/pre-u-scholarships.html |
| Project EdVantage | project-edvantage.html | https://YOUR-USERNAME.github.io/vjc-ecg/project-edvantage.html |
| Rank Points Calculator | rank-points-calculator.html | https://YOUR-USERNAME.github.io/vjc-ecg/rank-points-calculator.html |
| Scholarships & Interviews | scholarships-and-interviews.html | https://YOUR-USERNAME.github.io/vjc-ecg/scholarships-and-interviews.html |
| Talk Allocation Portal | talk-allocation-portal.html | https://YOUR-USERNAME.github.io/vjc-ecg/talk-allocation-portal.html |
| UK | uk.html | https://YOUR-USERNAME.github.io/vjc-ecg/uk.html |
| Undergraduate Scholarships | undergraduate-scholarships.html | https://YOUR-USERNAME.github.io/vjc-ecg/undergraduate-scholarships.html |
| University Applications | university-applications.html | https://YOUR-USERNAME.github.io/vjc-ecg/university-applications.html |
| US | us.html | https://YOUR-USERNAME.github.io/vjc-ecg/us.html |
| Useful Resources | useful-resources.html | https://YOUR-USERNAME.github.io/vjc-ecg/useful-resources.html |

`index.html` is a copy of `home.html`, so https://YOUR-USERNAME.github.io/vjc-ecg/ also opens the Home page.

## The ECG Chatbot
GitHub Pages can only host pages, not the chatbot's backend (`_worker.js`). Keep the chatbot on Cloudflare (vjc-ecg-chatbot.pages.dev). The `ecg-chatbot.html` page here still sends questions to the Cloudflare backend.
