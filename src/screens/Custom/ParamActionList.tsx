import React, { useMemo, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ScreenContainer,
  Header,
  ListRow,
  AnimatedIconButton,
  GesturePickerBottomSheetModal,
  SingleBottomSheetModal,
  Typography,
  IonIcon,
} from '../../components';
import { CustomStackParamList } from '../../navigation';
import { useMatchedAction } from '../../hooks/useMatchedAction';
import { Input, ScrollView, VStack, HStack, Box, Pressable } from 'native-base';
import {
  useAppSelector,
  useCurrentLangauge,
  useHandleRemoveAction,
} from '../../hooks';
import { selectGestureToActionMap } from '../../store/slices/gesture';
import { ActionInstance, ParamAction } from '../../features/action/types';
import { useGetGestureForActionInstance } from '../../hooks/useGetGestureForActionInstance';
import Animated, { Layout, LightSpeedOutRight } from 'react-native-reanimated';
import { useGetActionDescription } from '../../features/action/utils';
import { useTranslation } from 'react-i18next';

type ParamActionProps = NativeStackScreenProps<
  CustomStackParamList,
  'ParamActionList'
>;

interface ParamActionRowProps {
  actionInstance: ActionInstance;
  gestureName?: string;
  onRemove?: () => void;
  hasBottomBorder: boolean;
  onPress?: () => void;
}

const ParamActionRow = ({
  actionInstance,
  gestureName,
  onRemove,
  ...props
}: ParamActionRowProps) => {
  const { t } = useTranslation('appList');
  return (
    <Animated.View layout={Layout.springify()} exiting={LightSpeedOutRight}>
      <ListRow
        title={actionInstance.param}
        description={
          gestureName ? t('gesture_description', { gestureName }) : undefined
        }
        right={
          <AnimatedIconButton
            name="remove-circle-outline"
            color="red.500"
            size={8}
            onPress={onRemove}
          />
        }
        {...props}
      />
    </Animated.View>
  );
};

export const ParamActionList = ({ navigation, route }: ParamActionProps) => {
  const { t } = useTranslation('paramActionList');
  const { appId, actionId, type } = route.params;
  const matchedAction = useMatchedAction(appId, actionId);
  const gestureToActionMap = useAppSelector(selectGestureToActionMap);
  const showUrlSchemeHelp = useCurrentLangauge() === 'kor';
  const filteredParamActionList = useMemo(
    () =>
      Object.entries(gestureToActionMap).filter(
        ([_, actionInstance]) =>
          actionInstance.appId === appId &&
          actionInstance.actionId === actionId,
      ),
    [gestureToActionMap, appId, actionId],
  );
  const [actionParam, setActionParam] = useState('');
  const [selectedActionParam, setSelectedActionParam] = useState('');
  const gesturePickerBottomSheetModalRef = useRef<SingleBottomSheetModal>(null);
  const getGestureForActionInstance = useGetGestureForActionInstance();
  const getActionDescription = useGetActionDescription();

  const handleRemoveParamAction = useHandleRemoveAction();

  return (
    <ScreenContainer>
      {type === 'shortcutList' ? (
        <Header
          title={t('shortcuts.title')}
          description={t('shortcuts.description')}
        />
      ) : type === 'customURLSchemeList' ? (
        <VStack>
          <Header
            title={t('custom_url_scheme.title')}
            description={t('custom_url_scheme.description')}
          />
          {showUrlSchemeHelp && (
            <Pressable onPress={() => navigation.navigate('UrlSchemeHelp')}>
              {({ isPressed }) => (
                <HStack
                  space={1}
                  py={3.5}
                  alignItems="center"
                  opacity={isPressed ? 0.4 : 1}
                >
                  <IonIcon name="help-circle" color="gray.500" size={3} />
                  <Box borderBottomWidth={1} borderBottomColor="gray.500">
                    <Typography variant="caption" color="gray.500">
                      {t('custom_url_scheme.help')}
                    </Typography>
                  </Box>
                </HStack>
              )}
            </Pressable>
          )}
        </VStack>
      ) : (
        <Header variant="center" title={matchedAction?.description} />
      )}
      {matchedAction && (
        <ScrollView
          mx={-3}
          px={3}
          mt={type === 'customURLSchemeList' && showUrlSchemeHelp ? -6 : 0}
          mb={-12}
        >
          <ListRow
            left={
              <Input
                flex={1}
                variant="unstyled"
                value={actionParam}
                onChangeText={text => setActionParam(text)}
                placeholder={(matchedAction as ParamAction).placeholder}
                placeholderTextColor="gray.600"
                color="gray.900"
                p={0}
                fontSize="md"
                lineHeight={18}
                fontWeight="normal"
              />
            }
            right={
              <AnimatedIconButton
                name="add-circle-outline"
                color={actionParam === '' ? 'gray.500' : 'blue.500'}
                size={8}
                onPress={() => {
                  if (actionParam === '') {
                    return;
                  }
                  setSelectedActionParam(actionParam);
                  setActionParam('');
                  gesturePickerBottomSheetModalRef.current?.present();
                }}
              />
            }
            hasBottomBorder={filteredParamActionList.length === 0}
            isPressable={false}
          />
          {filteredParamActionList.map(([gestureId, actionInstance], idx) => {
            return (
              <ParamActionRow
                key={`${gestureId}-${actionInstance.appId}-${actionInstance.actionId}-${actionInstance.param}`}
                actionInstance={actionInstance}
                gestureName={getGestureForActionInstance(actionInstance)?.name}
                onRemove={() =>
                  handleRemoveParamAction(
                    gestureId,
                    getActionDescription(actionInstance) ?? '',
                  )
                }
                hasBottomBorder={idx === filteredParamActionList.length - 1}
                onPress={() => {
                  if (actionInstance.param !== undefined) {
                    setSelectedActionParam(actionInstance.param);
                    gesturePickerBottomSheetModalRef.current?.present();
                  }
                }}
              />
            );
          })}
        </ScrollView>
      )}
      <GesturePickerBottomSheetModal
        ref={gesturePickerBottomSheetModalRef}
        appId={appId}
        actionId={actionId}
        param={selectedActionParam}
      />
    </ScreenContainer>
  );
};
