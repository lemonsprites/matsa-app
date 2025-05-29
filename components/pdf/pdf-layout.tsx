"use client"

import { ReactNode, forwardRef } from "react"

const PdfA4Layout = forwardRef<HTMLDivElement, { children: ReactNode }>(
    ({ children }, ref) => {
        return (
            <div
                ref={ref}
                style={{
                    width: "210mm",
                    minHeight: "297mm",
                    paddingLeft: "15mm",
                    paddingTop: "10mm",
                    paddingBottom: "10mm",
                    paddingRight: "15mm",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "12pt",
                    boxSizing: "border-box",
                }}
            >
                {children}
            </div>
        )
    }
)

PdfA4Layout.displayName = "PdfA4Layout"
export default PdfA4Layout
