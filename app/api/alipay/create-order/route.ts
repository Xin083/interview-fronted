import { NextResponse } from "next/server";
import { config } from "@/lib/alipay/client";
import { createClient } from "@/lib/supabase/server";
import { v4 as uuidv4 } from 'uuid';
/* eslint-disable @typescript-eslint/no-require-imports */
export async function POST(req: Request) {
  try {
    const { subscriptionType = 'monthly' } = await req.json();
    const supabase = createClient();
    
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = session.user.id;
    const email = session.user.email;

    // 根据订阅类型设置价格
    const price = subscriptionType === 'annual' ? 300 : 60;
    
    // 生成订单号
    const outTradeNo = `ORDER_${uuidv4()}`;
    
    // 仅在服务端 require alipay-sdk
    const AlipaySdk = require('alipay-sdk');
    const alipay = new AlipaySdk(config);
    
    // 创建支付宝订单
    const result = await alipay.exec('alipay.trade.page.pay', {
      notifyUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/alipay/notify`,
      returnUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/settings?session_id=${outTradeNo}`,
      bizContent: {
        outTradeNo,
        totalAmount: price.toFixed(2),
        subject: `Interview Coder ${subscriptionType} Subscription`,
        productCode: 'FAST_INSTANT_TRADE_PAY',
      },
    });

    // 保存订单信息到数据库
    await supabase.from('orders').insert({
      id: outTradeNo,
      user_id: userId,
      amount: price,
      status: 'pending',
      payment_method: 'alipay',
      subscription_type: subscriptionType,
    });

    return NextResponse.json({ 
      url: result,
      orderId: outTradeNo 
    });
  } catch (error) {
    console.error("Error creating Alipay order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
} 