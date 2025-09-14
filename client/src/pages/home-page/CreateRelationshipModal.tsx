import { Button, Input, Modal, Text } from "../../components"
import { useCallback, useState } from "react";
import styles from "./CreateRelationshipModal.module.css";
import { MdSend } from "react-icons/md";
import { createRelationshipRequestThunk } from "../../redux/thunks/relationship-requests.thunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

interface CreateRelationshipModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateRelationshipModal = ({ isOpen, onClose }: CreateRelationshipModalProps) => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    
    const handleSendRequest = useCallback(() => {
        dispatch(createRelationshipRequestThunk({ requested_email: email }));
    }, [email, dispatch]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Relationship"
        >
            <div className={styles.createRelationshipModal}>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address"
                    fullWidth
                />
                <Button leftIcon={<MdSend />} size="small" variant="primary" onClick={handleSendRequest}>Send Request</Button>
            </div>
        </Modal>
    )
}