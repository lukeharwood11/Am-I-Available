import React, { useEffect } from 'react';
import { useReduxEventRequests } from '../../hooks/useReduxEventRequests';
import { Button, Text, Card } from '../';
import { MdAdd, MdRefresh, MdEdit, MdDelete } from 'react-icons/md';

/**
 * Example component demonstrating how to use the event requests Redux integration
 * This shows the complete workflow from fetching data to performing CRUD operations
 */
export const EventRequestsExample: React.FC = () => {
  const {
    // State
    eventRequests,
    eventRequestsWithApprovals,
    currentEventRequest,
    loading,
    error,
    pagination,

    // Filtered data
    pendingEventRequests,
    approvedEventRequests,
    rejectedEventRequests,
    highImportanceEventRequests,

    // Counts
    eventRequestsCount,
    pendingEventRequestsCount,
    approvedEventRequestsCount,
    rejectedEventRequestsCount,
    highImportanceEventRequestsCount,

    // Actions
    createEventRequest,
    fetchEventRequests,
    fetchEventRequestsWithApprovals,
    fetchEventRequest,
    updateEventRequest,
    deleteEventRequest,
  } = useReduxEventRequests();

  // Load event requests on component mount
  useEffect(() => {
    fetchEventRequests();
    fetchEventRequestsWithApprovals({ skip: 0, take: 10 });
  }, [fetchEventRequests, fetchEventRequestsWithApprovals]);

  const handleCreateEventRequest = async () => {
    try {
      await createEventRequest({
        description: 'Sample Event Request',
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
        importance_level: 3,
        location: 'Conference Room A',
        notes: 'This is a sample event request created from the example component',
      });
      console.log('Event request created successfully');
    } catch (error) {
      console.error('Failed to create event request:', error);
    }
  };

  const handleUpdateEventRequest = async (eventRequestId: string) => {
    try {
      await updateEventRequest(eventRequestId, {
        status: 'approved',
        notes: 'Updated via example component',
      });
      console.log('Event request updated successfully');
    } catch (error) {
      console.error('Failed to update event request:', error);
    }
  };

  const handleDeleteEventRequest = async (eventRequestId: string) => {
    try {
      await deleteEventRequest(eventRequestId);
      console.log('Event request deleted successfully');
    } catch (error) {
      console.error('Failed to delete event request:', error);
    }
  };

  const handleRefresh = () => {
    fetchEventRequests();
    fetchEventRequestsWithApprovals({ skip: 0, take: 10 });
  };

  if (loading) {
    return (
      <Card>
        <Text>Loading event requests...</Text>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Text color="error">Error: {error}</Text>
        <Button onClick={handleRefresh} icon={<MdRefresh />}>
          Retry
        </Button>
      </Card>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Text size="large" weight="bold">
            Event Requests Example
          </Text>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button onClick={handleCreateEventRequest} icon={<MdAdd />}>
              Create Event Request
            </Button>
            <Button onClick={handleRefresh} icon={<MdRefresh />}>
              Refresh
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
          <Card>
            <Text size="small" color="secondary">Total Event Requests</Text>
            <Text size="large" weight="bold">{eventRequestsCount}</Text>
          </Card>
          <Card>
            <Text size="small" color="secondary">Pending</Text>
            <Text size="large" weight="bold" color="warning">{pendingEventRequestsCount}</Text>
          </Card>
          <Card>
            <Text size="small" color="secondary">Approved</Text>
            <Text size="large" weight="bold" color="success">{approvedEventRequestsCount}</Text>
          </Card>
          <Card>
            <Text size="small" color="secondary">Rejected</Text>
            <Text size="large" weight="bold" color="error">{rejectedEventRequestsCount}</Text>
          </Card>
          <Card>
            <Text size="small" color="secondary">High Importance</Text>
            <Text size="large" weight="bold" color="primary">{highImportanceEventRequestsCount}</Text>
          </Card>
        </div>

        {/* Event Requests List */}
        <div>
          <Text size="medium" weight="bold" style={{ marginBottom: '15px' }}>
            Event Requests ({eventRequests.length})
          </Text>
          
          {eventRequests.length === 0 ? (
            <Card>
              <Text color="secondary">No event requests found. Create one to get started!</Text>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {eventRequests.map((request) => (
                <Card key={request.id} style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <Text weight="bold" style={{ marginBottom: '5px' }}>
                        {request.description || 'Untitled Event Request'}
                      </Text>
                      <Text size="small" color="secondary" style={{ marginBottom: '5px' }}>
                        {new Date(request.start_date).toLocaleString()} - {new Date(request.end_date).toLocaleString()}
                      </Text>
                      {request.location && (
                        <Text size="small" color="secondary" style={{ marginBottom: '5px' }}>
                          📍 {request.location}
                        </Text>
                      )}
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <Text 
                          size="small" 
                          color={request.status === 'approved' ? 'success' : request.status === 'rejected' ? 'error' : 'warning'}
                        >
                          Status: {request.status}
                        </Text>
                        <Text size="small" color="secondary">
                          Importance: {request.importance_level}/5
                        </Text>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <Button 
                        size="small" 
                        icon={<MdEdit />}
                        onClick={() => handleUpdateEventRequest(request.id)}
                        disabled={request.status === 'approved'}
                      >
                        Update
                      </Button>
                      <Button 
                        size="small" 
                        variant="danger" 
                        icon={<MdDelete />}
                        onClick={() => handleDeleteEventRequest(request.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Info */}
        {pagination.total_count > 0 && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Text size="small" color="secondary">
              Showing {pagination.skip + 1}-{Math.min(pagination.skip + pagination.take, pagination.total_count)} of {pagination.total_count} event requests
            </Text>
          </div>
        )}
      </Card>
    </div>
  );
};
