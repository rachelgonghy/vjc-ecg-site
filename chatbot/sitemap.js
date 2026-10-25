const PAGES = [
{key:'home', title:'Home', file:'home.dc.html', parentKey:null, blurb:'Your one-stop hub for education and career guidance at VJC.'},
{key:'opportunity-search-portal', title:'Opportunity Search Portal', file:'opportunity-search-portal.dc.html', parentKey:null, blurb:'Filter through scholarships, events, internships, competitions and more, based on your interests.'},
{key:'overseas-education-portal', title:'Overseas Education Portal', file:'overseas-education-portal.dc.html', parentKey:null, blurb:'Everything you need to know about applying to overseas universities - timelines, tests, scholarships and more.'},
{key:'events-and-programmes', title:'Events & Programmes', file:'https://sites.google.com/vjc.edu.sg/ecgvjc/events-and-programmes', parentKey:null, blurb:'ECG events and programmes that expose Victorians to the world of work.'},
{key:'learning-journeys', title:'Learning Journeys', file:'learning-journeys.dc.html', parentKey:'events-and-programmes', blurb:'Guided visits to workplaces and institutions that bring career pathways to life.'},
{key:'edvantage-fair', title:'EdVantage! Fair', file:'edvantage-fair.dc.html', parentKey:'events-and-programmes', blurb:'Every year, VJC partners with industry for the EdVantage Fair, exposing students to the world of work.'},
{key:'partner-organisations', title:'Partner Organisations', file:'https://sites.google.com/vjc.edu.sg/ecgvjc/events-and-programmes/edvantage-fair/partner-organisations?authuser=0', parentKey:'edvantage-fair', blurb:"The organisations joining VJC at this year's EdVantage Fair."},
{key:'talk-allocation-portal', title:'Talk Allocation Portal', file:'https://sites.google.com/vjc.edu.sg/ecgvjc/events-and-programmes/edvantage-fair/talk-allocation-portal', parentKey:'edvantage-fair', blurb:'Sign up for the EdVantage Fair talks you want to attend.'},
{key:'interactive-map', title:'Interactive Map', file:'https://sites.google.com/vjc.edu.sg/ecgvjc/events-and-programmes/edvantage-fair/interactive-map', parentKey:'edvantage-fair', blurb:'Find your way around the EdVantage Fair booths and talk venues.'},
{key:'local-university-panel-discussion', title:'Local University Panel Discussion', file:'local-university-panel-discussion.dc.html', parentKey:'events-and-programmes', blurb:'Hear directly from local university representatives on courses and admissions.'},
{key:'project-edvantage', title:'Project EdVantage', file:'https://sites.google.com/vjc.edu.sg/ecgvjc/events-and-programmes/project-edvantage', parentKey:'events-and-programmes', blurb:"VJC's in-house talent development programme."},
{key:'jc1-work-shadowing-programme', title:'JC1 Work Shadowing Programme', file:'jc1-work-shadowing-programme.dc.html', parentKey:'events-and-programmes', blurb:'A first-hand look at a workplace of interest for JC1 Victorians.'},
{key:'a-level-university-support', title:'A-Levels & University Applications', file:'a-level-university-support.dc.html', parentKey:null, blurb:"Find out what to expect for 'A' Levels and how to apply to local and international universities."},
{key:'start-here-university-applications', title:'Get Started Here', file:'https://sites.google.com/vjc.edu.sg/ecgvjc/a-level-and-university-applications/get-started-here', parentKey:'a-level-university-support', blurb:'Your first stop after results — timeline, deadlines, paths and myths debunked.'},
{key:'sg-university-application', title:'Local University Applications', file:'sg-university-application-standalone.html', parentKey:'a-level-university-support', blurb:'Timelines and requirements for applying to Singapore universities.'},
{key:'international-university-application', title:'International University Application', file:'international-university-application-standalone.html', parentKey:'a-level-university-support', blurb:'Application routes for universities in the UK, US, EU and Asia.'},
{key:'uk-university-application', title:'UK University Application', file:'uk-university-application.dc.html', parentKey:'international-university-application', blurb:'UCAS timelines and how to apply to UK universities.', navHidden:true},
{key:'us-university-application', title:'US University Application', file:'us-university-application.dc.html', parentKey:'international-university-application', blurb:'Common App timelines and how to apply to US universities.', navHidden:true},
{key:'eu-asia-university-application', title:'EU & Asia Application', file:'eu-asia-university-application.dc.html', parentKey:'international-university-application', blurb:'Application routes for universities across Europe and Asia.', navHidden:true},
{key:'scholarship-information', title:'Scholarships & Interviews', file:'scholarship-information.dc.html', parentKey:null, blurb:'The scholarships that VJC will support you in applying for.'},
{key:'pre-u-scholarships', title:'Pre-U Scholarships', file:'pre-u-scholarships.dc.html', parentKey:'scholarship-information', blurb:'Scholarships available before you begin university.'},
{key:'undergraduate-scholarships', title:'Undergraduate Scholarships', file:'https://sites.google.com/vjc.edu.sg/ecgvjc/scholarships-and-interviews/undergraudate-scholarships', parentKey:'scholarship-information', blurb:'Scholarships available during your undergraduate studies.'},
{key:'scholarships-applications-forum', title:'Scholarships & Applications Forum', file:'scholarships-applications-forum.dc.html', parentKey:'scholarship-information', blurb:'A forum where scholarship applicants can get their questions answered.', navHidden:true},
{key:'interview-prep', title:'Scholarship Interview Processes', file:'interview-prep.dc.html', parentKey:'scholarship-information', blurb:'Get ready for scholarship interviews with guided preparation.'},
{key:'meet-the-team', title:'Meet the Team', file:'meet-the-team.dc.html', parentKey:null, blurb:'Find out who you can direct your ECG-related questions to.', navHidden:true},
{key:'useful-resources', title:'Useful Resources', file:'useful-resources.dc.html', parentKey:null, blurb:'Tools and calculators to help you plan your subject combination and application.'},
{key:'h2-degree-mapping-advisor', title:'H2 Degree Mapping Advisor', file:'h2-degree-mapping-advisor.dc.html', parentKey:'useful-resources', blurb:'Unsure of the university course implications of your H2 subject combination? Find out here.'},
{key:'h2-subject-eligibility-advisor', title:'H2 Subject Eligibility Advisor', file:'h2-subject-eligibility-advisor.dc.html', parentKey:'useful-resources', blurb:"Unsure if you're eligible to take specific subjects at H2 level? Find out here."},
{key:'rank-point-calculator', title:'Rank Points Calculator', file:'rank-point-calculator.dc.html', parentKey:'useful-resources', blurb:'Estimate your rank points for university admissions.'},
{key:'ecg-chatbot', title:'ECG Chatbot', file:'ecg-chatbot.dc.html', parentKey:null, blurb:'Get quick answers to your ECG questions, any time.', navHidden:true},
{key:'book-an-ecg-session', title:'Book an ECG Session', file:'book-an-ecg-session.dc.html', parentKey:null, blurb:'Unsure about life after VJC? Speak to our ECG Counsellor.', navHidden:true},
];

function byKey(key){ return PAGES.find(p=>p.key===key); }
function children(key){ return PAGES.filter(p=>p.parentKey===key && !p.navHidden); }
function topLevel(){ return PAGES.filter(p=>p.parentKey===null); }
function sectionOf(key){ let node=byKey(key); while(node && node.parentKey){ node=byKey(node.parentKey); } return node?node.key:key; }
function breadcrumbTrail(key){ const trail=[]; let node=byKey(key); while(node){ trail.unshift(node); node=node.parentKey?byKey(node.parentKey):null; } return trail; }
function siblingsOf(key){ const node=byKey(key); if(!node) return []; return node.parentKey? children(node.parentKey) : topLevel(); }
function prevNext(key){ const sibs=siblingsOf(key); const idx=sibs.findIndex(p=>p.key===key); return { prev: idx>0?sibs[idx-1]:null, next: (idx>=0 && idx<sibs.length-1)?sibs[idx+1]:null }; }
function flattenSection(sectionKey, activeKey, depth){
  depth = depth || 0;
  const kids = children(sectionKey);
  let result = [];
  kids.forEach(k=>{
    result.push({key:k.key, title:k.title, file:k.file, depth:depth, active:k.key===activeKey});
    result = result.concat(flattenSection(k.key, activeKey, depth+1));
  });
  return result;
}

export { PAGES, byKey, children, topLevel, sectionOf, breadcrumbTrail, siblingsOf, prevNext, flattenSection };
