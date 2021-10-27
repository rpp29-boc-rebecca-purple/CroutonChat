import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions} from "react-native";
import data from '../data/conversationMockData.js';

const Conversation = () => {
  return (
    <ScrollView>
      {
        data.map((message) => {
          return (
          <Text>
            {message.body}
          </Text>
          )
        })
      }
    </ScrollView>
  );
};

export default Conversation;