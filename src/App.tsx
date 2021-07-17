import React from 'react';
import './App.css';
// Gridを上書きするために、PlainGridで参照する
import PlainGrid from '@material-ui/core/Grid';
import { Button, Chip, styled, TextField } from '@material-ui/core';

import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import MemoNav from './MemoNav';

// 差分のスタイルシートを定義
const Grid = styled(PlainGrid)({
  // border: 'solid 1px grey',
  // padding: '2px',
});

// 1件分のメモデータ
export type Memo = {
  title: string,  // タイトル
  text: string,   // メモ本体
  created?: Date,  // 作成日時
  modified?: Date  // 修正日時
}

type AppProps = {
}

type AppState = {
  memos: Memo[],
  title: string,
  text: string,
  currentMemosIndex: number
}

class App extends React.Component<AppProps, AppState> {
  // stateの初期値
  state = {
    memos: new Array<Memo>(),
    title: '',
    text: '',
    currentMemosIndex: -1
  }

  // titleの変更処理
  changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  }

  // textの変更処理
  changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: event.target.value });
  }
  saveMemo = () => {
    const currentMemo: Memo = {
      title: this.state.title,
      text: this.state.text,
      created: new Date(),
      modified: new Date()
    }
    this.setState((state) => {
      let currentMemosIndex = this.state.currentMemosIndex;
      let memos = [...state.memos];
      if (currentMemosIndex === -1) {
        currentMemosIndex = memos.push(currentMemo) - 1;
      } else {
        memos[currentMemosIndex] = currentMemo;
      }
      return {
        memos,
        currentMemosIndex
      }
    });
  };

  newMemo = () => {
    this.setState({
      title: '',
      text: '',
      currentMemosIndex: -1
    })
  }

  openMemo = (index: number) => {
    const memo = this.state.memos[index];
    this.setState({
      currentMemosIndex: index,
      title: memo.title,
      text: memo.text,
    });
  }

  deleteMemo = () => {
    if (this.state.currentMemosIndex >= 0) {
      this.setState((state) => {
        let memos = [...state.memos];
        memos.splice(state.currentMemosIndex, 1);
        return {
          memos
        }
      });
    }
    this.newMemo();
  }

  render() {
    return (
      <div>
        <Grid
          className="App-Grid"
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item xs={12}>
            <MemoNav
              onNewMemo={this.newMemo}
              memos={this.state.memos}
              onOpenMemo={this.openMemo}
            />
          </Grid> 
          <Grid item xs={12}
            container direction="row" justify="flex-start"
          >
            <Grid item xs={12} sm={2}
              container justify="center">
              <Chip label="タイトル"/>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                id="title" 
                fullWidth
                label="タイトルを入力してください" 
                value={this.state.title}
                onChange={this.changeTitle} />
            </Grid>
          </Grid>
          <Grid item xs={12}
            container direction="row" justify="flex-start"
          >
            <Grid item xs={12} sm={2}
              container justify="center">
              <Chip label="メモ"/>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                id="memo"
                fullWidth
                label="メモを入力してください"
                multiline
                rows={15}
                value={this.state.text}
                onChange={this.changeText}
              />
            </Grid>
          </Grid>         
          <Grid item xs={12}
            container direction="row" justify="space-around"
          >
            <Grid item xs={12} sm={3}
              container justify="center"
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={this.saveMemo}
              >
                保存する
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}
               container justify="center"
            >
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={this.deleteMemo}
              >
                削除する
              </Button>
            </Grid>
          </Grid>         
        </Grid>
      </div>
    );
  }
}

export default App;