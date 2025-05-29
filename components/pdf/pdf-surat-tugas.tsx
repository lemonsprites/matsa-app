import { PDFKopSurat } from "@/components/pdf/pdf-kop-surat"
import { PDFTtdSurat } from "@/components/pdf/pdf-ttd-surat"
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    page: { padding: 40, fontSize: 10, lineHeight: 1.5 },
    section: { marginBottom: 12 },
})

export const SuratTugasPDF = ({ data }: { data: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <PDFKopSurat />
            <Text style={{ textAlign: "center", fontSize: 14, marginVertical: 10 }}>
                SURAT TUGAS
            </Text>
            <View style={styles.section}>
                <Text style={{ textAlign: "center", fontSize: 12 }}>Nomor: {data.nomor}</Text>
                <Text>Nama: {data.nama}</Text>
                <Text>Keterangan: {data.keterangan}</Text>
            </View>
            <PDFTtdSurat />
        </Page>
    </Document>
)
