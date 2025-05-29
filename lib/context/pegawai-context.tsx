
import { PegawaiContextType } from "@/lib/interface/pegawai.interface";
import { createContext, ReactNode, useContext } from "react";


const PegawaiContext = createContext<PegawaiContextType | undefined>(undefined);

export const PegawaiProvider = ({ children, mode, paramID }: { children: ReactNode, mode: "write" | "read", paramID?: string }) => {
    const { isLoaded, id, setId } = usePegawai()

    return (
        <PegawaiContext.Provider
            value={{
                id, setId, isLoaded
            }}
        >
            {isLoaded ? children : <div>Loading artikel...</div>}
        </PegawaiContext.Provider>
    );
};

export const usePegawai = () => {
    const context = useContext(PegawaiContext);
    if (!context) {
        throw new Error("useArtikel must be used within an ArtikelProvider");
    }
    return context;
};
