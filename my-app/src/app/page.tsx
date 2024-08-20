import {ModeToggle} from "@/components/Modetoggle";
import Footer from "@/components/footer";
export default function Home() {
  return (
      <>
          <div className="page">
              <ModeToggle></ModeToggle>
              <h1>Hello World</h1>
              <Footer/>
          </div>
      </>
  );
}