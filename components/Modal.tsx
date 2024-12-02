import React, { ReactNode } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";

interface CustomModalProps {
  visible: boolean; // Determines if the modal is visible
  onClose: () => void; // Function to call when the modal is closed
  title: string; // Title of the modal
  children: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          {children}
          <View style={styles.buttonContainer}>
            <CustomButton title="Close" handlePress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background dim
  },
  modalContent: {
    width: "100%",
    height: "50%", // Take 50% of the height
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
});

export default CustomModal;
