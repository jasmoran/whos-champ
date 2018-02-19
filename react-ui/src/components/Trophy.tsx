import * as React from 'react';

export interface Props {
  text: string;
}

function Trophy(props: Props) {
  var text = { fontSize: '14px' } as React.CSSProperties;

  const ratio = 8 / props.text.length;
  if (ratio < 1) {
    const size = ratio * 14;
    text.fontSize = size + 'px';
  }

  return (
    <div className="trophy">
      <span className="trophy-text" style={text}>{props.text}</span>
    </div>
  );
}

export default Trophy;
