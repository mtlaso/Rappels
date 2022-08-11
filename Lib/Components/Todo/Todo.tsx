import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useRecoilState} from 'recoil';
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutRight,
  Layout,
  withTiming,
} from 'react-native-reanimated';

import {ITodo} from '../../Interfaces/ITodo';

import {todosState} from '../../State/TodoState';

import {
  COLOR_BLACK,
  COLOR_GREEN,
  COLOR_GREY,
  COLOR_LIGHTBLACK,
  COLOR_WHITE,
} from '../../Assets/Styles/global-styles';
import {TextInput} from 'react-native-gesture-handler';

import {MAX_LENGTH_TODO_TITLE} from '../../defaults';

const Todo = (props: {
  /**
   * Todo to render
   */
  todo: ITodo;
}) => {
  // List of todos (recoil js state)
  const [todos, setTodo] = useRecoilState(todosState);

  // Find todo index
  const index = todos.findIndex(todo => todo.id === props.todo.id);

  // To focus on text input when user presses
  const textInputRef = useRef<TextInput>(null);

  // Save new todo description
  const [todoDesc, setTodoDesc] = useState<string>(props.todo.description);

  // Update todo
  const UpdateTodo = () => {
    // Validate input
    if (
      todoDesc.trim().length < 1 ||
      todoDesc.trim().length > MAX_LENGTH_TODO_TITLE
    ) {
      Alert.alert(
        'Cannot Update Todo',
        `Todo description must be between 1 and ${MAX_LENGTH_TODO_TITLE} characters`,
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
        },
      );
      return;
    }

    // Updated todo
    const updatedTodo = {
      ...props.todo,
      description: todoDesc,
    };

    // Update todo
    setTodo([...todos.slice(0, index), updatedTodo, ...todos.slice(index + 1)]);
  };

  // Update todo completed status
  const UpdateTodoCompletedStatus = () => {
    const completed = !props.todo.completed;

    const updatedTodo = {
      ...props.todo,
      completed: completed,
    };

    // Update todo
    setTodo([...todos.slice(0, index), updatedTodo, ...todos.slice(index + 1)]);
  };

  // Delete todo when status is completed after 2 seconds
  useEffect(() => {
    if (props.todo.completed) {
      setTimeout(() => {
        setTodo([...todos.slice(0, index), ...todos.slice(index + 1)]);
      }, 2000);
    }
  }, [props.todo.completed]);

  return (
    <Animated.View
      entering={LightSpeedInLeft}
      exiting={LightSpeedOutRight}
      layout={Layout.springify()}>
      <TouchableOpacity
        style={styles.container}
        onPress={e => textInputRef.current?.focus()}>
        {/* Circle */}
        <TouchableOpacity onPress={e => UpdateTodoCompletedStatus()}>
          {props.todo.completed ? (
            <View style={styles.circleFull}>
              <View style={styles.innerFullCircle} />
            </View>
          ) : (
            <View style={styles.circle} />
          )}
        </TouchableOpacity>

        {/* Textinput */}
        <TextInput
          style={[styles.textStyle, styles.textInput]}
          defaultValue={props.todo.description}
          editable
          maxLength={MAX_LENGTH_TODO_TITLE}
          ref={textInputRef}
          onChangeText={setTodoDesc}
          onEndEditing={e => {
            UpdateTodo();
          }}
          onSubmitEditing={e => UpdateTodo()}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: COLOR_LIGHTBLACK,
    marginHorizontal: '5%',
    marginBottom: '4%',
    paddingBottom: '3%',
  },
  circle: {
    backgroundColor: 'transparent',
    width: 25,
    height: 25,
    borderRadius: 30 / 2,
    borderWidth: 3,
    borderColor: COLOR_LIGHTBLACK,
    marginRight: '5%',
  },

  circleFull: {
    backgroundColor: 'transparent',
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    borderWidth: 3,
    borderColor: COLOR_WHITE,
    marginRight: '5%',
    justifyContent: 'center',
  },

  innerFullCircle: {
    backgroundColor: COLOR_WHITE,
    width: 12,
    height: 12,
    borderRadius: 15 / 2,
    alignSelf: 'center',
    // borderWidth: 2,
  },

  textStyle: {
    color: COLOR_WHITE,
    fontSize: 18,
  },

  textInput: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});
