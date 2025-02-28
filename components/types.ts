import { DrawerNavigationProp } from "@react-navigation/drawer";

export type RootDrawerParamList = {
  Home: undefined;
  Login: undefined;
  About: undefined;
  Perfil: undefined;
  Temperatura:undefined;
  Principal: undefined;
};

export type NavigationProps = DrawerNavigationProp<RootDrawerParamList>;
