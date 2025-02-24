import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ModalResetPasswordProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  email: string;
}

const ModalResetPassword: React.FC<ModalResetPasswordProps> = ({
  visible,
  onClose,
  onConfirm,
  email,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Restablecer Contraseña</Text>
          <Text style={styles.modalText}>
            Se enviará un correo a:{"\n"}
            <Text style={styles.emailText}>{email}</Text>
          </Text>

          <TouchableOpacity style={styles.modalButton} onPress={onConfirm}>
            <Text style={styles.modalButtonText}>Confirmar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalResetPassword;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  emailText: {
    fontWeight: "bold",
    color: "#007bff",
  },
  modalButton: {
    width: "100%",
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelText: {
    color: "#007bff",
    fontSize: 16,
  },
});
