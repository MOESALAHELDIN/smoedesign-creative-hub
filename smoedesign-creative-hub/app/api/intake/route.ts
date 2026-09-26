import {NextResponse} from 'next/server';
export async function POST(req:Request){
 const body=await req.json();
 if(!body?.name||!body?.email||!body?.brief)return NextResponse.json({ok:false,error:'Missing required fields'},{status:400});
 // Production hook: replace this with Hana/CRM/database integration.
 console.log('[creative-hub:intake]',JSON.stringify({receivedAt:new Date().toISOString(),...body}));
 return NextResponse.json({ok:true,status:'received'});
}
