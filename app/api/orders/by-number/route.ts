import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Order from '@/models/Order';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const orderNumber = searchParams.get('orderNumber');
    
    if (!orderNumber) {
        return NextResponse.json({ success: false, message: 'Order number required' }, { status: 400 });
    }
    
    try {
        await connectDB();
        const order = await Order.findOne({ orderNumber: orderNumber });
        
        if (!order) {
            return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            orderNumber: order.orderNumber,
            items: order.items,
            total: order.total,
            status: order.status,
            paymentMethod: order.paymentMethod,
            shippingInfo: order.shippingInfo,
            createdAt: order.createdAt,
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}