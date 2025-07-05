import { useState } from "react";
import CenterButton from "./CenterButton";
import SocialFeed from "./SocialFeed";
import UtilityPanel from "./UtilityPanel";
import SignInModal from "./SignInModal";

export default function VerticalSplitLayout() {
  const [socialExpanded, setSocialExpanded] =
    useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div style={styles.container}>
      {/* Top: Social Media */}
      <div
        style={{
          ...styles.section,
          height: socialExpanded ? "100%" : "50%",
          borderBottomLeftRadius: socialExpanded ? 0 : 60,
          borderBottomRightRadius: socialExpanded ? 0 : 60,
          zIndex: socialExpanded ? 2 : 1,
        }}
      >
        <SocialFeed
          minimized={!socialExpanded}
          onExpand={() => setSocialExpanded(true)}
          onMinimize={() => setSocialExpanded(false)}
        />
      </div>

      {/* Center Button */}
      <CenterButton
        onClick={() => setShowSignIn(true)}
        expanded={socialExpanded}
        onExpand={() => setSocialExpanded(true)}
        onMinimize={() => setSocialExpanded(false)}
      />

      {/* Bottom: Utility */}
      {!socialExpanded && (
        <div
          style={{
            ...styles.section,
            height: "50%",
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
            zIndex: 1,
          }}
        >
          <UtilityPanel />
        </div>
      )}

      {/* Sign In/Up Modal */}
      {showSignIn && (
        <SignInModal onClose={() => setShowSignIn(false)} />
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    background: "#f5f7fa",
    display: "flex",
    flexDirection: "column",
  },
  section: {
    width: "100%",
    transition:
      "height 0.4s cubic-bezier(.4,2,.6,1), border-radius 0.4s",
    background: "#fff",
    position: "relative",
    overflow: "auto",
  },
};
