const colors = [
  'pink',
  'grape',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'orange',
  'red',
];

export function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
