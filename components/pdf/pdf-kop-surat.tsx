import { View, Text, Image, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderBottom: "2px solid black",
        flexDirection: "row",
        alignItems: "center",
        lineHeight: 1
    },
    logoContainer: {
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
        objectFit: 'contain'
    },
    logo: {
        width: 70,
        height: 70,
        objectFit: "contain",
    },
    textContainer: {
        width: "70%",
        textAlign: "center",
        lineHeight: 1,
    },
})

export const PDFKopSurat = () => (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Kementerian_Agama_new_logo.png/535px-Kementerian_Agama_new_logo.png"
                style={styles.logo}
            />
        </View>
        <View style={styles.textContainer}>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                KEMENTERIAN AGAMA REPUBLIK INDONESIA
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                KANTOR KEMENTERIAN AGAMA KABUPATEN CIAMIS
            </Text>
            <Text style={{ fontSize: 14 }}>
                MADRASAH TSANAWIYAH NEGERI 1 CIAMIS
            </Text>
            <Text style={{ fontSize: 8, lineHeight: 1.25, marginBottom: 5 }}>
                Jl. Letjen Soeprapto No. 17, Jakarta Pusat, DKI Jakarta 10510 {"\n"}
                Telepon: (021) 1234567 | Email: man1jakarta@kemenag.go.id | Website: man1jakarta.kemenag.go.id
            </Text>
            <Text style={{ fontSize: 8 }}>
            </Text>
        </View>
    </View>
)
