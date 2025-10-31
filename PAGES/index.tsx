import VyraWalletProvider from "@/components/VyraWalletProvider";
import dynamic from "next/dynamic";
const Paywall = dynamic(() => import("@/components/Paywall"), { ssr: false });

export default function Home() {
  return (
    <VyraWalletProvider>
      <main style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{border:"1px solid #222",borderRadius:16,padding:24,textAlign:"center",maxWidth:520}}>
          <h1 style={{fontSize:28,marginBottom:8}}>VYRA — Access Demo</h1>
          <p style={{opacity:.7,marginBottom:24}}>Request → 402 → Pay → Verify → Access</p>
          <Paywall/>
        </div>
      </main>
    </VyraWalletProvider>
  );
}
