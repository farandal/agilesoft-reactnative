import {StyleSheet} from 'react-native';
import buttonStyles from './components/Buttons';
import {ThemeCommonParams} from './theme.type';

 const Common = ({ Colors, ...args }: ThemeCommonParams) => {
  return {
    button: buttonStyles({ Colors, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      textInput: {
        borderWidth: 1,
        borderColor: Colors.text,
        backgroundColor: Colors.inputBackground,
        color: Colors.text,
        minHeight: 50,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
      },
    }),
  }
}

export default Common;
