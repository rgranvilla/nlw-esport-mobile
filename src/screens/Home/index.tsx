import { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { GameCard } from "../../components/GameCard";
import { Heading } from "../../components/Heading";

import { styles } from "./styles";

interface IGameDTO {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
}

interface IGameBanner {
  id: string;
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function Home() {
  const [games, setGames] = useState<IGameBanner[]>();
  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: IGameBanner) {
    navigation.navigate("game", { id, title, bannerUrl });
  }

  useEffect(() => {
    fetch("http://192.168.0.6:3333/games")
      .then((response) => response.json())
      .then((data) => {
        const getGames = data.map((game: IGameDTO): IGameBanner => {
          const { id, bannerUrl, title, _count } = game;
          const adsCount = _count.ads;
          return {
            id,
            bannerUrl,
            title,
            adsCount,
          };
        });
        setGames(getGames);
      });
  }, []);
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
