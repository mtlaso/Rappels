import React, {useRef, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import ListContainer from './Lib/Components/ListContainer';
import List from './Lib/Components/List';
import AddButtons from './Lib/Components/AddButtons';
import CreateNewList from './Lib/Components/List/CreateNewList';
import CreateNewTodo from './Lib/Components/Todo/CreateNewTodo';

import {listsState} from './Lib/State/TaskState';

import {
  COLOR_BLACK,
  COLOR_LIGHTBLACK,
  COLOR_LIGHTERBLACK,
  COLOR_WHITE,
} from './Lib/Assets/Styles/global-styles';

const App = () => {
  const [lists, setLists] = useRecoilState(listsState);

  // Controller le Bottom Sheet pour ajouter une liste
  const listBottomSheetRef = useRef<any>(null);

  // Controller le Bottom Sheet pour ajouter une todo
  const todoBottomSheetRef = useRef<any>(null);

  // React navigation
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor: COLOR_BLACK, height: '100%'}}>
      <StatusBar barStyle={'light-content'} />

      <Text
        style={{
          margin: '5%',
          marginBottom: '0%',
          color: COLOR_WHITE,
          fontSize: 26,
          fontWeight: 'bold',
        }}>
        My Lists
      </Text>

      {/* Main content */}
      <View>
        {/* Lists */}
        <View style={{height: '85%'}}>
          <ScrollView>
            <ListContainer>
              {lists.map((list, index) => (
                <List
                  key={index}
                  list={list}
                  navigateTo={() => {
                    navigation.navigate(
                      'TestScreen' as never,
                      {list: list} as never,
                    );
                  }}
                />
              ))}
            </ListContainer>
          </ScrollView>
        </View>

        {/* Buttons container */}
        <View style={styles.buttonsContainer}>
          <AddButtons
            listOpenBottomSheet={() => {
              const openSheet =
                listBottomSheetRef.current.ChangeBottomSheetToIndex;
              const maxSnapPoints = listBottomSheetRef.current.maxSnapPoints;

              openSheet(maxSnapPoints);
            }}
            todoOpenBottomSheet={() => {
              const openSheet =
                todoBottomSheetRef.current.ChangeBottomSheetToIndex;
              const maxSnapPoints = todoBottomSheetRef.current.maxSnapPoints;

              openSheet(maxSnapPoints);
            }}
          />
        </View>
      </View>

      {/* Créer une nouvelle liste */}
      <CreateNewList ref={listBottomSheetRef} />

      {/* Créer une nouvelle todo */}
      <CreateNewTodo ref={todoBottomSheetRef} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5%',
    backgroundColor: COLOR_LIGHTBLACK,
    borderTopWidth: 1,
    borderTopColor: COLOR_LIGHTERBLACK,
  },
});

export default App;
