import React, { FC } from 'react';

export interface prizeItemType {
  icon: string;
  name: string;
  isPrize: number;
  style?: object;
}
export interface Props {
  prizeItem: prizeItemType;
}

const LotteryItem: FC<Props> = ({ prizeItem }) => {
  const {
    style,
    icon,
    name
  } = prizeItem
  return (
    <div
      className="prize-item"
      style={style}>
      <div className="prize-pic">
        <img src={icon} alt="" />
      </div>
      <div className="prize-type">{name}</div>
    </div>
  )
}

LotteryItem.defaultProps = {
}

export default LotteryItem

