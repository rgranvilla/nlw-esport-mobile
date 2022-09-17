import { Text, TouchableOpacity, View } from "react-native";
import { GameController } from "phosphor-react-native";

import { THEME } from "../../theme";
import { DuoInfo } from "../DuoInfo";

import { styles } from "./styles";

interface IDuoCardProps {
  name: string;
  yearsPlaying: string;
  disponibility: string;
  useVoiceChannel: boolean;
  onConnect: () => void;
}

export function DuoCard({
  name,
  yearsPlaying,
  disponibility,
  useVoiceChannel,
  onConnect,
}: IDuoCardProps) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={name} />
      <DuoInfo label="Tempo de jogo" value={yearsPlaying} />
      <DuoInfo label="Disponibilidade" value={disponibility} />
      <DuoInfo
        label="Chamada de áudio"
        value={useVoiceChannel ? "Sim" : "Não"}
        colorValue={useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />
      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
