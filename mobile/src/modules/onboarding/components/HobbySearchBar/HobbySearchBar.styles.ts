import { StyleSheet } from 'react-native';
import { colors } from '../../../../app/theme';
import { borders } from '../../../../app/theme/borders';
import { shadows } from '../../../../app/theme/shadows';

export const hobbySearchBarStyles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.bgElevated,
    borderRadius: borders.radius.md,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
    ...shadows.md,
  },
  inputRowFocused: {
    borderColor: colors.primary,
    // focused: shift to match shadow offset — feels "engaged"
    transform: [{ translateX: 4 }, { translateY: 4 }],
    ...shadows.none,
  },
  searchIcon: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
    paddingVertical: 2,
  },
  sendBtn: {
    width: 34,
    height: 34,
    borderRadius: borders.radius.sm,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
  },
  sendArrow: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textInverse,
  },
  sendArrowDisabled: {
    color: colors.textDim,
  },
  hint: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textDim,
    paddingLeft: 4,
  },
});
