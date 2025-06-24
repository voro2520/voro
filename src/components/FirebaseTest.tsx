'use client';

import { useState } from 'react';
import { useAuth, useFirestore } from '@/hooks/useFirebase';

export default function FirebaseTest() {
  const { user, login, register, logout } = useAuth();
  const { addDocument, getDocuments } = useFirestore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [testMessage, setTestMessage] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      console.log('로그인 성공');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  const handleRegister = async () => {
    try {
      await register(email, password);
      console.log('회원가입 성공');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log('로그아웃 성공');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const handleAddDocument = async () => {
    try {
      await addDocument('test', {
        message: testMessage,
        timestamp: new Date(),
        user: user?.email || 'anonymous'
      });
      console.log('문서 추가 성공');
      setTestMessage('');
    } catch (error) {
      console.error('문서 추가 실패:', error);
    }
  };

  const handleGetDocuments = async () => {
    try {
      const snapshot = await getDocuments('test');
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('문서들:', docs);
    } catch (error) {
      console.error('문서 조회 실패:', error);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px', borderRadius: '8px' }}>
      <h2>Firebase 연결 테스트</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>사용자 상태</h3>
        <p>현재 사용자: {user ? user.email : '로그인되지 않음'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>인증 테스트</h3>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: '5px', padding: '5px' }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: '5px', padding: '5px' }}
        />
        <br />
        <button onClick={handleLogin} style={{ margin: '5px', padding: '10px' }}>
          로그인
        </button>
        <button onClick={handleRegister} style={{ margin: '5px', padding: '10px' }}>
          회원가입
        </button>
        <button onClick={handleLogout} style={{ margin: '5px', padding: '10px' }}>
          로그아웃
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Firestore 테스트</h3>
        <input
          type="text"
          placeholder="테스트 메시지"
          value={testMessage}
          onChange={(e) => setTestMessage(e.target.value)}
          style={{ margin: '5px', padding: '5px', width: '200px' }}
        />
        <br />
        <button onClick={handleAddDocument} style={{ margin: '5px', padding: '10px' }}>
          문서 추가
        </button>
        <button onClick={handleGetDocuments} style={{ margin: '5px', padding: '10px' }}>
          문서 조회 (콘솔 확인)
        </button>
      </div>
    </div>
  );
} 