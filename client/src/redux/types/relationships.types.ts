import { RelationshipData } from '../hubs/relationships.hub';
import { RelationshipRequestData } from '../hubs/relationship-requests.hub';

// Relationship State Types
// TODO: move this out of this file and into the slice file
// TODO: fix the hubs to return the actual filled out data (not just IDs)
// TODO: use supabase client where applicable
// TODO: add the actual types for relationship objects here
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
