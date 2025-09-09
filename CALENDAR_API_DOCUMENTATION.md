# Google Calendar API Proxy Documentation

This document outlines all the comprehensive calendar proxy functions and API endpoints that provide Google Calendar-like functionality for your frontend.

## Proxy Functions (google_proxy.py)

### Core Event Management Functions

#### 1. `list_events()`
- **Purpose**: List calendar events with flexible filtering
- **Parameters**: 
  - `calendar_id`: Target calendar (default: "primary")
  - `time_min/time_max`: Date range filters (RFC3339 format)
  - `max_results`: Limit results (1-250)
  - `query`: Text search query
- **Returns**: List of formatted events with full metadata

#### 2. `get_event_details()`
- **Purpose**: Get complete details for a specific event
- **Parameters**: `event_id`, `calendar_id`
- **Returns**: Full event object with all Google Calendar fields

#### 3. `create_event()`
- **Purpose**: Create new calendar events
- **Parameters**: 
  - `event_data`: Complete event structure (summary, start, end, attendees, etc.)
  - `calendar_id`: Target calendar
  - `send_notifications`: Whether to notify attendees
- **Returns**: Created event with Google-assigned ID

#### 4. `update_event()`
- **Purpose**: Modify existing events
- **Parameters**: `event_id`, `event_data`, `calendar_id`, `send_notifications`
- **Returns**: Updated event object

#### 5. `delete_event()`
- **Purpose**: Remove events from calendar
- **Parameters**: `event_id`, `calendar_id`, `send_notifications`
- **Returns**: Boolean success status

#### 6. `search_events()`
- **Purpose**: Search events using text queries
- **Parameters**: `query`, `calendar_id`, `max_results`, optional time bounds
- **Returns**: List of matching events

### Advanced Functions

#### 7. `quick_add_event()`
- **Purpose**: Create events using natural language
- **Example**: "Lunch with John tomorrow at 1pm"
- **Returns**: Created event parsed from natural language

#### 8. `move_event()`
- **Purpose**: Move events between calendars
- **Parameters**: `event_id`, `destination_calendar_id`, `source_calendar_id`
- **Returns**: Updated event in new calendar

#### 9. `list_calendars()`
- **Purpose**: Get all accessible calendars for user
- **Returns**: List of calendars with metadata (colors, permissions, etc.)

### Helper Functions

#### 10. `get_events_for_date_range()`
- **Purpose**: Get events between specific dates
- **Parameters**: `start_date`, `end_date` (datetime objects)

#### 11. `get_today_events()`
- **Purpose**: Get all events for current day

#### 12. `get_upcoming_events()`
- **Purpose**: Get events for next N days
- **Parameters**: `days_ahead` (default: 7)

## API Endpoints (events.py)

### Event Listing & Viewing

- **GET `/api/v1/events/`** - List events with filters
- **GET `/api/v1/events/{event_id}`** - Get specific event details
- **GET `/api/v1/events/week`** - Get current week events (existing)
- **GET `/api/v1/events/today/`** - Get today's events
- **GET `/api/v1/events/upcoming/`** - Get upcoming events

### Event Management

- **POST `/api/v1/events/`** - Create new event
- **PUT `/api/v1/events/{event_id}`** - Update existing event
- **DELETE `/api/v1/events/{event_id}`** - Delete event

### Search & Quick Actions

- **GET `/api/v1/events/search/`** - Search events by text
- **POST `/api/v1/events/quick-add`** - Natural language event creation
- **POST `/api/v1/events/{event_id}/move`** - Move event between calendars

### Calendar Management

- **GET `/api/v1/events/calendars/`** - List all user calendars

## Event Data Structure

All events return comprehensive data including:

```json
{
  "id": "event_id",
  "summary": "Event title",
  "description": "Event description",
  "start": {
    "dateTime": "2024-01-15T10:00:00Z",
    "timeZone": "UTC"
  },
  "end": {
    "dateTime": "2024-01-15T11:00:00Z", 
    "timeZone": "UTC"
  },
  "location": "Meeting location",
  "attendees": [
    {
      "email": "attendee@example.com",
      "responseStatus": "accepted"
    }
  ],
  "status": "confirmed",
  "html_link": "https://calendar.google.com/event?eid=...",
  "created": "2024-01-14T09:00:00Z",
  "updated": "2024-01-14T09:30:00Z",
  "creator": {...},
  "organizer": {...},
  "visibility": "default",
  "recurrence": ["RRULE:FREQ=WEEKLY"],
  "reminders": {...},
  "attachments": [...],
  "conference_data": {...},
  "event_type": "default"
}
```

## Frontend Integration Examples

### Creating an Event
```javascript
const eventData = {
  summary: "Team Meeting",
  start: {
    dateTime: "2024-01-15T10:00:00Z",
    timeZone: "UTC"
  },
  end: {
    dateTime: "2024-01-15T11:00:00Z",
    timeZone: "UTC"
  },
  attendees: [
    { email: "team@company.com" }
  ]
};

const response = await api.post('/api/v1/events/', eventData);
```

### Searching Events
```javascript
const searchResults = await api.get('/api/v1/events/search/', {
  params: { q: "meeting", max_results: 20 }
});
```

### Quick Add with Natural Language
```javascript
const quickEvent = await api.post('/api/v1/events/quick-add', {
  text: "Dentist appointment next Friday at 2pm"
});
```

## Google Calendar Feature Parity

This implementation provides comprehensive coverage for:

✅ **Event Management**: Create, read, update, delete events
✅ **Search**: Full-text search across events
✅ **Calendar Management**: Multiple calendar support
✅ **Natural Language**: Quick event creation
✅ **Date Filtering**: Flexible date range queries
✅ **Event Details**: Complete metadata including attendees, reminders, recurrence
✅ **Notifications**: Attendee notification control
✅ **Event Moving**: Transfer events between calendars
✅ **Recurring Events**: Support for recurring event series
✅ **Attachments**: Event file attachments
✅ **Conference Data**: Meeting links and conference details

This provides all the functionality needed to build a comprehensive Google Calendar-like frontend interface.
