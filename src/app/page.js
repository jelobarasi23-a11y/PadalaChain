import SendRemittance  from "../components/SendRemittance";
import FamilyDashboard from "../components/FamilyDashboard";

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#0f0f13",
      padding: "32px 20px",
      maxWidth: "640px",
      margin: "0 auto",
    }}>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px" }}>
        <span style={{ fontSize:"22px", fontWeight:"500", color:"#f5f5f5" }}>
          PadalaChain
        </span>
        <span style={{
          fontSize:"11px", background:"#1D9E75", color:"#fff",
          padding:"2px 10px", borderRadius:"20px", fontWeight:"500"
        }}>Morph Hoodi</span>
      </div>
      <p style={{ fontSize:"13px", color:"#888", marginBottom:"32px" }}>
        OFW remittance powered by blockchain
      </p>

      {/* Send section */}
      <div style={{
        background:"#1a1a24", border:"0.5px solid #2a2a3a",
        borderRadius:"16px", padding:"20px", marginBottom:"16px"
      }}>
        <p style={{ fontSize:"13px", fontWeight:"500", color:"#f5f5f5", marginBottom:"16px" }}>
          Send remittance
        </p>
        <SendRemittance />
      </div>

      {/* Family dashboard section */}
      <div style={{
        background:"#1a1a24", border:"0.5px solid #2a2a3a",
        borderRadius:"16px", padding:"20px"
      }}>
        <p style={{ fontSize:"13px", fontWeight:"500", color:"#f5f5f5", marginBottom:"16px" }}>
          Family dashboard
        </p>
        <FamilyDashboard
          familyAddress="0xPasteReceiverWalletAddressHere"
        />
      </div>

    </main>
  );
}