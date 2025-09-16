import { RelationshipWithUserData } from '../hubs/relationships.hub';
import { RelationshipRequestData, RelationshipRequestWithUserData } from '../hubs/relationship-requests.hub';

// Relationship State Types
export interface RelationshipState {
  relationships: RelationshipWithUserData[];
  relationshipRequests: {
    sent: RelationshipRequestData[];
    received: RelationshipRequestWithUserData[];
  };
  currentRelationship: RelationshipWithUserData | null;
  currentRelationshipRequest: RelationshipRequestData | null;
  pagination: {
    skip: number;
    take: number;
    total_count: number;
  };
  loading: boolean;
  error: string | null;
}
