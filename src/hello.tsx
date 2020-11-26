import * as React from 'react';
import LotteryTurntable from './views/lotteryTurntable'
import { config, configType } from './config'
export interface Props {
  name: string;
  enthusiasmLevel?: number; 
  config: configType;
}

function Hello({ name, enthusiasmLevel = 1 }: Props) {
  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }

  return (
    <div className="hello">
      <div className="greeting">
        Hello {name + getExclamationMarks(enthusiasmLevel)}
        <LotteryTurntable config={config} />
      </div>
    </div>
  );
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
