import { Box, Button, Modal } from "@mui/material";

const MuiModal: React.FC<{
  open: boolean;
  handleClose: () => void;
  handleAction: () => void;
  type: "delete";
  children: React.ReactNode;
}> = ({ open, type, handleAction, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box>
        {type === "delete" && (
          <DeleteContent
            resourceName="test"
            onDelete={handleAction}
            onCancel={handleClose}
          />
        )}
      </Box>
    </Modal>
  );
};

export default MuiModal;

const DeleteContent: React.FC<{
  resourceName: string;
  onDelete: () => void;
  onCancel: () => void;
}> = ({ resourceName, onDelete, onCancel }) => {
  return (
    <>
      <h2>Delete</h2>
      <div>You are about to remove {resourceName}. This can't be undone.</div>
      <div>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onDelete}>Delete</Button>
      </div>
    </>
  );
};
