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
import AnimatedList from './Lib/Components/List/AnimatedList';
import AddButtons from './Lib/Components/AddButtons';
import CreateNewList from './Lib/Components/List/CreateNewList';
import CreateNewTodo from './Lib/Components/Todo/CreateNewTodo';

import {listsState} from './Lib/State/ListState';

import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GREY,
  COLOR_LIGHTBLACK,
  COLOR_LIGHTERBLACK,
  COLOR_RED,
  COLOR_WHITE,
} from './Lib/Assets/Styles/global-styles';

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

  return (
    <SafeAreaView style={{backgroundColor: COLOR_BLACK, height: '100%'}}>
      <StatusBar barStyle={'light-content'} />

      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Main content */}
        <View style={styles.mainContentContainer}>
          {/* Top right button */}
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                // Change state
                const newState =
                  isUpdateMenuOpen === 'nothing' ? 'update' : 'nothing';
                setIsUpdateMenuOpen(newState);

                // Change button text
                console.log('state : ', isUpdateMenuOpen);
                const newText = newState === 'update' ? 'OK' : 'Update';
                setUpdateButtonText(newText);
              }}>
              <Text
                style={
                  (styles.textStyle,
                  {
                    color: COLOR_WHITE,
                  })
                }>
                {updateButtonText}
              </Text>
            </TouchableOpacity>
          </View>

          {/* My Lists text */}
          <Text
            style={[
              styles.textStyle,
              {
                fontSize: 26,
                fontWeight: 'bold',
                marginLeft: '5%',
              },
            ]}>
            My Lists
          </Text>

          {/* Lists */}
          {/* <ListContainer>
            <FlatList
              data={lists}
              keyExtractor={list => list.id}
              ListEmptyComponent={() => (
                <Text style={styles.textStyle}>Nothing to show.</Text>
              )}
              renderItem={list => (
                <AnimatedList
                  updateMode={isUpdateMenuOpen}
                  setUpdateModeAfterDelete={() => {
                    setIsUpdateMenuOpen('nothing');
                    setUpdateButtonText('Update');
                  }}
                  key={list.index}
                  list={list.item}
                  navigateTo={() => {
                    navigation.navigate(
                      'ListInfoScreen' as never,
                      {list: list.item} as never,
                    );
                  }}
                />
              )}
            />
          </ListContainer> */}
          <ScrollView>
            <ListContainer>
              {lists.map((list, index) => (
                <AnimatedList
                  updateMode={isUpdateMenuOpen}
                  setUpdateModeAfterDelete={() => {
                    setIsUpdateMenuOpen('nothing');
                    setUpdateButtonText('Update');
                  }}
                  key={index}
                  list={list}
                  navigateTo={() => {
                    navigation.navigate(
                      'ListInfoScreen' as never,
                      {list: list} as never,
                    );
                  }}
                />
              ))}
            </ListContainer>
          </ScrollView>
        </View>

        {/* Buttons container */}
        <View style={styles.buttonGroupContainer}>
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
  contentContainer: {
    flex: 1,
  },

  mainContentContainer: {
    flex: 2,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: '5%',
    marginTop: '5%',
  },
  buttonGroupContainer: {
    // flex: 1,
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
