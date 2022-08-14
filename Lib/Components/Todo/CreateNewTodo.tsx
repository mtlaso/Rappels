import BottomSheet, {
  TouchableOpacity,
  BottomSheetTextInput,
  BottomSheetView,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import uuid from 'react-native-uuid';

import ListDropdown from '../List/ListsDropdown';

import {ITodo} from '../../Interfaces/ITodo';

import {listsState} from '../../State/ListState';
import {todosState} from '../../State/TodoState';

import {
  COLOR_LIGHTBLACK,
  COLOR_LIGHTERBLACK,
  COLOR_LIGHTGREY,
  COLOR_WHITE,
} from '../../Assets/Styles/global-styles';

import {DEFAULT_LIST_ID, MAX_LENGTH_TODO_TITLE} from '../../defaults';

/**
 * Component pour créer une nouvelle todo
 */
const CreateNewTodo = React.forwardRef<any, {}>((props, ref) => {
  // State management (recoil js)
  const [lists, setLists] = useRecoilState(listsState);
  const [todos, setTodos] = useRecoilState(todosState);

  // Garder en mémoire la description de la todo
  const [todoDesc, setTodoDesc] = useState('');

  // Garder en mémoire l'id de la liste de la todo
  const [todoListId, setTodoListId] = useState<null | string>('');

  // Pour effacer le champ de la escription de la todo
  const textInputRef = useRef<any>(null);

  // Variables Bottom Sheet
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%', '50%', '95%'], []);
  const maxSnapPoints = snapPoints.length - 1;

  // Exposer ChangeBottomSheetToIndex pour pouvoir ouvrir le Bottom Sheet depuis App.tsx
  useImperativeHandle(ref, () => ({
    ChangeBottomSheetToIndex,
    maxSnapPoints,
  }));

  // Changer la position du Bottom Sheet
  const ChangeBottomSheetToIndex = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  // Fermer le Bottom Sheet
  const CloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.forceClose();
  }, []);

  // Créer une nouvelle todo
  const CreateNewTodo = () => {
    // Valider longeurs des champs
    if (
      todoDesc.trim().length < 1 ||
      todoDesc.trim().length > MAX_LENGTH_TODO_TITLE
    ) {
      Alert.alert(
        'Cannot Add Todo',
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

    // Créer une nouvelle todo
    const newTodo: ITodo = {
      id: uuid.v4().toString(),
      parentListId: todoListId ?? DEFAULT_LIST_ID,
      date: new Date(),
      description: todoDesc.trim(),
      completed: false,
    };

    // Ajouter la todo à la liste des todos
    setTodos([...todos, newTodo]);

    // Vider le champ de la description de la todo
    textInputRef.current?.clear();

    // Vider le champ de la description de la todo
    setTodoDesc('');

    // Remettre la todoListId à la liste "Default list"
    setTodoListId(DEFAULT_LIST_ID);

    // Fermer le Bottom Sheet
    CloseBottomSheet();
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        keyboardBehavior={'interactive'}
        overDragResistanceFactor={1}
        enableOverDrag
        backgroundStyle={{backgroundColor: COLOR_LIGHTBLACK}}>
        <BottomSheetView>
          {/* Bottom Sheet header */}
          <BottomSheetView style={styles.bottomSheetHeader}>
            <BottomSheetView
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity onPress={() => CloseBottomSheet()}>
                <Text style={styles.bottomSheetText}>Close</Text>
              </TouchableOpacity>
            </BottomSheetView>

            <Text
              style={[
                styles.bottomSheetText,
                {textAlign: 'center', textAlignVertical: 'center'},
              ]}>
              Create New Todo
            </Text>

            {/* Bouton Add */}
            <TouchableOpacity
              onPress={() => {
                CreateNewTodo();
              }}>
              <Text style={styles.bottomSheetText}>Add</Text>
            </TouchableOpacity>
          </BottomSheetView>

          {/* Inputs */}
          <BottomSheetView style={styles.bottomSheetContainer}>
            {/* Description de la todo */}
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <BottomSheetTextInput
                placeholder="New Todo Description"
                placeholderTextColor={COLOR_LIGHTGREY}
                style={styles.BottomSheetTextInput}
                onChangeText={e => {
                  setTodoDesc(e);
                }}
                clearTextOnFocus // ios seulement
                ref={textInputRef}
                onSubmitEditing={() => {
                  // Remettre le bottom sheet en position initiale quand le clavier est fermé
                  ChangeBottomSheetToIndex(maxSnapPoints);
                }}
              />
            </KeyboardAvoidingView>

            {/* Liste à laquelle la todo appartient */}
            <ListDropdown
              itemChosen={id => {
                setTodoListId(id);
              }}
            />
          </BottomSheetView>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
});

export default CreateNewTodo;

const styles = StyleSheet.create({
  bottomSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottomSheetContainer: {
    margin: '5%',
  },
  BottomSheetTextInput: {
    backgroundColor: COLOR_LIGHTERBLACK,
    margin: '5%',
    // marginTop: '5%',
    // marginBottom: '5%',

    borderRadius: 10,
    padding: '5%',
    color: COLOR_WHITE,
    fontSize: 18,
  },
  bottomSheetText: {color: COLOR_WHITE, fontSize: 16},
});
