import React from 'react';
import { JssProvider, SheetsRegistry } from 'react-jss';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createGenerateClassName,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';

const defaultOptions = {
  theme: {},
  dangerouslyUseGlobalCSS: false,
  productionPrefix: 'jss',
};

const sheetsRegistry = new SheetsRegistry();

export const wrapRootElement = ({ element }, options) => {
  const { dangerouslyUseGlobalCSS, productionPrefix, theme } = {
    ...defaultOptions,
    ...options,
  };

  const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS,
    productionPrefix,
  });

  return (
    <JssProvider
      registry={sheetsRegistry}
      generateClassName={generateClassName}
    >
      <MuiThemeProvider theme={createMuiTheme(theme)} sheetsManager={new Map()}>
        <CssBaseline />
        {element}
      </MuiThemeProvider>
    </JssProvider>
  );
};

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <style
      type="text/css"
      id="server-side-jss"
      key="server-side-jss"
      dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() }}
    />,
  ]);
};
