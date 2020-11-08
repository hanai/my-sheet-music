import React, { useEffect, useRef } from "react";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";

import "./style.scss";

export interface SheetDisplayProps {
  sheetContent?: string;
}

const SheetDisplay = (props: SheetDisplayProps) => {
  const { sheetContent } = props;

  const sheetDisplayContainerRef = useRef<HTMLDivElement>(null);

  const osmdRef = useRef<OpenSheetMusicDisplay>();

  useEffect(() => {
    if (sheetDisplayContainerRef.current != null) {
      const osmd = new OpenSheetMusicDisplay(sheetDisplayContainerRef.current, {
        autoResize: true,
        backend: "svg",
        drawTitle: true,
      });
      osmdRef.current = osmd;
    }
  }, []);

  useEffect(() => {
    if (osmdRef.current && sheetContent) {
      osmdRef.current.load(sheetContent);
      osmdRef.current.render();
    }
  }, [sheetContent]);

  return (
    <div id="sheet-display-container" ref={sheetDisplayContainerRef}></div>
  );
};

export default SheetDisplay;
