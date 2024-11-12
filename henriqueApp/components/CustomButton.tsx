import React from 'react';
import styled, { css } from 'styled-components/native';
import { ActivityIndicator, TextStyle, ViewStyle } from 'react-native';

interface ButtonProps {
  label: string;
  backgroundColor?: string;
  textColor?: string;
  onPress: () => void;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
  background-color: ${({ backgroundColor }) => backgroundColor || '#6200ee'};
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  ${({ loading }) =>
    loading &&
    css`
      opacity: 0.7;
    `}
`;

const ButtonText = styled.Text<ButtonProps>`
  font-size: 16px;
  font-weight: normal;
  color: ${({ textColor }) => textColor || '#ffffff'};
`;

export const CustomButton: React.FC<ButtonProps> = ({
  label,
  backgroundColor,
  textColor,
  onPress,
  loading = false,
  style,
  textStyle,
}) => {
  return (
    <ButtonContainer
      backgroundColor={backgroundColor}
      onPress={onPress}
      loading={loading}
      disabled={loading}
      style={style}
    >
      {loading ? (
        <ActivityIndicator color={textColor || '#ffffff'} />
      ) : (
        <ButtonText textColor={textColor} style={textStyle}>
          {label}
        </ButtonText>
      )}
    </ButtonContainer>
  );
};
