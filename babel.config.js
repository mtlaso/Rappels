module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // Doit être le dernier!
    'react-native-reanimated/plugin',
  ],
};
