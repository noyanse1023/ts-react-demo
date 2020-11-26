
export interface configType {
  duration: number;
  circle: number;
  mode: string;
}
export const config: configType = {
  // 总旋转时间
  duration: 4000,
  // 旋转圈数
  circle: 8,
  mode: 'ease-in-out'
}