# AMIA

Am I Available?

## Up Next:
- ~~Smart Fill Events~~
- View Relationships & Add / Reject
- Text Create Events with OpenAI
- Create Drafts

## Feature List

### Safty / Robustness
- [ ] Don't allow a user to create a relationship request if the user is already in a relationship with them

### Bugs
- [ ] Add a frame to load all relevant data on app load (relationships don't load for requestform)
- [x] Fix the storing of time for an event request... right now the timezones are screwed up.

### QOL 
- [x] Fix styling of loading cards
- [x] Create a Landing/Marketing page
- [x] Change slices to use loading state for all components
- [ ] Update slices to hold a "loaded" flag that can be reset, but will hide loading state.
- [ ] Health check while loading so you have a loading screen while the API heats up initially

### Legal / Security / Predeployments
- [ ] Create help center email
- [ ] Create "Contact Us" Lin   k
- [ ] Create Status / Uptime page
- [ ] Create Privacy Policy
- [ ] Create Terms of Service
- [ ] Create Cookie Policy

### Settings / Settings
- [ ] Ability to view profile
- [ ] Ability to specify natural language preferences

### Friends / Family
- [x] Ability to add "Friends/Relationships" by email
- [x] Ability to approve relationships / which create a relationship
- [ ] Ability to add "Friends" that aren't on the website and reference them in requests / drafts
- [ ] Ability to share a link to the request so that users can accept via magic links

### Date Requests
- [x] Ability to create an event request
- [ ] Ability to edit event requets
- [ ] Ability to request dates with your partner to request your availability (attach an approver to event submissions)
- [ ] Ability to view all requests / approve them
- [ ] Ability to view single request with additional details (single page)
- [ ] Ability to specify default users for event approvals

### Drafts
- [ ] Ability to create a draft of a date (like a "todo")

### Smart Scheduling (Drafts)
- [ ] Ability to find a time for a draft
- [ ] Take into account user preferences (work/school hours) via natural language

### Calendar Visibility
- [ ] Ability to view upcoming events

### Creating New Events
- [ ] Ability to parse a description into an event
- [ ] Ability to schedule new events using natural language
- [ ] Ability to schedule new events using natural language with voice
- [ ] Adding travel time to new events (hooks)
  
### Agent
- [x] Basic chat functionality (streaming / setup)
- [ ] Ability to ask questions about availability on a specific date
- [ ] Ability to create an event on a specific date / time
- [ ] Ability to create a draft


### Upgrades
- [ ] Supabase custom domain
```bash
supabase domains create --project-ref cwpsafmbigglcsbpwawr --custom-hostname db.amiavailable.com
```
- [ ] Setup PostHog


## Ideas

Showing the user when Amia will go through and schedule events... Maybe ask if the calendar isn't looking as full.