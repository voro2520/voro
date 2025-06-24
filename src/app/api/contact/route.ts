import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // 환경 변수 검증
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error('Gmail 환경 변수가 설정되지 않았습니다.');
      return NextResponse.json(
        { 
          success: false, 
          message: '이메일 서비스 설정에 문제가 있습니다. 관리자에게 문의해주세요.' 
        },
        { status: 500 }
      );
    }
    
    // 받을 이메일 주소 (환경 변수에서 설정하거나 기본값 사용)
    const receiverEmail = process.env.RECEIVER_EMAIL || 'voro2520@gmail.com';
    
    // 이메일 설정 (Gmail 사용)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // 발송자 Gmail 주소
        pass: process.env.GMAIL_PASS, // Gmail 앱 비밀번호
      },
      connectionTimeout: 10000, // 10초 타임아웃
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
    const subject = `[VORO 견적문의] ${formData.company} - ${formData.name}님의 문의`;

    // 이메일 내용 구성 (더 깔끔하고 전문적인 디자인)
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>VORO 견적 문의</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 700px; margin: 20px auto; background-color: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- 헤더 -->
          <div style="background: linear-gradient(135deg, #000000 0%, #333333 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">VORO 견적 문의</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">새로운 프로젝트 문의가 도착했습니다</p>
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
                    <td style="padding: 12px 0; font-weight: 600; color: #333; width: 120px; vertical-align: top;">회사명</td>
                    <td style="padding: 12px 0; color: #666;">${formData.company}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #333; vertical-align: top;">담당자명</td>
                    <td style="padding: 12px 0; color: #666;">${formData.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #333; vertical-align: top;">연락처</td>
                    <td style="padding: 12px 0; color: #666;"><a href="tel:${formData.phone}" style="color: #000; text-decoration: none;">${formData.phone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #333; vertical-align: top;">이메일</td>
                    <td style="padding: 12px 0; color: #666;"><a href="mailto:${formData.email}" style="color: #000; text-decoration: none;">${formData.email}</a></td>
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
                        ? formData.serviceTypes.map((service: string) => `<span style="background-color: #000; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 5px; display: inline-block;">${service}</span>`).join(' ')
                        : '선택안함'
                      }
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #333; vertical-align: top;">제작 유형</td>
                    <td style="padding: 12px 0; color: #666;">${formData.projectType || '선택안함'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #333; vertical-align: top;">제작 예산</td>
                    <td style="padding: 12px 0; color: #666; font-weight: 600;">${formData.budget || '선택안함'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #333; vertical-align: top;">제작 기간</td>
                    <td style="padding: 12px 0; color: #666;">${formData.period || '선택안함'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #333; vertical-align: top;">알게 된 경로</td>
                    <td style="padding: 12px 0; color: #666;">${formData.referenceMethod || '선택안함'}</td>
                  </tr>
                </table>
              </div>
            </div>

            <!-- 프로젝트 설명 섹션 -->
            ${formData.description ? `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #000; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #000; padding-bottom: 10px;">
                📝 프로젝트 설명
              </h2>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #000;">
                <div style="color: #333; line-height: 1.6; white-space: pre-wrap;">${formData.description}</div>
              </div>
            </div>
            ` : ''}

            <!-- 액션 버튼들 -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${formData.email}" style="display: inline-block; background-color: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 0 10px;">
                답장하기
              </a>
              <a href="tel:${formData.phone}" style="display: inline-block; background-color: #fff; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; border: 2px solid #000; margin: 0 10px;">
                전화하기
              </a>
            </div>

          </div>

          <!-- 푸터 -->
          <div style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-radius: 0 0 10px 10px; border-top: 1px solid #e9ecef;">
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

    // 간단한 텍스트 버전도 제공
    const textContent = `
VORO 견적 문의

=== 기본정보 ===
회사명: ${formData.company}
담당자명: ${formData.name}
연락처: ${formData.phone}
이메일: ${formData.email}

=== 프로젝트 정보 ===
서비스 유형: ${formData.serviceTypes?.join(', ') || '선택안함'}
제작 유형: ${formData.projectType || '선택안함'}
제작 예산: ${formData.budget || '선택안함'}
제작 기간: ${formData.period || '선택안함'}
알게 된 경로: ${formData.referenceMethod || '선택안함'}

=== 프로젝트 설명 ===
${formData.description || '내용 없음'}

---
문의 접수일: ${formattedTime}
이 메일은 VORO 웹사이트에서 자동으로 발송되었습니다.
    `;

    // 이메일 옵션 설정
    const mailOptions = {
      from: {
        name: 'VORO 웹사이트',
        address: process.env.GMAIL_USER
      },
      to: receiverEmail,
      subject: subject,
      html: htmlContent,
      text: textContent,
      // 답장 주소를 고객 이메일로 설정
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

    console.log(`✅ 견적문의 이메일 전송 성공: ${formData.company} - ${formData.name}`);

    return NextResponse.json({ 
      success: true, 
      message: '문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다!' 
    });

  } catch (error: unknown) {
    console.error('❌ 이메일 전송 실패:', error);
    
    // 에러 유형별 메시지 분기
    let errorMessage = '문의 전송 중 오류가 발생했습니다.';
    
    if (error instanceof Error) {
      if (error.message?.includes('시간 초과')) {
        errorMessage = '이메일 전송 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.';
      } else if (error.message?.includes('authentication') || error.message?.includes('auth')) {
        errorMessage = '이메일 인증에 문제가 있습니다. 관리자에게 문의해주세요.';
      } else if (error.message?.includes('network') || error.message?.includes('connection')) {
        errorMessage = '네트워크 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.';
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage + ' 급하신 경우 직접 연락 부탁드립니다. (010-5344-9868)' 
      },
      { status: 500 }
    );
  }
} 