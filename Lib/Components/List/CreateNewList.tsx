import BottomSheet, {
  TouchableOpacity,
  BottomSheetTextInput,
  BottomSheetView,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React, {
  useCallback,
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
import {useRecoilState} from 'recoil';

import {IList} from '../../Interfaces/IList';

import {listsState} from '../../State/ListState';

import {
  COLOR_LIGHTBLACK,
  COLOR_LIGHTERBLACK,
  COLOR_LIGHTGREY,
  COLOR_WHITE,
} from '../../Assets/Styles/global-styles';

import {MAX_LENGTH_LIST_TITLE} from '../../defaults';

/**
 * Component pour créer une nouvelle liste
 */
const CreateNewList = React.forwardRef<any, {}>((props, ref) => {
  // State management (recoil js)
  const [lists, setLists] = useRecoilState(listsState);

  // Garder en mémoire le champ de texte pour le titre de la liste
  const [listName, setListName] = useState('');

  // Effacer le champ de texte pour le titre de la liste
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

  // Créer une nouvelle liste
  const CreateNewList = () => {
    // Valider longeurs des champs
    if (
      listName.trim().length <= 0 ||
      listName.trim().length > MAX_LENGTH_LIST_TITLE
    ) {
      Alert.alert(
        'Cannot Add List',
        'List title must be between 1 and 32 characters',
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

    // Créer la liste
    const newList: IList = {
      id: Math.random().toString(),
      title: listName.trim(),
      todos: [],
    };

    // Vérifier si la liste existe déjà
    const listExists = lists.find(list => list.title === newList.title);
    if (listExists) {
      Alert.alert(
        'Cannot Add List',
        'List already exists',
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

    // Ajouter la liste
    setLists([...lists, newList]);

    // Reset le champ de saisie
    setListName('');

    // Effacer le TextInput
    textInputRef.current?.clear();

    // Fermer la Bottom Sheet
    CloseBottomSheet();
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        style={{zIndex: 3}}
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
              Create New List
            </Text>

            {/* Bouton Add */}
            <TouchableOpacity
              onPress={() => {
                CreateNewList();
              }}>
              <Text style={styles.bottomSheetText}>Add</Text>
            </TouchableOpacity>
          </BottomSheetView>

          {/* Input */}
          <BottomSheetView style={styles.bottomSheetContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <BottomSheetTextInput
                placeholder="New List Title"
                placeholderTextColor={COLOR_LIGHTGREY}
                style={styles.BottomSheetTextInput}
                onChangeText={e => {
                  setListName(e);
                }}
                clearTextOnFocus // ios seulement
                ref={textInputRef}
                onSubmitEditing={() => {
                  // Remettre le bottom sheet en position initiale quand le clavier est fermé
                  ChangeBottomSheetToIndex(maxSnapPoints);
                }}
              />
            </KeyboardAvoidingView>
          </BottomSheetView>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
});

export default CreateNewList;

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
