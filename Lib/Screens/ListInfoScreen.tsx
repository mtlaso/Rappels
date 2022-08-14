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
  COLOR_LIGHTBLACK,
  COLOR_LIGHTERBLACK,
  COLOR_WHITE,
} from '../Assets/Styles/global-styles';

import {todosState} from '../State/TodoState';

import {
  ALL_LISTS_LIST_ID,
  ALL_LISTS_LIST_TITLE,
  DEFAULT_LIST_ID,
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
    // Find list id of list to add todo to. Chooses default list id unless list id is "All list",
    // in which case it chooses "Default list" id.
    const listId = list.id === ALL_LISTS_LIST_ID ? DEFAULT_LIST_ID : list.id;

    // New todo to create
    const newTempTodo: ITodo = {
      id: uuid.v4().toString(),
      listId: listId,
      date: new Date(),
      description: 'New todo...',
      completed: false,
    };

    // Add new todo to list of todos
    setTodos([...todos, newTempTodo]);
  };

  // Render item for flat list of "All lists" todos
  const renderItemsAllLists: ListRenderItem<ITodo> = todo => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Todo key={todo.item.id} todo={todo.item} />
    </KeyboardAvoidingView>
  );

  // Render item for flat list of All other todos
  const renderItemsDefault: ListRenderItem<ITodo> = todo => (
    <>
      {/* Make sure to render todos associated with this list only */}
      {todo.item.listId === list.id && (
        <Todo key={todo.item.id} todo={todo.item} />
      )}
    </>
  );

  return (
    <SafeAreaView style={{backgroundColor: COLOR_BLACK, height: '100%'}}>
      <StatusBar barStyle={'light-content'} />

      {/* Main content */}
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          {/* Go back button */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
            <Icon
              name="arrowleft"
              size={25}
              color={COLOR_WHITE}
              style={styles.iconArrowLeft}
            />
          </TouchableOpacity>

          {/* Title */}
          <Text style={[styles.textStyle, styles.titleStyle]}>
            {list.title}
          </Text>
        </View>

        {/* Todos */}
        <View style={styles.contentContainer}>
          {/* No todos to show */}
          {todos.length < 1 && (
            <Text style={[styles.textStyle, {paddingLeft: '5%'}]}>
              No todos to show.
            </Text>
          )}
          {/* Render "All lists" list (render all todos) */}
          {list.title === ALL_LISTS_LIST_TITLE && todos.length > 0 && (
            <FlatList
              data={todos}
              keyExtractor={todo => todo.id}
              renderItem={renderItemsAllLists}
            />
          )}
          {/* Render all other lists */}
          {list.title !== ALL_LISTS_LIST_TITLE && todos.length > 0 && (
            <FlatList
              data={todos}
              keyExtractor={todo => todo.id}
              renderItem={renderItemsDefault}
            />
          )}
        </View>
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
    height: '90%',
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
    alignItems: 'center',
  },

  textStyle: {
    color: COLOR_WHITE,
  },

  titleStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingLeft: '5%',
  },

  iconArrowLeft: {
    textAlign: 'center',
    padding: '1%',
    backgroundColor: COLOR_WHITE,
    borderRadius: 50,
    color: COLOR_BLACK,
  },

  fabContainer: {
    position: 'absolute',
    bottom: 40,
    right: 15,
    zIndex: 3,
  },
});
