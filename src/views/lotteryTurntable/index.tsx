import React, { FC, useRef, useState } from 'react';
import { prizeList } from '../../data/prize'
import './_style.scss'
import { configType } from '../../config'
import LotteryItem from './LotteryItem';
import gsap, { TimelineMax, Power4, } from 'gsap';

export interface Props {
  config: configType;
}

const LotteryTurntable: FC<Props> = ({ config }) => {
  const CIRCLE_ANGLE: number = 360
  const angleList: any[] = []
  const spinWheel = new TimelineMax()
  const myRef = useRef<HTMLInputElement>(null)
  // 剩余次数
  const [remainCount, updateRemainCount] = useState(10)
  // 是否正在旋转
  const [isRotating, updateRotating] = useState(false)

  /**
   * @description 初始化奖品列表，计算每个奖品的位置
   * @param {Array} list 奖品列表
   */
  const initPrizeList = (list: any[]): void => {
    const average = CIRCLE_ANGLE / list.length
    const half = average / 2
    list.forEach((item, index) => {
      // 每个奖项旋转的位置为 当前 i * 平均值 + 平均值 / 2
      const angle = getAngle(index, average)
      item.style = {
        'WebkitTransform': `rotate(${angle}deg)`,
        'transform': `rotate(${angle}deg)`
      }
      // 记录每个奖项的角度范围
      angleList.push((index * average) + half)
    })
    console.log('angleList', angleList)
  }

  function getAngle (index: number, average: number) :number {
    return -((index * average) + (average / 2))
  }

  const beginRotate = () => {
    console.log('click')
    if (!remainCount) return
    rotating()
  }

  const initAnimate = () => {
    const degs = 360 * 100
    console.log('initAnimate deg', degs)
    //  Luckywheel animation
    const wheel: any = document.getElementById('wheel')
    spinWheel.to(wheel, 5, {
        rotation: degs,
        transformOrigin: '50% 50%',
        ease: Power4.easeOut,
        onUpdate: showValues
      }
    )
    function showValues (this: any) {
      updateRotating(false)
      console.log('gasp', gsap.getProperty(wheel, 'rotation'))
    }
    // 请求接口
    setTimeout(() => {
      const count = remainCount - 1
      updateRemainCount(count)
      console.log('stop')
      const winPrizeIndex = 2 // 奖品下标
      const winPrizeAngle = angleList[winPrizeIndex]
      console.log('winPrizeAngle', winPrizeAngle)
      spinWheel.paused( true )
    }, 1000)
    spinWheel.add('end')
  }
  const rotating = () => {
    if (isRotating) return
    updateRotating(true)
    initAnimate()
  }

  const init = () => {
    initPrizeList(prizeList)
  }
  init()

  return (
    <div className="prize_wrapper">
      <div className="wheel-pointer" onClick={beginRotate}></div>
      <div className="wheel-bg" id="wheel" ref={myRef}>
        {
          prizeList.map((item, index) => <LotteryItem prizeItem={item} key={index} />)
        }
      </div>
      <div>次数{remainCount}</div>
    </div>
  );
}

LotteryTurntable.defaultProps = {
}

export default LotteryTurntable;