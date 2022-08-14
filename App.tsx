import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import ListContainer from './Lib/Components/List/ListContainer';
import List from './Lib/Components/List/List';
import AddButtons from './Lib/Components/AddButtons';
import CreateNewList from './Lib/Components/List/CreateNewList';
import CreateNewTodo from './Lib/Components/Todo/CreateNewTodo';

import {listsState} from './Lib/State/ListState';

import {
  COLOR_BLACK,
  COLOR_GREEN,
  COLOR_LIGHTBLACK,
  COLOR_LIGHTERBLACK,
  COLOR_LIGHTGREY,
  COLOR_WHITE,
} from './Lib/Assets/Styles/global-styles';
import {ALL_LISTS_LIST_ID} from './Lib/defaults';
import {IList} from './Lib/Interfaces/IList';

const App = () => {
  // List of lists (recoil js state)
  const [lists, setLists] = useRecoilState(listsState);

  // Controller le Bottom Sheet pour ajouter une liste
  const listBottomSheetRef = useRef<any>(null);

  // Controller le Bottom Sheet pour ajouter une todo
  const todoBottomSheetRef = useRef<any>(null);

  // React navigation
  const navigation = useNavigation();

  // State to know if top right button ("Update") is pressed
  const [isUpdateMenuOpen, setIsUpdateMenuOpen] = useState<
    'nothing' | 'update'
  >('nothing');

  // Update button text
  const [updateButtonText, setUpdateButtonText] = useState<'Update' | 'OK'>(
    'Update',
  );

  // Render item of "All lists"
  const renderItemAllLists = (index: number, list: IList) => {
    return (
      <List
        key={index}
        icon="star"
        color={COLOR_GREEN}
        updateMode={isUpdateMenuOpen}
        setUpdateModeAfterDelete={() => {
          setIsUpdateMenuOpen('nothing');
          setUpdateButtonText('Update');
        }}
        list={list}
        navigateTo={() => {
          navigation.navigate('ListInfoScreen' as never, {list: list} as never);
        }}
      />
    );
  };

  // Render item of all other lists
  const renderItemLists = (index: number, list: IList) => {
    return (
      <List
        key={index}
        updateMode={isUpdateMenuOpen}
        setUpdateModeAfterDelete={() => {
          setIsUpdateMenuOpen('nothing');
          setUpdateButtonText('Update');
        }}
        list={list}
        navigateTo={() => {
          navigation.navigate('ListInfoScreen' as never, {list: list} as never);
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: COLOR_BLACK, height: '100%'}}>
      <StatusBar barStyle={'light-content'} />

      {/* Content */}
      <View style={styles.container}>
        {/* Main content */}
        <View style={styles.mainContentContainer}>
          {/* Header */}
          <View style={styles.headerContainer}>
            {/* Top right button */}
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={() => {
                // Change state
                const newState =
                  isUpdateMenuOpen === 'nothing' ? 'update' : 'nothing';
                setIsUpdateMenuOpen(newState);

                // Change button text
                const newText = newState === 'update' ? 'OK' : 'Update';
                setUpdateButtonText(newText);
              }}>
              <Text
                style={
                  (styles.textStyle,
                  {
                    color: COLOR_WHITE,
                    fontSize: 16,
                  })
                }>
                {updateButtonText}
              </Text>
            </TouchableOpacity>

            {/* My Lists text */}
            <Text
              style={[
                styles.textStyle,
                {
                  fontSize: 26,
                  fontWeight: 'bold',
                },
              ]}>
              My Lists
            </Text>
          </View>

          {/* Lists */}
          <ScrollView>
            <ListContainer>
              {lists.map((list, index) => {
                if (list.id === ALL_LISTS_LIST_ID) {
                  return renderItemAllLists(index, list);
                } else {
                  return renderItemLists(index, list);
                }
              })}
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
  container: {},

  mainContentContainer: {
    height: '90%',
  },

  headerContainer: {
    marginHorizontal: '5%',
    marginVertical: '5%',
  },

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

  textStyle: {
    color: COLOR_WHITE,
  },
});

export default App;
