import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useRecoilValue} from 'recoil';

import ListContainer from '../Components/List/ListContainer';
import Todo from '../Components/Todo/Todo';

import {IList} from '../Interfaces/IList';
import {ITodo} from '../Interfaces/ITodo';

import {
  COLOR_BLACK,
  COLOR_GREEN,
  COLOR_WHITE,
} from '../Assets/Styles/global-styles';

import {todosState} from '../State/TodoState';
import {FlatList} from 'react-native-gesture-handler';

const ListInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{props: {list: IList}}>>();

  const list = route.params.list;
  const todos = useRecoilValue(todosState);

  return (
    <SafeAreaView style={{backgroundColor: COLOR_BLACK, height: '100%'}}>
      <StatusBar barStyle={'light-content'} />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          {/* Go back button */}
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
              <Icon
                name="arrowleft"
                size={25}
                color={COLOR_WHITE}
                style={styles.iconArrowLeft}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title */}
        <Text style={[styles.textStyle, styles.titleStyle]}>{list.title}</Text>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Lists */}
          {todos.length <= 0 && (
            <Text style={[styles.textStyle, {paddingLeft: '5%'}]}>
              No todos to show
            </Text>
          )}

          {todos.length > 0 && (
            <FlatList
              data={todos}
              keyExtractor={todo => todo.id}
              renderItem={todo => (
                <>
                  {todo.item.listId === list.id && (
                    <Todo key={todo.item.id} todo={todo.item} />
                  )}
                </>
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ListInfoScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
  },

  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
  },

  iconArrowLeft: {
    textAlign: 'center',
    padding: '1%',
    backgroundColor: COLOR_WHITE,
    borderRadius: 50,
    color: COLOR_BLACK,
  },
  textStyle: {
    color: COLOR_WHITE,
  },

  titleStyle: {
    marginTop: '5%',
    marginHorizontal: '5%',
    fontSize: 26,
    fontWeight: 'bold',
  },
});
