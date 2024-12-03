import React, { Fragment } from "react";
import { Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View } from "react-native";
import { useState } from "react";

const ShareEvent: React.FC = () => {
  const users = ["User1", "User2", "User3", "User4"];
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpen = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <Fragment>
      <TouchableOpacity onPress={handleOpen}>
        <AntDesign name="sharealt" size={22} color="#fff" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={handleClose}
        >
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <TouchableOpacity activeOpacity={1} style={{ width: "100%" }}>
              <View
                style={{
                  width: "100%",
                  height: 400,
                  backgroundColor: "white",
                  padding: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                <Text>Share Event</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </Fragment>
  );
};

export default ShareEvent;
