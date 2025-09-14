import { Modal } from "../../components"


interface CreateRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateRequestModal = ({ isOpen, onClose }: CreateRequestModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Request"
        >
            <p>Create Request</p>
        </Modal>
    )
}