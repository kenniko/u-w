import React, { Component } from "react";

import {
  App, 
  Window, 
  Button, 
  Dialog,
} from "proton-native";

export class Example extends Component {
  public render() {
    return (
      <App>
        <Window
          title="Unity Wallet"
          size={{ w: 800, h: 600 }}
          menuBar={false}
        >
          <Button onClick={() => Dialog('Message', { title: 'Update Version', description: 'This is description.' })}>Get Update</Button>
        </Window>
      </App>
    );
  }
}
