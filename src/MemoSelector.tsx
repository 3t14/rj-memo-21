import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { Memo } from "./App";

type MemoSelectorProps = {
  memos: Memo[],
  onClose: (index: number) => void,
  open: boolean
}

type MemoSelectorState = {
  selectedIndex: number
}

class MemoSelector extends React.Component<MemoSelectorProps, MemoSelectorState> {
  state = {
    selectedIndex: -1
  }

  updateSelectedMemo = (event: React.ChangeEvent<{value: unknown}>) => {
    this.setState({
      selectedIndex: event.target.value as number
    })
  }

  selectMemo = () => {
    this.props.onClose(this.state.selectedIndex);
  }

  cancel = () => {
    this.props.onClose(-1);
  }

  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>
          メモを開く
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            開きたいメモを選択してください。
          </DialogContentText>
          <Select
            value={this.state.selectedIndex}
            onChange={this.updateSelectedMemo}
          >
            {this.props.memos.map((memo, index) => {
              return (
                <MenuItem value={index} key={index}>
                  {memo.title}
                </MenuItem>
              );
            })}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.selectMemo}>開く</Button>
          <Button onClick={this.cancel}>キャンセル</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default MemoSelector;