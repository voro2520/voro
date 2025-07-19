import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  let formData: any = null;
  
  try {
    formData = await request.json();
    
    // 기본 유효성 검사
    if (!formData.name || !formData.phone || !formData.email) {
      return NextResponse.json(
        { 
          success: false, 
          message: '이름, 연락처, 이메일은 필수 입력 항목입니다.' 
        },
        { status: 400 }
      );
    }

    // 환경 변수 검증
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error('Gmail 환경 변수가 설정되지 않았습니다.');
      
      // 환경변수가 없을 때는 성공 응답을 보내되, 실제로는 로그만 기록
      console.log('=== 📧 문의 접수 (환경변수 미설정으로 이메일 미전송) ===');
      console.log('이름:', formData.name);
      console.log('회사:', formData.company || '개인');
      console.log('연락처:', formData.phone);
      console.log('이메일:', formData.email);
      console.log('서비스 유형:', formData.serviceTypes?.join(', ') || '선택안함');
      console.log('프로젝트 유형:', formData.projectType || '선택안함');
      console.log('예산:', formData.budget || '선택안함');
      console.log('기간:', formData.period || '선택안함');
      console.log('상세 설명:', formData.description || '내용 없음');
      console.log('접수 시간:', new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
      console.log('================================');
      
      return NextResponse.json({ 
        success: true, 
        message: '문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다! (급하시면 010-5344-9868로 전화주세요)' 
      });
    }
    
    // 받을 이메일 주소
    const receiverEmail = process.env.RECEIVER_EMAIL || 'voro2520@gmail.com';
    
    // 이메일 설정
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // 현재 시간 (한국 시간)
    const now = new Date();
    const kstTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
    const formattedTime = kstTime.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Seoul'
    });

    // 이메일 제목 생성
    const companyName = formData.company || '개인';
    const subject = `🚀 [VORO 견적문의] ${companyName} - ${formData.name}님의 문의`;

    // 이메일 내용 구성
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>VORO 견적 문의</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 700px; margin: 20px auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          
          <!-- 헤더 -->
          <div style="background: linear-gradient(135deg, #000000 0%, #333333 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🚀 VORO 견적 문의</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">새로운 프로젝트 문의가 도착했습니다!</p>
          </div>

          <!-- 본문 -->
          <div style="padding: 30px;">
            
            <!-- 기본정보 섹션 -->
            <div style="margin-bottom: 30px;">
              <h2 style="color: #000; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #000; padding-bottom: 10px;">
                👤 기본정보
              </h2>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #000;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #333; width: 120px; vertical-align: top;">이름</td>
                    <td style="padding: 12px 0; color: #666; font-size: 16px; font-weight: 600;">${formData.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #333; vertical-align: top;">회사명</td>
                    <td style="padding: 12px 0; color: #666;">${formData.company || '개인 고객'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #333; vertical-align: top;">연락처</td>
                    <td style="padding: 12px 0; color: #666;">
                      <a href="tel:${formData.phone}" style="color: #000; text-decoration: none; font-weight: 600; background: #f0f0f0; padding: 4px 8px; border-radius: 4px;">
                        📞 ${formData.phone}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #333; vertical-align: top;">이메일</td>
                    <td style="padding: 12px 0; color: #666;">
                      <a href="mailto:${formData.email}" style="color: #000; text-decoration: none; font-weight: 600;">✉️ ${formData.email}</a>
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <!-- 프로젝트 정보 섹션 -->
            <div style="margin-bottom: 30px;">
              <h2 style="color: #000; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #000; padding-bottom: 10px;">
                🚀 프로젝트 정보
              </h2>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #000;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #333; width: 120px; vertical-align: top;">서비스 유형</td>
                    <td style="padding: 12px 0; color: #666;">
                      ${formData.serviceTypes && formData.serviceTypes.length > 0 
                        ? formData.serviceTypes.map((service: string) => `<span style="background-color: #000; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin-right: 8px; margin-bottom: 4px; display: inline-block; font-weight: 600;">${service}</span>`).join(' ')
                        : '<span style="color: #999;">선택안함</span>'
                      }
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #333; vertical-align: top;">제작 유형</td>
                    <td style="padding: 12px 0; color: #666; font-weight: 600;">${formData.projectType || '<span style="color: #999;">선택안함</span>'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #333; vertical-align: top;">예상 예산</td>
                    <td style="padding: 12px 0; color: #666; font-weight: 600; font-size: 16px;">
                      ${formData.budget ? `💰 ${formData.budget}` : '<span style="color: #999;">선택안함</span>'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #333; vertical-align: top;">완료 기간</td>
                    <td style="padding: 12px 0; color: #666; font-weight: 600;">
                      ${formData.period ? `⏱️ ${formData.period}` : '<span style="color: #999;">선택안함</span>'}
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <!-- 프로젝트 설명 섹션 -->
            ${formData.description ? `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #000; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #000; padding-bottom: 10px;">
                💡 상세 요청사항
              </h2>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #000;">
                <div style="color: #333; line-height: 1.8; white-space: pre-wrap; font-size: 15px;">${formData.description}</div>
              </div>
            </div>
            ` : ''}

            <!-- 빠른 액션 버튼들 -->
            <div style="text-align: center; margin: 30px 0; padding: 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px;">
              <h3 style="margin: 0 0 15px 0; color: #333;">빠른 연락</h3>
              <div style="display: inline-block;">
                <a href="mailto:${formData.email}" style="display: inline-block; background-color: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 0 8px 8px 8px; font-size: 14px;">
                  ✉️ 답장하기
                </a>
                <a href="tel:${formData.phone}" style="display: inline-block; background-color: #fff; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; border: 2px solid #000; margin: 0 8px 8px 8px; font-size: 14px;">
                  📞 전화하기
                </a>
              </div>
            </div>

          </div>

          <!-- 푸터 -->
          <div style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e9ecef;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              📧 이 메일은 VORO 웹사이트 견적문의 폼을 통해 자동으로 발송되었습니다.<br>
              🕐 문의 접수일: ${formattedTime}
            </p>
            <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">
              © ${new Date().getFullYear()} VORO Design. All rights reserved.
            </p>
          </div>

        </div>
      </body>
      </html>
    `;

    // 간단한 텍스트 버전
    const textContent = `
🚀 VORO 견적 문의

=== 기본정보 ===
이름: ${formData.name}
회사: ${formData.company || '개인 고객'}
연락처: ${formData.phone}
이메일: ${formData.email}

=== 프로젝트 정보 ===
서비스 유형: ${formData.serviceTypes?.join(', ') || '선택안함'}
제작 유형: ${formData.projectType || '선택안함'}
예상 예산: ${formData.budget || '선택안함'}
완료 기간: ${formData.period || '선택안함'}

=== 상세 요청사항 ===
${formData.description || '내용 없음'}

---
문의 접수일: ${formattedTime}
이 메일은 VORO 웹사이트에서 자동으로 발송되었습니다.
    `;

    // 이메일 옵션 설정
    const mailOptions = {
      from: {
        name: 'VORO 웹사이트 📧',
        address: process.env.GMAIL_USER
      },
      to: receiverEmail,
      subject: subject,
      html: htmlContent,
      text: textContent,
      replyTo: {
        name: formData.name,
        address: formData.email
      }
    };

    // 이메일 전송 (타임아웃 처리)
    const sendMailPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('이메일 전송 시간 초과')), 15000)
    );

    await Promise.race([sendMailPromise, timeoutPromise]);

    console.log(`✅ 견적문의 이메일 전송 성공: ${companyName} - ${formData.name} (${formData.phone})`);

    return NextResponse.json({ 
      success: true, 
      message: '문의가 성공적으로 전송되었습니다! 빠른 시일 내에 연락드리겠습니다. 🚀' 
    });

  } catch (error: unknown) {
    console.error('❌ 이메일 전송 실패:', error);
    
    // 에러가 발생해도 고객에게는 일단 성공 메시지를 보내고, 로그를 기록
    console.log('=== 📧 문의 접수 (이메일 전송 실패, 로그 기록) ===');
    console.log('이름:', formData?.name || 'Unknown');
    console.log('회사:', formData?.company || '개인');
    console.log('연락처:', formData?.phone || 'Unknown');
    console.log('이메일:', formData?.email || 'Unknown');
    console.log('에러:', error instanceof Error ? error.message : '알 수 없는 오류');
    console.log('접수 시간:', new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
    console.log('================================');
    
    return NextResponse.json(
      { 
        success: true, 
        message: '문의가 접수되었습니다! 빠른 시일 내에 연락드리겠습니다. (급하시면 010-5344-9868로 전화주세요) 📞' 
      }
    );
  }
} 