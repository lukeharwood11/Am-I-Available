# Scheduling & Availability App - Design Document

## Overview
A web application for managing shared resources, coordinating schedules, and handling date requests within households or close relationships. The system integrates with Google services for authentication and calendar access while providing sophisticated approval workflows for resource allocation.

## Tech Stack

### Frontend
- **Framework**: React with Redux for state management
- **Hosting**: AWS S3 with CloudFront CDN
- **UI Library**: TBD (recommend Material-UI or Chakra UI for rapid development)
- **HTTP Client**: Axios or React Query for API communication

### Backend
- **Framework**: FastAPI (Python)
- **Hosting**: AWS Lambda with Docker containers
- **API Gateway**: AWS API Gateway for REST endpoints
- **Authentication**: Supabase Auth with Google OAuth integration

### Database & Auth
- **Database**: Supabase (PostgreSQL-based)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase real-time subscriptions for live updates

### External Integrations
**Google APIs:**
- OAuth 2.0 for authentication
- Google Calendar API for schedule access
- Gmail API for email access

**Future**: SMS providers (Twilio), Push notifications (FCM)

## Database Schema

### Core Tables

#### users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supabase_user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    google_access_token TEXT,
    google_refresh_token TEXT,
    google_calendar_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### houses
```sql
CREATE TABLE houses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### house_members
```sql
CREATE TABLE house_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    house_id UUID NOT NULL REFERENCES houses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member', -- 'admin', 'member'
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(house_id, user_id)
);
```

#### assets
```sql
CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    house_id UUID NOT NULL REFERENCES houses(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    asset_type VARCHAR(100), -- 'car', 'house', 'room', 'equipment', etc.
    is_shareable BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### date_requests
```sql
CREATE TABLE date_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    house_id UUID NOT NULL REFERENCES houses(id) ON DELETE CASCADE,
    requester_id UUID NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    end_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    importance_level INTEGER CHECK (importance_level >= 1 AND importance_level <= 5), -- 1 = low, 5 = critical
    flexibility_hours INTEGER DEFAULT 0, -- how many hours flexible on timing
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'cancelled'
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### request_assets
```sql
CREATE TABLE request_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES date_requests(id) ON DELETE CASCADE,
    asset_id UUID NOT NULL REFERENCES assets(id),
    is_required BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### request_approvals
```sql
CREATE TABLE request_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES date_requests(id) ON DELETE CASCADE,
    approver_id UUID NOT NULL REFERENCES users(id),
    is_mandatory BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    response_notes TEXT,
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(request_id, approver_id)
);
```
### Future Tables (for later features)

#### recurring_templates
```sql
CREATE TABLE recurring_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    house_id UUID NOT NULL REFERENCES houses(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    recurrence_pattern JSONB, -- flexible pattern storage
    duration_hours INTEGER,
    advance_notice_days INTEGER DEFAULT 7,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
## API Endpoints

### Authentication & Users

#### POST /auth/google
- **Purpose**: Complete Google OAuth flow
- **Request**: `{ "code": "oauth_code", "redirect_uri": "..." }`
- **Response**: `{ "access_token": "...", "user": {...} }`

#### GET /users/me
- **Purpose**: Get current user profile
- **Response**: User object with house memberships

#### PUT /users/me
- **Purpose**: Update user profile
- **Request**: `{ "full_name": "...", "preferences": {...} }`

### Houses & Members

#### GET /houses
- **Purpose**: Get houses user belongs to
- **Response**: `{ "houses": [...] }`

#### POST /houses
- **Purpose**: Create new house
- **Request**: `{ "name": "...", "description": "..." }`

#### GET /houses/{house_id}/members
- **Purpose**: Get house members
- **Response**: `{ "members": [...] }`

#### POST /houses/{house_id}/members
- **Purpose**: Add member to house
- **Request**: `{ "email": "...", "role": "member" }`

### Assets

#### GET /houses/{house_id}/assets
- **Purpose**: Get all assets for a house
- **Response**: `{ "assets": [...] }`

#### POST /houses/{house_id}/assets
- **Purpose**: Create new asset
- **Request**: `{ "name": "...", "asset_type": "car", "description": "..." }`

#### PUT /assets/{asset_id}
- **Purpose**: Update asset
- **Request**: Asset update object

#### DELETE /assets/{asset_id}
- **Purpose**: Delete asset

### Date Requests

#### GET /houses/{house_id}/requests
- **Purpose**: Get date requests for house
- **Query Params**: `?status=pending&start_date=...&end_date=...`
- **Response**: `{ "requests": [...] }`

#### POST /houses/{house_id}/requests
- **Purpose**: Create new date request
- **Request**:
```json
{
    "title": "Weekend Trip",
    "description": "Family vacation",
    "start_datetime": "2024-03-15T10:00:00Z",
    "end_datetime": "2024-03-17T18:00:00Z",
    "importance_level": 4,
    "flexibility_hours": 6,
    "notes": "Can be flexible on start time",
    "required_assets": [{"asset_id": "...", "is_required": true}],
    "approvers": [
        {"user_id": "...", "is_mandatory": true},
        {"user_id": "...", "is_mandatory": false}
    ]
}
```

#### PUT /requests/{request_id}
- **Purpose**: Update request (only by requester)
- **Request**: Partial request object

#### POST /requests/{request_id}/approve
- **Purpose**: Approve or reject request
- **Request**: `{ "status": "approved|rejected", "notes": "..." }`

#### DELETE /requests/{request_id}
- **Purpose**: Cancel request (only by requester)

### Availability

#### POST /availability/check
- **Purpose**: Natural language availability query
- **Request**:
```json
{
    "query": "Am I free next Friday evening?",
    "house_id": "...",
    "context_days": 30
}
```
- **Response**:
```json
{
    "interpretation": "Checking availability for Friday, March 15, 2024 from 6:00 PM onwards",
    "available": true,
    "conflicts": [],
    "suggestions": ["You're free from 6:00 PM to 11:00 PM"]
}
```

#### GET /availability/calendar
- **Purpose**: Get calendar view of requests and availability
- **Query Params**: `?start_date=...&end_date=...&house_id=...`
- **Response**: Calendar events with conflicts highlighted

## Key Features Implementation

### Google Integration
- **OAuth Flow**: Use Supabase Auth with Google provider
- **Calendar Access**: Store refresh tokens for ongoing calendar access
- **Gmail Integration**: Access user's Gmail for notifications and scheduling emails

### Request Approval Workflow
1. User creates request with required approvers (mandatory vs optional)
2. System notifies all approvers via email/push notification
3. Each approver can approve/reject with optional notes
4. Request status updates based on approval rules:
   - All mandatory approvers must approve
   - Optional approvers don't block approval
   - Any rejection from mandatory approver rejects request

### Natural Language Availability
- **Backend Processing**: Use OpenAI API or similar for query interpretation
- **Calendar Integration**: Cross-reference with Google Calendar events
- **Conflict Detection**: Check against existing approved requests
- **Response Generation**: Provide human-readable availability summary

### Asset Conflict Resolution
- **Booking System**: Prevent double-booking of assets
- **Priority System**: Higher importance requests get precedence
- **Notification System**: Alert users of conflicts

## Security Considerations

### Authentication
- Use Supabase RLS (Row Level Security) for data access control
- Store Google tokens encrypted
- Implement proper JWT token validation

### Data Access
- Users can only access houses they're members of
- Request creators can modify their own requests
- House admins have additional permissions

### API Security
- Rate limiting on all endpoints
- Input validation and sanitization
- CORS configuration for frontend domain

## Performance Considerations

### Database
- Index on frequently queried columns (user_id, house_id, start_datetime)
- Implement connection pooling
- Consider read replicas for heavy query workloads

### Caching
- Redis for session storage and frequently accessed data
- CloudFront caching for static assets
- API response caching for expensive queries

### Lambda Optimization
- Keep containers warm with scheduled pings
- Optimize Docker image size
- Use Lambda layers for common dependencies

## Future Feature Roadmap

### Phase 2: Communication
- Email notifications via SES
- SMS notifications via Twilio
- Push notifications via FCM
- In-app messaging system

### Phase 3: Smart Scheduling
- AI-powered conflict resolution
- Automatic rescheduling suggestions
- Integration with multiple calendar providers
- Weather and traffic considerations

### Phase 4: Advanced Features
- Mobile app (React Native)
- Calendar sharing with external parties
- Integration with smart home devices
- Advanced analytics and reporting

## Deployment Architecture

### Development Environment
- Local development with Docker Compose
- Supabase local development setup
- Environment-specific configurations

### Production Deployment
- Infrastructure as Code (Terraform/CDK)
- CI/CD pipeline with GitHub Actions
- Blue/green deployment strategy
- Automated testing and security scanning

### Monitoring & Observability
- CloudWatch for Lambda monitoring
- Application logging with structured logs
- Error tracking with Sentry
- Performance monitoring with AWS X-Ray

## Getting Started Checklist

### Backend Setup
- [ ] Set up Supabase project and configure authentication
- [ ] Create database schema and RLS policies
- [ ] Set up FastAPI project structure
- [ ] Implement Google OAuth integration
- [ ] Create core API endpoints
- [ ] Set up AWS Lambda deployment

### Frontend Setup
- [ ] Initialize React project with Redux
- [ ] Set up authentication flow
- [ ] Create core components and pages
- [ ] Implement API client
- [ ] Set up S3/CloudFront deployment
- [ ] Configure environment variables

### Integration Testing
- [ ] End-to-end authentication flow
- [ ] Google Calendar integration
- [ ] Request approval workflow
- [ ] Natural language processing
- [ ] Real-time updates via Supabase