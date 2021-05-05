import { useEffect, useState } from 'react';
import styled from 'styled-components';
// @ts-ignore
import { Loader } from "@googlemaps/js-api-loader";
import Layout from '../components/Layout';
import geoLocations from '../constant/geolocation';
import images from '../constant/base64Images';
import titleConstants from '../constant/title';
import { enhanceMapOptions } from '../interfaces';

const StyledDiv = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const StyledImg = styled.img`
  height: 48px;
  width: 40px;
`;
const StyledButton = styled.button`
  width: 'fit-content';
  font-family: 'Press Start 2P';
  font-size: 20px;
  height: 48px;
  padding: 0 20px;
  border-radius: 10px;
  border: 0;
  background-color: DarkCyan;
  color: #FFF;
`;
const CoinDiv = styled.span`
  font-size: 26px;
  font-family: 'Press Start 2P';
`;
const MapRootDiv = styled.div`
  height: 85vh;
`;
const StyledH1 = styled.h1`
  font-family: 'Press Start 2P';
  text-align: center;
`;
const loader = new Loader({
  apiKey: "AIzaSyC5PwnmMtE8G1RwBREdJTAR1PSijmnuBxQ",
});
const markersData = [
  {
    title: titleConstants.YOSHI_HOUSE,
    content: "<div style='color:red; font-family: \"Press Start 2P\"'>Yoshi\s House!</div>",
    position: geoLocations.yoshisHouse,
    iconUrl: images.YOSHI_HOUSE,
    iconWidth: 38,
    iconHeight: 31,
    audioPath: '/bgm.mp3',
  },
  {
    title: titleConstants.ME,
    position: geoLocations.me,
    iconUrl: images.ME,
    iconWidth: 30,
    iconHeight: 47.8,
    audioPath: '/drm64_mario2.wav',
  },
  {
    title: titleConstants.GHOST_HOUSE,
    content: "<div style='color:blue; font-family: \"Press Start 2P\"'>Ghost House!</div>",
    position: geoLocations.ghostHouse,
    iconUrl: images.GHOST_HOUSE,
    iconWidth: 40,
    iconHeight: 48,
  },
  {
    title: titleConstants.CASTLE,
    content: "<div style='color:gray; font-family: \"Press Start 2P\"'>Castle!</div>",
    position: geoLocations.castle,
    iconUrl: images.CASTLE,
    iconWidth: 40,
    iconHeight: 53,
  },
  {
    title: titleConstants.WRAP_PIPE,
    content: "<div style='color:green; font-family: \"Press Start 2P\"'>Warp Pipe!</div>",
    position: geoLocations.warpPipe,
    iconUrl: images.WRAP_PIPE,
    iconWidth: 38,
    iconHeight: 42.5,
  },
  {
    title: titleConstants.STAR_WORLD,
    content: "<div style='color:purple; font-family: \"Press Start 2P\"'>Star World!</div>",
    position: geoLocations.starWorld,
    iconUrl: images.STAR_WORLD,
    iconWidth: 38,
    iconHeight: 38,
  },
  {
    title: titleConstants.DOUNT_PLAINS,
    content: "<div style='color:DarkCyan; font-family: \"Press Start 2P\"'>Donut Plains!</div>",
    position: geoLocations.donutPlainsOne,
    iconUrl: images.DOUNT_PLAINS,
    iconWidth: 50,
    iconHeight: 60.7,
  },
  {
    title: titleConstants.DOUNT_PLAINS,
    content: "<div style='color:DarkCyan; font-family: \"Press Start 2P\"'>Donut Plains!</div>",
    position: geoLocations.donutPlainsTwo,
    iconUrl: images.DOUNT_PLAINS,
    iconWidth: 50,
    iconHeight: 60.7,
  },
  {
    title: titleConstants.DOUNT_PLAINS,
    content: "<div style='color:DarkCyan; font-family: \"Press Start 2P\"'>Donut Plains!</div>",
    position: geoLocations.donutPlainsThree,
    iconUrl: images.DOUNT_PLAINS,
    iconWidth: 50,
    iconHeight: 60.7,
  },
  {
    title: titleConstants.COIN,
    position: geoLocations.coin,
    iconUrl: images.COIN,
    iconWidth: 35,
    iconHeight: 42,
    audioPath: '/Mario-coin-sound.mp3',
  },
];

type IndexPageProp = {
  dropInSameTime: Boolean,
};

const IndexPage = ({
  dropInSameTime = false,
}: IndexPageProp) => {
  const [isOriginalMap, setIsOriginalMap] = useState(false);
  const [createdMap, setCreatedMap] = useState(null);
  const [coinCount, setCoinCount] = useState(0);
  const getRandomLoation = () => {
    const random1 = Math.random() - 0.5;
    const random2 = Math.random() - 0.5;
    const nextLat = geoLocations.superNintendoWorld.lat + (random1 * 2 / 1000);
    const nextLng = geoLocations.superNintendoWorld.lng + (random2 * 3 / 1000);
    return {
      lat: nextLat,
      lng: nextLng,
    };
  };
  const createCoinMarker = (position?: { lat: number, lng: number }) => {
    const coinInfo = markersData[markersData.length - 1];
    const nextPosition = position || getRandomLoation();
    const marker = new google.maps.Marker({
      position: nextPosition,
      map: createdMap,
      title: coinInfo.title,
      icon: {
        url: coinInfo.iconUrl,
        scaledSize: new google.maps.Size(coinInfo.iconWidth, coinInfo.iconHeight),
      },
      animation: google.maps.Animation.DROP,
    });
    marker.addListener('click', () => {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      new Audio(coinInfo.audioPath).play();
      setTimeout(() => {
        marker.setAnimation(null);
        setCoinCount(c => c + 1);
      }, 500);
      setTimeout(() => {
        marker.setMap(null);
        createCoinMarker();
      }, 700);
    });
  };
  useEffect(() => {
    loader.load().then(() => {
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: geoLocations.superNintendoWorld,
          zoom: 18,
          mapId: isOriginalMap ? undefined : '7938d5eb683d060b',
        } as enhanceMapOptions,
      );
      setCreatedMap(map as any);
      if (isOriginalMap) return;
      markersData.forEach(({ position, title, iconUrl, iconWidth, iconHeight, content, audioPath }, i) => {
        setTimeout(() => {
          const marker = new google.maps.Marker({
            position,
            map,
            title,
            icon: {
              url: iconUrl,
              scaledSize: new google.maps.Size(iconWidth, iconHeight),
            },
            animation: google.maps.Animation.DROP,
            draggable: title === titleConstants.ME,
          });
          
          marker.addListener('click', () => {
            if (content) {
              const infoWindows = new google.maps.InfoWindow({ content });
              infoWindows.open(map, marker);
            }
            
            if (title === titleConstants.COIN) {
              marker.setAnimation(google.maps.Animation.BOUNCE);
              new Audio(audioPath).play();
              setTimeout(() => {
                marker.setAnimation(null);
                setCoinCount(c => c + 1);
              }, 500);
              setTimeout(() => {
                marker.setMap(null);
              }, 700);
            } else {
              if (title === titleConstants.ME) marker.setAnimation(google.maps.Animation.BOUNCE);
              if (audioPath) new Audio(audioPath).play();
              setTimeout(() => {
                marker.setAnimation(null);
              }, 500);
            }
          });
        } , i * (dropInSameTime ? 0 : 200));
      });
    });
  }, [isOriginalMap]);
  return (
    <Layout title="Customize Google Map">
      <StyledH1>Customize Google Map</StyledH1>
      <StyledDiv>
        <div>
          <StyledImg src={images.COIN} /><CoinDiv> x {coinCount}</CoinDiv>
        </div>
        <div>
          <StyledButton onClick={() => { setIsOriginalMap(o => !o); }}>Change Map Style</StyledButton>
          <StyledButton style={{ backgroundColor: '#800000', marginLeft: 20, }} onClick={() => { createCoinMarker(); }}>Create Coin</StyledButton>
        </div>
      </StyledDiv>
      <MapRootDiv id="map" />
    </Layout>
  );
}

export default IndexPage;
