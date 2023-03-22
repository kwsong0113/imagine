import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ name: 'Imagine' })
  .useReactNative()
  .use(reactotronRedux())
  .connect();

export default reactotron;
