import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { DuoCard } from "../../components/DuoCard";

import { THEME } from "../../theme";
import { styles } from "./styles";

import { IGameParams } from "../../@types/navigation";

interface IAdDTO {
  id: string;
  name: string;
  yearsPlaying: number;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

interface IDuoDTO {
  id: string;
  name: string;
  yearsPlaying: string;
  disponibility: string;
  useVoiceChannel: boolean;
}

export function Game() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, title, bannerUrl } = route.params as IGameParams;
  const [ads, setAds] = useState<IDuoDTO[]>([]);

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://192.168.0.6:3333/games/${id}/ads`)
      .then((response) => response.json())
      .then((data) => {
        const getAds: IDuoDTO[] = data.map(
          ({
            id,
            name,
            hourEnd,
            hourStart,
            useVoiceChannel,
            weekDays,
            yearsPlaying,
          }: IAdDTO) => {
            return {
              id,
              name,
              yearsPlaying,
              disponibility: `${weekDays.length} dias \u2022 ${hourStart}-${hourEnd}`,
              useVoiceChannel,
            };
          }
        );
        setAds(getAds);
      });
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: bannerUrl }}
          resizeMode="cover"
          style={styles.cover}
        />

        <Heading title={title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={ads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard
              name={item.name}
              yearsPlaying={item.yearsPlaying}
              disponibility={item.disponibility}
              useVoiceChannel={item.useVoiceChannel}
              onConnect={() => {}}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={
            ads.length > 0 ? styles.contentList : styles.emptyListContent
          }
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
