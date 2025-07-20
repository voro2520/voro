export default function TestContact() {
  return (
    <html>
      <head>
        <title>테스트 페이지</title>
      </head>
      <body style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>VORO 문의 테스트</h1>
        
        <form style={{ maxWidth: '500px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label>이름:</label><br/>
            <input 
              type="text" 
              name="name"
              placeholder="이름을 입력하세요"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '2px solid #ccc',
                borderRadius: '5px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>연락처:</label><br/>
            <input 
              type="tel" 
              name="phone"
              placeholder="010-1234-5678"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '2px solid #ccc',
                borderRadius: '5px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>이메일:</label><br/>
            <input 
              type="email" 
              name="email"
              placeholder="example@company.com"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '2px solid #ccc',
                borderRadius: '5px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>문의 내용:</label><br/>
            <textarea 
              name="message"
              rows={5}
              placeholder="문의 내용을 입력하세요"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '2px solid #ccc',
                borderRadius: '5px'
              }}
            />
          </div>
          
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '18px',
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            테스트 전송
          </button>
        </form>
        
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f0f0' }}>
          <h3>빠른 연락</h3>
          <p>📞 <a href="tel:010-5344-9868">010-5344-9868</a></p>
          <p>💬 <a href="http://pf.kakao.com/_tExfLG" target="_blank">카카오톡 상담</a></p>
        </div>
      </body>
    </html>
  );
} 