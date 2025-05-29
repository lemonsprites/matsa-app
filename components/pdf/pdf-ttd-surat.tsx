import { View, Text, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-between", marginTop: 40 },
  column: { width: "45%", alignItems: "center" },
})

export const PDFTtdSurat = () => (
  <View style={styles.container}>
    <View style={styles.column}>
      <Text>Yang Menerima</Text>
      <Text style={{ marginTop: 50 }}>(_________________)</Text>
    </View>
    <View style={styles.column}>
      <Text>Yang Menugaskan</Text>
      <Text style={{ marginTop: 50 }}>(Kepala Sekolah)</Text>
    </View>
  </View>
)
