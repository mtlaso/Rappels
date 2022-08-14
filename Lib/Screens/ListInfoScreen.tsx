import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ListRenderItem,
} from 'react-native';
import React, {useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useRecoilState} from 'recoil';
import uuid from 'react-native-uuid';

import Todo from '../Components/Todo/Todo';

import {IList} from '../Interfaces/IList';
import {ITodo} from '../Interfaces/ITodo';

import {
  COLOR_BLACK,
  COLOR_GREEN,
  COLOR_LIGHTBLACK,
  COLOR_LIGHTERBLACK,
  COLOR_WHITE,
} from '../Assets/Styles/global-styles';

import {todosState} from '../State/TodoState';

import {
  ALL_LISTS_LIST_ID,
  ALL_LISTS_LIST_TITLE,
  DEFAULT_LIST_ID,
  FONT_SIZES,
} from '../defaults';

/**
 * Component to render a list todos
 */
const ListInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{props: {list: IList}}>>();

  /**
   * List received from route parameters from main screen
   */
  const list = route.params.list;

  // List of todos (recoil js state)
  const [todos, setTodos] = useRecoilState(todosState);

  // Create new temporary todo. Used when user presses add button from this screen.
  const CreateNewTempTodo = () => {
    // Find list id of the list to add this todo to. Chooses default list id unless list id is "All list",
    // in which case it chooses "Default list" id.
    // Because we cannot add a todo to the "All lists" list
    const listId = list.id === ALL_LISTS_LIST_ID ? DEFAULT_LIST_ID : list.id;

    // New todo to create
    const newTempTodo: ITodo = {
      id: uuid.v4().toString(),
      parentListId: listId,
      date: new Date(),
      description: 'New todo...',
      completed: false,
    };

    // Add new todo to list of todos (to the top)
    setTodos([newTempTodo, ...todos]);
  };

  return (
    <SafeAreaView style={{backgroundColor: COLOR_BLACK, height: '100%'}}>
      <StatusBar barStyle={'light-content'} />

      {/* Main content */}
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          {/* Go back button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeScreen' as never)}
            style={{}}>
            <Icon
              name="arrowleft"
              size={25}
              color={COLOR_WHITE}
              style={[
                styles.iconArrowLeft,

                list.id === ALL_LISTS_LIST_ID
                  ? styles.iconArrowLeftAllLists
                  : null,
              ]}
            />
          </TouchableOpacity>

          {/* Title */}
          <Text
            style={[
              styles.textStyle,
              styles.titleStyle,

              list.id === ALL_LISTS_LIST_ID ? styles.titleStyleAllLists : null,
            ]}>
            {list.title}
          </Text>
        </View>

        {/* Content */}
        <ScrollView style={{flex: 1}}>
          {/* Todos */}
          {todos.map((todo, index) => {
            if (list.id === ALL_LISTS_LIST_ID) {
              return <Todo key={todo.id} todo={todo} />;
            } else {
              return (
                // Make sure to render todos associated with the parent list only
                todo.parentListId === list.id && (
                  <Todo key={todo.id} todo={todo} />
                )
              );
            }
          })}
        </ScrollView>
      </View>

      {/* Fab button 'CreateNewTempTodo' */}
      <TouchableOpacity style={styles.fabContainer} onPress={CreateNewTempTodo}>
        <Icon
          name="pluscircle"
          size={40}
          color={COLOR_WHITE}
          style={{marginRight: '2%'}}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ListInfoScreen;

const styles = StyleSheet.create({
  container: {
    height: '95%',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: '5%',
    marginVertical: '10%',
  },

  contentContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
  },

  textStyle: {
    color: COLOR_WHITE,
  },

  titleStyle: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    paddingLeft: '5%',
  },

  titleStyleAllLists: {color: COLOR_GREEN},

  iconArrowLeft: {
    textAlign: 'center',
    padding: '1%',
    backgroundColor: COLOR_WHITE,
    borderRadius: 50,
    color: COLOR_BLACK,
  },

  iconArrowLeftAllLists: {
    backgroundColor: COLOR_GREEN,
  },

  fabContainer: {
    position: 'absolute',
    bottom: 40,
    right: 15,
    zIndex: 3,
  },
});
