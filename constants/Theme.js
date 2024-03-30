import { PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();

export const SIZES = {
  small: 9 * fontScale,
  medium: 14 * fontScale,
  large: 18 * fontScale,
  xLarge: 24 * fontScale,
};

export const FONTS = {
  bold: "cairoBold",
  semiBold: "cairoSemiBold",
  medium: "cairoMedium",
  regular: "cairoRegular",
  light: "cairoLight",
};
