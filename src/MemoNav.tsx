import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import OpenIcon from "@material-ui/icons/OpenInBrowser";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { Memo } from "./App";
import './MemoNav.css';
import MemoSelector from "./MemoSelector";

type MemoNavProps = {
  onNewMemo: () => void,
  memos: Memo[],
  onOpenMemo: (index: number) => void
}

type MemoNavState = {
  isMemoSelectorOpened: boolean
}

class MemoNav extends React.Component<MemoNavProps, MemoNavState> {
  state = {
    isMemoSelectorOpened: false
  };

  showMemoSelector = () => {
    this.setState({
      isMemoSelectorOpened: true
    });
  }

  closeMemoSelector = ( selectedIndex: number ) => {
    if (selectedIndex >= 0) {
      this.props.onOpenMemo(selectedIndex);
    }
    this.setState({
      isMemoSelectorOpened: false
    });
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography
            className="MemoNav-title"
            variant="h4"
          >
            簡易メモアプリ
          </Typography>          
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={this.props.onNewMemo}
          >
            新規メモ
          </Button>
          <Button
            color="inherit"
            startIcon={<OpenIcon />}
            onClick={this.showMemoSelector}
          >
            メモを開く
          </Button>
          <MemoSelector
            onClose={this.closeMemoSelector}
            open={this.state.isMemoSelectorOpened}
            memos={this.props.memos}
          />
        </Toolbar>
      </AppBar>
    );
  }
}

export default MemoNav;
