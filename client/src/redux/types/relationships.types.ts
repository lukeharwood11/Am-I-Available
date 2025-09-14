import { RelationshipData } from '../hubs/relationships.hub';
import { RelationshipRequestData } from '../hubs/relationship-requests.hub';

// Relationship State Types
export interface RelationshipState {
  relationships: RelationshipData[];
  relationshipRequests: {
    sent: RelationshipRequestData[];
    received: RelationshipRequestData[];
  };
  currentRelationship: RelationshipData | null;
  currentRelationshipRequest: RelationshipRequestData | null;
  loading: boolean;
  error: string | null;
}
