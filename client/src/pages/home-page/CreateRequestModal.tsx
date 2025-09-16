import { Button, DatePicker, Input, Modal } from "../../components"
import { CreateEventRequestRequest } from "../../redux/types/event-requests.types";
import { useState } from "react";
import styles from "./CreateRequestModal.module.css";

export interface CreateRequestFormData {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    notes: string;
}

interface CreateRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRequestCreated: (request: CreateEventRequestRequest) => void;
}


export const CreateRequestModal = ({ isOpen, onClose, onRequestCreated }: CreateRequestModalProps) => {
    const [formData, setFormData] = useState<CreateRequestFormData>({
        title: '' as string,
        location: '' as string,
        description: '' as string,
        start_date: '' as string,
        end_date: '' as string,
        notes: '' as string,
    });

    const handleCreateRequest = async () => {
        await onRequestCreated({
            ...formData,
            importance_level: 1,
        });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Request"
        >
            <div className={styles.createRequestModal}>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Enter title" fullWidth />
                <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Enter description" fullWidth />
                <DatePicker value={formData.start_date} onChange={(date) => setFormData({ ...formData, start_date: date || '' })} placeholder="Enter start date" fullWidth />
                <DatePicker value={formData.end_date} onChange={(date) => setFormData({ ...formData, end_date: date || '' })} placeholder="Enter end date" fullWidth />
                <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Enter location" fullWidth />
                <Input value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Enter notes" fullWidth />
                <Button onClick={handleCreateRequest}>Create Request</Button>
            </div>
        </Modal>
    )
}