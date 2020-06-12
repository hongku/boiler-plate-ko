import * as React from 'react';
// import axios from 'axios';

const LandingPageWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  wdith: '100%',
  height: '100vh'
}

export default function LandingPage() {  
  return (
    <div style={LandingPageWrapperStyle}>
      <h2>시작 페이지</h2>
    </div>
  );
}
